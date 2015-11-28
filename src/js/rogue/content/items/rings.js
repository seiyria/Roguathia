
import { Ring } from '../../definitions/equipment';
import Materials from '../../constants/materials';
import { material, rarity } from '../../constants/decorators';

// region Attribute Rings
@rarity(15)
@material(Materials.Iron)
export class RingOfStrength extends Ring {
  str() { return this.buc; }
}

@rarity(5)
@material(Materials.Copper)
export class RingOfConstitution extends Ring {
  con() { return this.buc; }
}

@rarity(15)
@material(Materials.Copper)
export class RingOfDexterity extends Ring {
  dex() { return this.buc; }
}

@rarity(20)
@material(Materials.Copper)
export class RingOfIntelligence extends Ring {
  int() { return this.buc; }
}

@rarity(25)
@material(Materials.Copper)
export class RingOfWisdom extends Ring {
  wis() { return this.buc; }
}

@rarity(2)
@material(Materials.Gold)
export class RingOfAdornment extends Ring {
  cha() { return this.buc; }
}

@rarity(1)
@material(Materials.Copper)
export class RingOfLuck extends Ring {
  luk() { return this.buc; }
}

// endregion

// region Trait Rings
@rarity(5)
@material(Materials.Copper)
export class RingOfProtection extends Ring {
  Protection() { return this.buc; }
}

@rarity(4)
@material(Materials.Copper)
export class RingOfHaste extends Ring {
  Haste() { return this.buc * 25; }
}

@rarity(1)
@material(Materials.Copper)
export class RingOfSight extends Ring {
  Infravision() { return this.buc; }
}

@rarity(25)
@material(Materials.Copper)
export class RingOfAccuracy extends Ring {
  toHit() { return `0d0 +${this.buc}`; }
}

@rarity(15)
@material(Materials.Copper)
export class RingOfBonusDamage extends Ring {
  bonusDamage() { return `0d0 +${this.buc}`; }
}

@rarity(1)
@material(Materials.Cloth)
export class RingOfStealth extends Ring {
  Stealth() { return this.buc * 2; }
}

@rarity(1)
@material(Materials.Cloth)
export class RingOfInvisibility extends Ring {
  Invisible() { return this.buc; }
}

@rarity(1)
@material(Materials.Cloth)
export class RingOfSeeInvisible extends Ring {
  SeeInvisible() { return this.buc; }
}

@rarity(1)
@material(Materials.Leather)
export class RingOfWarning extends Ring {
  Warning() { return this.buc * 2; }
}

@rarity(1)
@material(Materials.Copper)
export class RingOfRegeneration extends Ring {
  hpRegen() { return -3 * this.buc; }
  mpRegen() { return -3 * this.buc; }
}

// endregion

// region Resistance Rings
@rarity(5)
@material(Materials.Wood)
export class RingOfPoisonResistance extends Ring {
  PoisonResistance() { return this.buc; }
}

@rarity(5)
@material(Materials.Iron)
export class RingOfShockResistance extends Ring {
  ShockResistance() { return this.buc; }
}

@rarity(5)
@material(Materials.Leather)
export class RingOfAcidResistance extends Ring {
  AcidResistance() { return this.buc; }
}

@rarity(5)
@material(Materials.Leather)
export class RingOfFireResistance extends Ring {
  FireResistance() { return this.buc; }
}

@rarity(5)
@material(Materials.Glass)
export class RingOfIceResistance extends Ring {
  IceResistance() { return this.buc; }
}
// endregion