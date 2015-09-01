
import * as Tiles from '../tiles';
import Generator from '../generator';

export default class Dungeon extends Generator {

  static generate(w, h, z) {
    var map = [];
    
    // -3 to adjust for the UI components at the bottom
    var digger = new ROT.Map.Digger(w, h-3, { roomWidth: [4, 8], roomHeight: [4, 7], corridorLength: [5, 13] });
    
    digger.create((x, y, value) => {
      if(!map[x]) map[x] = [];
      
      var proto = Tiles.Void;
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
    
    return { map: map, validStartRooms: digger.getRooms(), mapName: 'The Dungeons of Doom', shortMapName: 'Dungeon' };
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

      var leftTile = map[room.getLeft()-1][i].glyph.key;
      var rightTile = map[room.getRight()+1][i].glyph.key;

      // these tiles take precedence, otherwise some walls look uggo
      if(!leftTile || leftTile === '-') {
        this.placeTile(map, Tiles.DungeonVerticalWall, room.getLeft()-1, i, z);
      }

      if(!rightTile || rightTile === '-') {
        this.placeTile(map, Tiles.DungeonVerticalWall, room.getRight()+1, i, z);
      }
    }
  }

  static drawDoors(map, room, z) {
    room.getDoors((x, y) => {
      if(ROT.RNG.getPercentage() < 70) {
        this.placeTile(map, Tiles.DungeonFloor, x, y, z);
      } else {
        let door = this.placeTile(map, Tiles.Door, x, y, z);
        door.setProperCharacter(map[x-1][y]);
      }
    });
  }
}