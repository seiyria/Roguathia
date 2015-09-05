
import Tile from '../../definitions/tile';

export class DungeonHorizontalWall extends Tile { constructor() { super('-'); this.density = this.opacity = 1; }}
export class DungeonVerticalWall extends Tile { constructor() { super('|'); this.density = this.opacity = 1; }}