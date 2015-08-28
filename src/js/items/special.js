
import { Special, Comestible } from '../items';

export class Gold extends Special {
  constructor(num) {
    let opts = {
      glyph: { key: '$', fg: 'yellow' }
    };
    super(opts);
    this.goldValue = num;
    this.name = `${this.goldValue} gold`;
  }
}

export class Corpse extends Comestible {
  constructor(opts = { monsterName: 'unknown' }) {
    super(opts);
    this.name = `corpse of ${opts.monsterName}`;
  }
}