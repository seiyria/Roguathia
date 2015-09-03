
import { Neck } from '../../definitions/equipment';

export class Ordinary extends Neck {
  static get rarity() { return 100; }
  constructor(opts) {
    super(opts);
    this.realName = this.fakeName = 'ordinary amulet';
  }
}

export class Protective extends Neck {
  static get rarity() { return 5; }
  Protection() {
    return this.buc;
  }
}