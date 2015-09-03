
import { Head } from '../../definitions/equipment';

export class Ordinary extends Head {
  static get rarity() { return 25; }
  constructor(opts) {
    super(opts);
    this.realName = this.fakeName = 'ordinary hat';
  }
}

export class Protective extends Head {
  static get rarity() { return 5; }
  ac() {
    return this.buc;
  }
}

export class NightGoggles extends Head {
  static get rarity() { return 1; }
  Infravision() {
    return this.buc;
  }
}