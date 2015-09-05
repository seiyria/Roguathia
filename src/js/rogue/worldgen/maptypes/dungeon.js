
import _ from 'lodash';
import ROT from 'rot-js';
import * as Tiles from '../tiles/_all';
import Generator from '../generator';

export default class Dungeon extends Generator {

  static generate(opts) {
    const { w, h, z } = opts;
    const map = [];
    
    // -3 to adjust for the UI components at the bottom
    const digger = new ROT.Map.Digger(w, h-3, { roomWidth: [4, 8], roomHeight: [4, 7], corridorLength: [5, 13] });
    
    digger.create((x, y, value) => {
      if(!map[x]) map[x] = [];

      let proto = Tiles.Void;
      if(!value) proto = Tiles.DungeonFloor;
      
      this.placeTile(map, proto, x, y, z);
    });
    
    // replace all corridors with corridor tiles
    _.each(digger._corridors, (corridor) => {
      this.placeCorridorTiles(map, corridor, z);
    });

    // handle room outlines and doors
    _.each(digger.getRooms(), (room) => {

      // draw left and right walls
      this.drawVerticalWalls(map, room, z);
      
      // draw top and bottom walls
      this.drawHorizontalWalls(map, room, z);
      
      // maybe draw some doors
      this.drawDoors(map, room, z);
    });

    const [stairsUp, stairsDown] = this.getStairs(z);
    const rooms = _.sample(digger.getRooms(), 2);
    const stairs = [
      this.placeStairsInRoom(map, rooms[0], z, stairsUp),
      stairsDown ? this.placeStairsInRoom(map, rooms[1], z, stairsDown) : null
    ];
    
    return { map, stairs, mapName: 'The Dungeons of Doom', shortMapName: 'Dungeon' };
  }

  static placeCorridorTiles(map, corridor, z) {
    let [xStart, xEnd] = [corridor._startX, corridor._endX];
    if(xStart > xEnd) {
      [xStart, xEnd] = [xEnd, xStart];
    }

    let [yStart, yEnd] = [corridor._startY, corridor._endY];
    if(yStart > yEnd) {
      [yStart, yEnd] = [yEnd, yStart];
    }

    for(let x = xStart; x <= xEnd; x++) {
      for(let y = yStart; y <= yEnd; y++) {
        this.placeTile(map, Tiles.Corridor, x, y, z);
      }
    }
  }

  static drawDoors(map, room, z) {
    room.getDoors((x, y) => {
      if(ROT.RNG.getPercentage() < 70) {
        this.placeTile(map, Tiles.DungeonFloor, x, y, z);
      } else {
        const door = this.placeTile(map, Tiles.Door, x, y, z);
        door.setProperCharacter(map[x-1][y]);
      }
    });
  }
}