
import { Special, Comestible, Gem } from '../../definitions/equipment';

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

export class StoneOfSelyk extends Gem {
  constructor() {
    super({ glyph: { fg: '#f0f' } });
    this.name = `Stone of Selyk`;
  }
}