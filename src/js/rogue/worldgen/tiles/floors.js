
import Tile from '../../definitions/tile';
import { Tiles as Glyphs } from '../../constants/glyphs';

export class Void extends Tile { constructor() { super(); this.opacity = 1; this.reflect = 0; }}

export class DungeonFloor extends Tile { constructor() { super(Glyphs.Floor); }}

export class Corridor extends Tile { constructor() { super(Glyphs.Corridor); } }