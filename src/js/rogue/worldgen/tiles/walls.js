
import Tile from '../../definitions/tile';
import { Tiles as Glyphs } from '../../constants/glyphs';

export class DungeonHorizontalWall extends Tile { constructor() { super(Glyphs.WallHorizontal); this.density = this.opacity = 1; }}
export class DungeonVerticalWall extends Tile { constructor() { super(Glyphs.WallVertical); this.density = this.opacity = 1; }}