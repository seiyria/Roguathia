
import { Cloak } from '../../definitions/equipment';

export class Ordinary extends Cloak {
  constructor(opts) {
    super(opts);
    this.realName = this.fakeName = 'ordinary cloak';
  }
}
Ordinary.rarity = 100;

export class Protection extends Cloak {
  ac() {
    return this.buc * -2;
  }
}
Protection.rarity = 5;