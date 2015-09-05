
import _ from 'lodash';
import ROT from 'rot-js';
import * as Tiles from './tiles/_all';
import GameState from '../init/gamestate';

export default class Generator {
  static generate() {}

  static placeTile(map, type, x, y, z) {
    map[x][y] = new type();
    map[x][y].x = x;
    map[x][y].y = y;
    map[x][y].z = z;
    return map[x][y];
  }

  static drawHorizontalWalls(map, room, z) {
    for(let i = room.getLeft()-1; i <= room.getRight()+1; i++) {
      if(!map[i][room.getTop() - 1].glyph.key) {
        this.placeTile(map, Tiles.DungeonHorizontalWall, i, room.getTop() - 1, z);
      }

      if(!map[i][room.getBottom() + 1].glyph.key) {
        this.placeTile(map, Tiles.DungeonHorizontalWall, i, room.getBottom() + 1, z);
      }
    }
  }

  static drawVerticalWalls(map, room, z) {
    for(let i = room.getTop(); i <= room.getBottom(); i++) {

      const leftTile = map[room.getLeft()-1][i].glyph.key;
      const rightTile = map[room.getRight()+1][i].glyph.key;

      // these tiles take precedence, otherwise some walls look uggo
      if(!leftTile || leftTile === '-') {
        this.placeTile(map, Tiles.DungeonVerticalWall, room.getLeft()-1, i, z);
      }

      if(!rightTile || rightTile === '-') {
        this.placeTile(map, Tiles.DungeonVerticalWall, room.getRight()+1, i, z);
      }
    }
  }

  static getRandomFloorTile(map) {
    return _(map).flatten().filter(tile => tile.glyph.key === '.').sample();
  }

  static getRandomCoordsInRoom(room) {
    return [
      Math.floor(ROT.RNG.getUniform()*(room._x2 - room._x1)) + room._x1,
      Math.floor(ROT.RNG.getUniform()*(room._y2 - room._y1)) + room._y1
    ];
  }

  static placeStairsInRoom(map, room, z, stairs) {
    const setStairs = (stairs, x, y) => {
      return this.placeTile(map, stairs, x, y, z);
    };

    const [x, y] = this.getRandomCoordsInRoom(room);
    return setStairs(stairs, x, y);
  }

  static getStairs(z) {
    return GameState.winCondition.mapStairs(z);
  }
}
