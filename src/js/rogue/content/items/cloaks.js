
import { Cloak } from '../../definitions/equipment';

export class Ordinary extends Cloak {
  static get rarity() { return 100; }
  constructor(opts) {
    super(opts);
    this.realName = this.fakeName = 'ordinary cloak';
  }
}

export class Protection extends Cloak {
  static get rarity() { return 5; }
  Protection() {
    return this.buc * -2;
  }
}