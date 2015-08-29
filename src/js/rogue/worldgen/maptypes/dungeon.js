
import * as Tiles from '../tiles';
import Generator from '../generator';

export default class Dungeon extends Generator {
  
  static generate(w, h, z) {
    var map = [];
    
    let placeTile = (type, x, y) => {
      map[x][y] = new type();
      map[x][y].x = x;
      map[x][y].y = y;
      map[x][y].z = z;
      return map[x][y];
    };
    
    // -3 to adjust for the UI components at the bottom
    var digger = new ROT.Map.Digger(w, h-3, { roomWidth: [4, 8], roomHeight: [4, 7], corridorLength: [5, 13] });
    
    digger.create((x, y, value) => {
      if(!map[x]) map[x] = [];
      
      var proto = Tiles.Void;
      if(!value) proto = Tiles.DungeonFloor;
      
      placeTile(proto, x, y);
    });
    
    // replace all corridors with corridor tiles
    _.each(digger._corridors, (corridor) => {
      
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
          placeTile(Tiles.Corridor, x, y);
        }
      }
    });
    
    // handle room outlines and doors
    _.each(digger.getRooms(), (room) => {
      
      // draw left and right walls
      for(let i = room.getTop(); i <= room.getBottom(); i++) {
        
        var leftTile = map[room.getLeft()-1][i].glyph.key;
        var rightTile = map[room.getRight()+1][i].glyph.key;
        
        // these tiles take precedence, otherwise some walls look uggo
        if(!leftTile || leftTile === '-') {
          placeTile(Tiles.DungeonVerticalWall, room.getLeft()-1, i);
        }
        
        if(!rightTile || rightTile === '-') {
          placeTile(Tiles.DungeonVerticalWall, room.getRight()+1, i);
        }
      }
      
      // draw top and bottom walls
      for(var i = room.getLeft()-1; i <= room.getRight()+1; i++) {
        if(!map[i][room.getTop() - 1].glyph.key) {
          placeTile(Tiles.DungeonHorizontalWall, i, room.getTop() - 1);
        }
        
        if(!map[i][room.getBottom() + 1].glyph.key) {
          placeTile(Tiles.DungeonHorizontalWall, i, room.getBottom() + 1);
        }
      }
      
      // maybe draw some doors
      room.getDoors((x, y) => {
        if(ROT.RNG.getPercentage() < 70) {
          placeTile(Tiles.DungeonFloor, x, y);
        } else {
          let door = placeTile(Tiles.Door, x, y);
          door.setProperCharacter(map[x-1][y]);
        }  
      });
    });
    
    return { map: map, validStartRooms: digger.getRooms(), mapName: 'The Dungeons of Doom' };
  }
}