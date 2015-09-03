
import { Feet } from '../../definitions/equipment';

export class Ordinary extends Feet {
  static get rarity() { return 100; }
  constructor(opts) {
    super(opts);
    this.realName = this.fakeName = 'ordinary cloak';
  }
}

export class Protective extends Feet {
  static get rarity() { return 5; }
  ac() {
    return this.buc * -1;
  }
}