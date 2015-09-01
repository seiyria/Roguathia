
import * as Tiles from './tiles';
import Dungeon from './maptypes/dungeon';

export default class World {
  constructor() {
    this.tiles = [];
    
    this.stairs = [];
    
    this.entities = [];
    this.items = [];
    
    this.fov = [];
    this.explored = [];
  }
  
  generateWorld(width = 70, height = 70, depth = 10) {
    this.width = width;
    this.height = height;
    this.depth = depth;
    
    this.setupExplored();
    this.setupFOV();
    
    for(let i = 0; i < depth; i++) {
      let { map, mapName, shortMapName, stairs } = Dungeon.generate(width, height, i);
      this.tiles[i] = map;
      this.tiles[i].mapName = mapName;
      this.tiles[i].shortMapName = shortMapName;
      let [upStairs, downStairs] = stairs;
      
      this.stairs[i] = { up: [upStairs.x, upStairs.y], down: [downStairs.x, downStairs.y] };
    }
  }

  // SETUP
  setupExplored() {
    for(var z=0; z<this.depth; z++) {
      this.explored[z] = [];
      for(var x=0; x<this.width; x++) {
        this.explored[z][x] = [];
        for(var y=0; y<this.height; y++) {
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

  // EXPLORATION
  setExplored(x, y, z, state = true) {
    if(this.isVoid(x, y, z)) return;
    this.explored[z][x][y] = state;
  }

  isExplored(x, y, z) {
    return this.isVoid(x, y, z) ? false : this.explored[z][x][y];
  }

  // TILES
  getTile(x, y, z) {
    if(!this.width || !this.height || !this.depth) {
      throw new Error('World not yet generated');
    }

    if(x < 0 || x >= this.width ||
      y < 0 || y >= this.height ||
      z < 0 || z >= this.depth) {
      return new Tiles.Void();
    }

    return this.tiles[z][x][y];
  }
  
  isVoid(x, y, z) {
    let tile = this.getTile(x, y, z);
    return !tile || !this.getTile(x, y, z).glyph.key;
  }
  
  isTileEmpty(x, y, z) {
    let tile = this.getTile(x, y, z);
    return tile && !tile.isDense() && !this.getEntity(x, y, z) && !this.isVoid(x, y, z);
  }
  
  isTilePassable(x, y, z, inclAIPass = true) {
    let tile = this.getTile(x, y, z);
    let aiPass = inclAIPass ? tile._isAIPassable : true;
    return tile && aiPass || this.isTileEmpty(x, y, z);
  }

  getAllTilesInRange(x, y, z, radius) {
    let tiles = [];

    // line these tiles up with the numpad
    for(let newY = y + radius; newY >= y - radius; newY--) {
      for(let newX = x - radius; newX <= x + radius; newX++) {
        let tile = this.tiles[z][newX][newY];
        tiles.push(tile);
      }
    }

    return tiles;
  }

  getValidTilesInRange(x, y, z, radius, filter = () => true) {
    let tiles = [];

    let lowerX = Math.max(x - radius, 0);
    let upperX = Math.min(x + radius, this.width);
    let lowerY = Math.max(y - radius, 0);
    let upperY = Math.min(y + radius, this.height);

    for(let newX = lowerX; newX <= upperX; newX++) {
      for(let newY = lowerY; newY <= upperY; newY++) {
        if(!this.tiles[z][newX]) continue;
        let tile = this.tiles[z][newX][newY];
        if(!tile) continue;
        if(!this.isTileEmpty(newX, newY, z)) continue;
        tiles.push(tile);
      }
    }

    return _.filter(tiles, filter);
  }

  // DUAL-PURPOSE GETTERS/SETTERS
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

  // ITEMS
  getItemsAt(x, y, z) {
    return this.getWithoutInits(x, y, z, 'items');
  }
  
  removeItem(item) {
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

  // ENTITY
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
    this.entities[entity.z][entity.x][entity.y] = null;
  }
  
  getEntity(x, y, z) {
    return this.getWithoutInits(x, y, z);
  }
  
  placeEntityAtRandomLocation(entity, z) {
    var tile = _(this.tiles[z]).flatten().filter(tile => tile.glyph.key).reject(tile => tile.isDense()).sample();
    this.moveEntity(entity, tile.x, tile.y, z);
  }
  
  getValidEntitiesInRange(x, y, z, radius, filter = () => true) {
    let entities = [];
    
    let lowerX = Math.max(x - radius, 0);
    let upperX = Math.min(x + radius, this.width);
    let lowerY = Math.max(y - radius, 0);
    let upperY = Math.min(y + radius, this.height);
    
    for(let newX = lowerX; newX <= upperX; newX++) {
      for(let newY = lowerY; newY <= upperY; newY++) {
        this.ensureLocation(newX, newY, z);
        let entity = this.entities[z][newX][newY];
        if(!entity) continue;
        entities.push(entity);
      }
    }

    return _.filter(entities, filter);
  }

  // OTHER
  descend() {
    // do stuff with victories, like generate bosses or items
  }
}