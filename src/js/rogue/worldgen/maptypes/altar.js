
import _ from 'lodash';
import ROT from 'rot-js';
import * as Tiles from '../tiles/_all';
import Generator from '../generator';

export default class Altar extends Generator {

  static generate(opts) {
    const { w, h, z } = _.extend({ w: 15, h: 15 }, opts);
    const map = [];
    
    const arena = new ROT.Map.Arena(w, h);
    
    arena.create((x, y, value) => {
      if(!map[x]) map[x] = [];

      let proto = Tiles.Void;
      if(!value) proto = Tiles.DungeonFloor;
      
      this.placeTile(map, proto, x, y, z);
    });

    const room = new ROT.Map.Feature.Room(1, 1, w-2, h-2);

    this.drawVerticalWalls(map, room, z);
    this.drawHorizontalWalls(map, room, z);

    const stairs = [
      this.placeStairsInRoom(map, room, z, Tiles.StairsUp)
    ];

    const altarTile = this.getRandomFloorTile(map);
    this.placeTile(map, Tiles.SelykAltar, altarTile.x, altarTile.y, z);
    
    return { map, stairs, mapName: `Selyk's Altar`, shortMapName: 'Altar' };
  }
}