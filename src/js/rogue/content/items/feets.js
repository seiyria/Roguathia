
import { Feet } from '../../definitions/equipment';
import { AC } from '../../lib/default-calculations';
import Materials from '../../constants/materials';
import { rarity } from '../../constants/decorators';

@rarity(50)
export class SimpleBoots extends Feet {
  get material() { return Materials.Leather; }
  ac() {
    return AC(this);
  }
}

@rarity(2)
export class ElvenBoots extends Feet {
  get material() { return Materials.Leather; }
  ac() {
    return AC(this);
  }
  Stealth() {
    return this.buc * 15;
  }
}

@rarity(3)
export class HermesSandals extends Feet {
  get material() { return Materials.Leather; }
  Haste() {
    return this.buc * 50;
  }
}

@rarity(10)
export class HighBoots extends Feet {
  get material() { return Materials.Leather; }
  ac() {
    return AC(this, 2);
  }
}

@rarity(5)
export class IronBoots extends Feet {
  get material() { return Materials.Iron; }
  ac() {
    return AC(this, 2);
  }
}

@rarity(5)
export class BootsOfProtection extends Feet {
  get material() { return Materials.Iron; }
  Protection() {
    return this.buc * -2;
  }
}