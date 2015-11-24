
import _ from 'lodash';
import ROT from 'rot-js';
import * as Tiles from './tiles/_all';
import Dungeon from './maptypes/dungeon';
import GameState from '../init/gamestate';
import ItemGenerator from './item-generator';
import Log from '../lib/logger';

const badTile = new Tiles.Void();

export default class World {
  constructor() {
    this.tiles = [];
    
    this.stairs = [];
    
    this.entities = [];
    this.items = [];
    
    this.fov = [];
    this.lighting = [];
    this.explored = [];
  }

  setMapAt(floor, i) {
    const { map, mapName, shortMapName, stairs } = floor;
    this.tiles[i] = map;
    this.tiles[i].mapName = mapName;
    this.tiles[i].shortMapName = shortMapName;
    const [upStairs, downStairs] = stairs;

    this.stairs[i] = {};
    if(upStairs) this.stairs[i].up = [upStairs.x, upStairs.y];
    if(downStairs) this.stairs[i].down = [downStairs.x, downStairs.y];

    this.placeItemsOnMap(i);
  }
  
  generateWorld(width = 70, height = 70, depth = 10) {
    this.width = width;
    this.height = height;
    this.depth = depth;
    
    for(let i = 0; i < depth; i++) {
      const genOpts = { w: width, h: height, z: i };
      this.setMapAt(Dungeon.generate(genOpts), i);
    }

    if(GameState.winCondition.mapAdditions()) {
      this.depth = this.tiles.length;
    }

    this.setup();
  }

  // region Setup functions
  setup() {
    this.setupExplored();
    this.setupFOV();
  }

  setupExplored() {
    for(let z=0; z<this.depth; z++) {
      this.explored[z] = [];
      for(let x=0; x<this.width; x++) {
        this.explored[z][x] = [];
        for(let y=0; y<this.height; y++) {
          this.explored[z][x][y] = false;
        }
      }
    }
  }
  
  setupFOV() {
    for(let z = 0; z < this.depth; z++) {
      this.fov[z] = new ROT.FOV.RecursiveShadowcasting(
        (x, y) => {
          return !this.getTile(x, y, z).isBlockingLight();
        }
      );
    }
  }
  // endregion

  // region Exploration functions
  setExplored(x, y, z, state = true) {
    if(this.isVoid(x, y, z)) return;
    this.explored[z][x][y] = state;
  }

  isExplored(x, y, z) {
    return this.isVoid(x, y, z) ? false : this.explored[z][x][y];
  }
  // endregion

  // region Tile functions
  getTile(x, y, z) {
    if(z < 0 || z > this.tiles.length ||
      x < 0 || x >= this.tiles[z].length ||
      y < 0 || y >= this.tiles[z][x].length) {
      return badTile;
    }

    return this.tiles[z][x][y];
  }

  placeNewTile(tileProto, x, y, z) {
    const tile = new tileProto();
    tile.x = x;
    tile.y = y;
    tile.z = z;
    this.tiles  [z][x][y] = tile;
  }
  
  isVoid(x, y, z) {
    const tile = this.getTile(x, y, z);
    return !tile || !this.getTile(x, y, z).glyph.key;
  }
  
  isTileEmpty(x, y, z) {
    const tile = this.getTile(x, y, z);
    return tile && !tile.isDense() && !this.getEntity(x, y, z) && !this.isVoid(x, y, z);
  }
  
  isTilePassable(x, y, z, inclAIPass = true) {
    const tile = this.getTile(x, y, z);
    const aiPass = inclAIPass ? tile._isAIPassable : true;
    return tile && aiPass || this.isTileEmpty(x, y, z);
  }

  getAllTilesInRange(x, y, z, radius) {
    const tiles = [];

    // line these tiles up with the numpad
    for(let newY = y + radius; newY >= y - radius; newY--) {
      for(let newX = x - radius; newX <= x + radius; newX++) {
        const tile = this.tiles[z][newX][newY];
        tiles.push(tile);
      }
    }

    return tiles;
  }

  getValidTilesInRange(x, y, z, radius, filter = () => true) {
    const tiles = [];

    const lowerX = Math.max(x - radius, 0);
    const upperX = Math.min(x + radius, this.width);
    const lowerY = Math.max(y - radius, 0);
    const upperY = Math.min(y + radius, this.height);

    for(let newX = lowerX; newX <= upperX; newX++) {
      for(let newY = lowerY; newY <= upperY; newY++) {
        if(!this.tiles[z][newX]) continue;
        const tile = this.tiles[z][newX][newY];
        if(!tile) continue;
        if(!this.isTileEmpty(newX, newY, z)) continue;
        tiles.push(tile);
      }
    }

    return _.filter(tiles, filter);
  }
  // endregion

  // region Dual-purpose getters/setters
  getWithoutInits(x, y, z, list = 'entities') {
    if(!this[list][z]) return null;
    if(!this[list][z][x]) return null;
    if(!this[list][z][x][y]) return null;
    
    return this[list][z][x][y];
  }
  
