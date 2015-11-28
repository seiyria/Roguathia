
import { Feet } from '../../definitions/equipment';
import { AC } from '../../lib/default-calculations';
import Materials from '../../constants/materials';
import { material, rarity } from '../../constants/decorators';

@rarity(50)
@material(Materials.Leather)
export class SimpleBoots extends Feet {
  ac() {
    return AC(this);
  }
}

@rarity(2)
@material(Materials.Leather)
export class ElvenBoots extends Feet {
  ac() {
    return AC(this);
  }
  Stealth() {
    return this.buc * 3;
  }
}

@rarity(3)
@material(Materials.Leather)
export class HermesSandals extends Feet {
  Haste() {
    return this.buc * 2;
  }
}

@rarity(10)
@material(Materials.Leather)
export class HighBoots extends Feet {
  ac() {
    return AC(this, 2);
  }
}

@rarity(5)
@material(Materials.Iron)
export class IronBoots extends Feet {
  ac() {
    return AC(this, 2);
  }
}

@rarity(5)
@material(Materials.Iron)
export class BootsOfProtection extends Feet {
  Protection() {
    return this.buc * -2;
  }
}