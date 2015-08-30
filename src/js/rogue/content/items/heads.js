
import { Head } from '../../definitions/equipment';

export class Ordinary extends Head {
  constructor(opts) {
    super(opts);
    this.realName = this.fakeName = 'ordinary hat';
  }
}
Ordinary.rarity = 25;

export class Protective extends Head {
  ac() {
    return this.buc;
  }
}
Protective.rarity = 5;

export class NightGoggles extends Head {
  infravision() {
    return this.buc;
  }
}
NightGoggles.rarity = 1;