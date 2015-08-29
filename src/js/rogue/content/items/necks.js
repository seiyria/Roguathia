
import { Head } from '../../definitions/equipment';

export class Ordinary extends Head {
  constructor(opts) {
    super(opts);
    this.realName = this.fakeName = 'ordinary amulet';
  }
}
Ordinary.rarity = 100;

export class Protective extends Head {
  ac() {
    return this.buc * -1;
  }
}
Protective.rarity = 5;