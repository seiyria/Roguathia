
import {Feet} from '../items';

export class Ordinary extends Feet {
  constructor(opts) {
    super(opts);
    this.realName = this.fakeName = 'ordinary cloak';
  }
}
Ordinary.rarity = 100;

export class Protective extends Feet {
  ac() {
    return this.buc * -1;
  }
}
Protection.rarity = 5;