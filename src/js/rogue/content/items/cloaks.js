
import { Cloak } from '../../definitions/equipment';
import { AC } from '../../lib/default-calculations';
import Materials from '../../constants/materials';
import { material, rarity } from '../../constants/decorators';

@rarity(50)
@material(Materials.Cloth)
export class OrdinaryCloak extends Cloak {}

@rarity(10)
@material(Materials.Cloth)
export class MummyWrapping extends Cloak {
  Invisible() { return -1; }
}

@rarity(20)
@material(Materials.Cloth)
export class OrcishCloak extends Cloak {}

@rarity(20)
@material(Materials.Cloth)
export class DwarvenCloak extends Cloak {}

@rarity(2)
@material(Materials.Cloth)
@material(Materials.Leather)
export class LeatherCloak extends Cloak {
  ac() {
    return AC(this, 1);
  }
}

@rarity(1)
@material(Materials.Cloth)
export class AlchemySmock extends Cloak {
  ac() {
    return AC(this, 1);
  }
  PoisonResistance() { return 1; }
  AcidResistance() { return 1; }
}

@rarity(1)
@material(Materials.Cloth)
export class InvisibilityCloak extends Cloak {
  Invisible() { return 1; }
}

@rarity(1)
@material(Materials.Cloth)
export class ElvenCloak extends Cloak {
  Stealth() { return this.buc * 2; }
}

@rarity(1)
@material(Materials.Cloth)
export class Robe extends Cloak {
  ac() {
    return AC(this, 2);
  }
}

@rarity(5)
@material(Materials.Cloth)
export class CloakOfProtection extends Cloak {
  Protection() {
    return this.buc * -2;
  }
}