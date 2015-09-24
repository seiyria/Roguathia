
import { Feet } from '../../definitions/equipment';
import { AC } from '../../lib/default-calculations';
import Materials from '../../constants/materials';

export class SimpleBoots extends Feet {
  static get rarity() { return 100; }
  get material() { return Materials.Leather; }
  ac() {
    return AC(this);
  }
}

export class ElvenBoots extends Feet {
  static get rarity() { return 2; }
  get material() { return Materials.Leather; }
  ac() {
    return AC(this);
  }
  Stealth() {
    return 30;
  }
}

export class HermesSandals extends Feet {
  static get rarity() { return 3; }
  get material() { return Materials.Leather; }
  Haste() {
    return 50;
  }
}

export class HighBoots extends Feet {
  static get rarity() { return 10; }
  get material() { return Materials.Leather; }
  ac() {
    return AC(this, 2);
  }
}

export class IronBoots extends Feet {
  static get rarity() { return 5; }
  get material() { return Materials.Iron; }
  ac() {
    return AC(this, 2);
  }
}

export class BootsOfProtection extends Feet {
  static get rarity() { return 5; }
  Protection() {
    return this.buc * -2;
  }
}