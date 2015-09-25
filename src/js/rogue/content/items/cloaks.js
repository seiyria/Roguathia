
import { Cloak } from '../../definitions/equipment';
import { AC } from '../../lib/default-calculations';
import Materials from '../../constants/materials';
import { rarity } from '../../constants/decorators';

@rarity(50)
export class OrdinaryCloak extends Cloak {
  get material() { return Materials.Cloth; }
}

@rarity(10)
export class MummyWrapping extends Cloak {
  get material() { return Materials.Cloth; }
  Invisible() { return -1; }
}

@rarity(20)
export class OrcishCloak extends Cloak {
  get material() { return Materials.Cloth; }
}

@rarity(20)
export class DwarvenCloak extends Cloak {
  get material() { return Materials.Cloth; }
}

@rarity(2)
export class LeatherCloak extends Cloak {
  get material() { return Materials.Leather; }
  ac() {
    return AC(this, 1);
  }
}

@rarity(1)
export class AlchemySmock extends Cloak {
  get material() { return Materials.Cloth; }
  ac() {
    return AC(this, 1);
  }
  PoisonResistance() { return 1; }
  AcidResistance() { return 1; }
}

@rarity(1)
export class InvisibilityCloak extends Cloak {
  get material() { return Materials.Cloth; }
  Invisible() { return 1; }
}

@rarity(1)
export class ElvenCloak extends Cloak {
  get material() { return Materials.Cloth; }
  Stealth() { return this.buc * 10; }
}

@rarity(1)
export class Robe extends Cloak {
  get material() { return Materials.Cloth; }
  ac() {
    return AC(this, 2);
  }
}

@rarity(5)
export class CloakOfProtection extends Cloak {
  get material() { return Materials.Cloth; }
  Protection() {
    return this.buc * -2;
  }
}