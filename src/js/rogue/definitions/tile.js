
import Entity from './entity';

export default class Tile extends Entity {
  constructor(key, fg, bg) {
    super({ key: key, fg: fg, bg: bg });
    this.density = 0;
    this.opacity = 0;
  }
}