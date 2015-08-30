
import { Neck } from '../../definitions/equipment';

export class Ordinary extends Neck {
  constructor(opts) {
    super(opts);
    this.realName = this.fakeName = 'ordinary amulet';
  }
}
Ordinary.rarity = 100;

export class Protective extends Neck {
  Protection() {
    return this.buc;
  }
}
Protective.rarity = 5;