  ensureLocation(x, y, z, list = 'entities', setTo = null) {
    if(!this[list][z]) this[list][z] = [];
    if(!this[list][z][x]) this[list][z][x] = [];
    if(!this[list][z][x][y]) this[list][z][x][y] = setTo;
  }
  // endregion

  // region Item functions
  placeItemsOnMap(z, itemsRemaining = GameState.upgrades.itemsInDungeon) {
    while(itemsRemaining > 0 && ROT.RNG.getPercentage() <= GameState.upgrades.itemDropChance) {
      itemsRemaining--;
      GameState.world.placeItemAtRandomLocation(ItemGenerator.spawn(), z);
    }
  }

  getItemsAt(x, y, z) {
    return this.getWithoutInits(x, y, z, 'items');
  }

  removeItem(item) {
    const myItems = this.getItemsAt(item.x, item.y, item.z);
    if(!_.contains(myItems, item)) {
      Log('World', `Invalid item removal attempt. ${item.name} not found in list: ${_.pluck(myItems, 'name').join(', ')}`);
      return false;
    }
    this.items[item.z][item.x][item.y] = _.without(this.items[item.z][item.x][item.y], item);
    item.x = item.y = item.z = undefined;
  }
  
  moveItem(item, x, y, z) {
    this.ensureLocation(x, y, z, 'items', []);
    
    if(item.x && item.y && item.z) {
      this.removeItem(item);
    }
    
    item.x = x;
    item.y = y;
    item.z = z;
    this.items[z][x][y].push(item);
  }

  placeItemAtRandomLocation(item, z) {
    const tile = _(this.tiles[z]).flatten().filter(tile => tile.glyph.key).reject(tile => tile.isDense()).sample();
    this.moveItem(item, tile.x, tile.y, z);
  }
  // endregion

  // region Entity functions
  moveEntity(entity, x, y, z) {
    if(!this.isTileEmpty(x, y, z)) return false;
    
    this.ensureLocation(x, y, z);
    this.ensureLocation(entity.x, entity.y, entity.z);
    
    this.entities[entity.z][entity.x][entity.y] = null;
    
    entity.x = x;
    entity.y = y;
    entity.z = z;
    this.entities[z][x][y] = entity;
    return true;
  }

  removeEntity(entity) {
    const myEntity = this.getEntity(entity.x, entity.y, entity.z);
    if(myEntity !== entity) {
      Log('World', `Invalid entity removal attempt. ${entity ? entity.name : null} tried to remove ${myEntity ? myEntity.name : null}`);
      return false;
    }
    this.entities[entity.z][entity.x][entity.y] = null;
  }
  
  getEntity(x, y, z) {
    return this.getWithoutInits(x, y, z);
  }
  
  placeEntityAtRandomLocation(entity, z = entity.z) {
    const tile = _(this.tiles[z]).flatten().filter(tile => tile.glyph.key).reject(tile => tile.isDense()).sample();
    this.moveEntity(entity, tile.x, tile.y, z);
  }
  
  getValidEntitiesInRange(x, y, z, radius, filter = () => true) {
    const entities = [];
    
    const lowerX = Math.max(x - radius, 0);
    const upperX = Math.min(x + radius, this.width);
    const lowerY = Math.max(y - radius, 0);
    const upperY = Math.min(y + radius, this.height);
    
    for(let newX = lowerX; newX <= upperX; newX++) {
      for(let newY = lowerY; newY <= upperY; newY++) {
        const entity = this.getEntity(newX, newY, z);
        if(!entity) continue;
        entities.push(entity);
      }
    }

    return _.filter(entities, filter);
  }
  // endregion

  // region Lighting functions
  addLighting(lightSource) {
    if(!this.lighting[lightSource.z]) this.lighting[lightSource.z] = [];
    this.lighting[lightSource.z].push(lightSource);
  }

  removeLighting(lightSource) {
    this.lighting[lightSource.z] = _.without(this.lighting[lightSource.z], lightSource);
  }
  // endregion

  descend() {
    if(!GameState.winCondition.shouldTrigger()) return;
    GameState.winCondition.trigger();
  }

  cleanUp() {
    _.each(_.compact(_.flattenDeep(this.entities)), e => e.removeSelf() && e.cleanUp());

    for(let z = 0; z < this.tiles.length; z++) {
      for(let x = 0; x < this.tiles[z].length; x++) {
        for(let y = 0; y < this.tiles[z][x].length; y++) {
          this.tiles[z][x][y] = null;
        }
        this.tiles[z][x] = null;
      }
      this.tiles[z] = null;
    }

    this.tiles = null;
    this.stairs = null;
    this.entities = null;
    this.items = null;
    this.fov = null;
    this.lighting = null;
    this.explored = null;
  }
}