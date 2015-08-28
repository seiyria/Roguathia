
import { Body } from '../items';

export class TShirt extends Body {
}
TShirt.rarity = 100;

export class LeatherJacket extends Body {
  ac() {
    return this.buc * -1;
  }
}
LeatherJacket.rarity = 5;