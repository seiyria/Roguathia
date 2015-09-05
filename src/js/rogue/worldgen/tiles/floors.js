
import Tile from '../../definitions/tile';

export class Void extends Tile { constructor() { super(); this.opacity = 1; }}

export class DungeonFloor extends Tile { constructor() { super('.'); }}

export class Corridor extends Tile { constructor() { super('#'); } }