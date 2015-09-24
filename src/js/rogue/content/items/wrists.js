
import { Wrist } from '../../definitions/equipment';
import { AC } from '../../lib/default-calculations';
import Materials from '../../constants/materials';

export class LeatherGloves extends Wrist {
  get material() { return Materials.Leather; }
  static get rarity() { return 75; }
  ac() {
    return AC(this);
  }
}

export class GauntletsOfDexterity extends Wrist {
  get material() { return Materials.Leather; }
  static get rarity() { return 10; }
  ac() {
    return AC(this);
  }
  dex() {
    return this.buc * -2;
  }
}

export class GauntletsOfStrength extends Wrist {
  get material() { return Materials.Leather; }
  static get rarity() { return 10; }
  ac() {
    return AC(this);
  }
  str() {
    return this.buc * -2;
  }
}