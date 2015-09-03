
import { Special, Comestible } from '../../definitions/equipment';

export class Gold extends Special {
  constructor(num) {
    const opts = {
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