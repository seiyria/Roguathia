
import { Body } from '../../definitions/equipment';

export class TShirt extends Body {
  static get rarity() { return 100; }
}

export class LeatherJacket extends Body {
  static get rarity() { return 5; }
  ac() {
    return this.buc * -1;
  }
}