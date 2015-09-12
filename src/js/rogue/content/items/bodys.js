
import { Body } from '../../definitions/equipment';
import { AC } from '../../lib/default-calculations';

export class TShirt extends Body {
  static get rarity() { return 100; }
}

export class LeatherJacket extends Body {
  static get rarity() { return 5; }
  ac() {
    return AC(this);
  }
}

export class OrcishRingMail extends Body {
  static get rarity() { return 5; }
  ac() {
    return AC(this, 2);
  }
}

export class OrcishChainMail extends Body {
  static get rarity() { return 5; }
  ac() {
    return AC(this, 3);
  }
}