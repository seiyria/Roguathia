
import * as Tiles from "./tiles";
import {Dungeon} from "./map-gen";

export default class World {
  constructor() {
    this.tiles = [];
    
    this.stairs = [];
    
    this.entities = [];
    
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
      let {map, validStartRooms} = Dungeon.generate(width, height, i);
      this.tiles[i] = map;
      let [upStairs, downStairs] = this.placeStairs(validStartRooms, i);
      
      this.stairs[i] = {up: [upStairs.x, upStairs.y], down: [downStairs.x, downStairs.y] };
    }
  }
  
  getTile(x, y, z) {
    if(!this.width || !this.height || !this.depth) {
      throw new Exception('World not yet generated');
    }
    
    if(x < 0 || x >= this.width || 
       y < 0 || y >= this.height || 
       z < 0 || z >= this.depth) {
         return new Tiles.Void();
       }
       
    return this.tiles[z][x][y];
  }
  
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
  
  isVoid(x, y, z) {
    let tile = this.getTile(x, y, z);
    return !tile || !this.getTile(x, y, z).glyph.key;
  }
  
  setExplored(x, y, z, state = true) {
    if(this.isVoid(x, y, z)) return;
    this.explored[z][x][y] = state;
  }
  
  isExplored(x, y, z) {
    return this.isVoid(x, y, z) ? false : this.explored[z][x][y];
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
  
  ensureLocation(x, y, z) {
    if(!this.entities[z]) this.entities[z] = [];
    if(!this.entities[z][x]) this.entities[z][x] = [];
    if(!this.entities[z][x][y]) this.entities[z][x][y] = null;
  }
  
  moveEntity(entity, x, y, z) {
    if(!this.isTileEmpty(x, y, z)) return false;
    
    this.ensureLocation(x, y, z);
    this.ensureLocation(entity.x, entity.y, entity.z);
    
    this.entities[entity.z][entity.x][entity.y] = null;
    
    entity.x = x;
    entity.y = y;
    entity.z = z;
    this.entities[z][x][y] = entity;
  }
  
  removeEntity(entity) {
    this.entities[entity.z][entity.x][entity.y] = null;
  }
  
  getEntity(x, y, z) {
    this.ensureLocation(x, y, z);
    return this.entities[z][x][y];
  }
  
  placeEntityAtRandomLocation(entity, z) {
    var tile = _(this.tiles[z]).flatten().filter(tile => tile.glyph.key).reject(tile => tile.isDense()).sample();
    this.moveEntity(entity, tile.x, tile.y, z);
  }
  
  placeStairs(validRooms, z) {
    let rooms = _.sample(validRooms, 2);
    
    let stairsUp = new Tiles.StairsUp();
    let stairsDown = new Tiles.StairsDown();
    
    let getCoordsForRoom = (room) => {
      return [
        Math.floor(ROT.RNG.getUniform()*(room._x2 - room._x1)) + room._x1, 
        Math.floor(ROT.RNG.getUniform()*(room._y2 - room._y1)) + room._y1
      ];
    };
    
    let setStairs = (stairs, x, y) => {
      stairs.x = x;
      stairs.y = y;
      stairs.z = z;
      
      this.tiles[z][x][y] = stairs;
    };
    
    let [firstX, firstY] = getCoordsForRoom(rooms[0]);
    let [secondX, secondY] = getCoordsForRoom(rooms[1]);
    
    setStairs(stairsUp, firstX, firstY);
    setStairs(stairsDown, secondX, secondY);
    
    return [stairsUp, stairsDown];
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
  
  getValidTilesInRange(x, y, z, radius, filter = (tile) => true) {
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
  
  getValidEntitiesInRange(x, y, z, radius, filter = (entity) => true) {
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
}