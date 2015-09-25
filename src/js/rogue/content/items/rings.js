
import { Ring } from '../../definitions/equipment';
import Materials from '../../constants/materials';
import { rarity } from '../../constants/decorators';

// region Attribute Rings
@rarity(15)
export class RingOfStrength extends Ring {
  get material() { return Materials.Iron; }
  str() { return this.buc; }
}

@rarity(5)
export class RingOfConstitution extends Ring {
  get material() { return Materials.Copper; }
  con() { return this.buc; }
}

@rarity(15)
export class RingOfDexterity extends Ring {
  get material() { return Materials.Copper; }
  dex() { return this.buc; }
}

@rarity(20)
export class RingOfIntelligence extends Ring {
  get material() { return Materials.Copper; }
  int() { return this.buc; }
}

@rarity(25)
export class RingOfWisdom extends Ring {
  get material() { return Materials.Copper; }
  wis() { return this.buc; }
}

@rarity(2)
export class RingOfAdornment extends Ring {
  get material() { return Materials.Gold; }
  cha() { return this.buc; }
}

@rarity(1)
export class RingOfLuck extends Ring {
  get material() { return Materials.Copper; }
  luk() { return this.buc; }
}

// endregion

// region Trait Rings
@rarity(5)
export class RingOfProtection extends Ring {
  get material() { return Materials.Copper; }
  Protection() { return this.buc; }
}

@rarity(4)
export class RingOfHaste extends Ring {
  get material() { return Materials.Copper; }
  Haste() { return this.buc * 25; }
}

@rarity(1)
export class RingOfSight extends Ring {
  get material() { return Materials.Copper; }
  Infravision() { return this.buc; }
}

@rarity(25)
export class RingOfAccuracy extends Ring {
  get material() { return Materials.Copper; }
  toHit() { return `0d0 +${this.buc}`; }
}

@rarity(15)
export class RingOfBonusDamage extends Ring {
  get material() { return Materials.Copper; }
  bonusDamage() { return `0d0 +${this.buc}`; }
}

@rarity(1)
export class RingOfStealth extends Ring {
  get material() { return Materials.Cloth; }
  Stealth() { return this.buc * 10; }
}

@rarity(1)
export class RingOfInvisibility extends Ring {
  get material() { return Materials.Cloth; }
  Invisible() { return this.buc; }
}

@rarity(1)
export class RingOfSeeInvisible extends Ring {
  get material() { return Materials.Cloth; }
  SeeInvisible() { return this.buc; }
}

@rarity(1)
export class RingOfWarning extends Ring {
  get material() { return Materials.Leather; }
  Warning() { return this.buc * 10; }
}

@rarity(1)
export class RingOfRegeneration extends Ring {
  get material() { return Materials.Copper; }
  hpRegen() { return -3 * this.buc; }
  mpRegen() { return -3 * this.buc; }
}

// endregion

// region Resistance Rings
@rarity(5)
export class RingOfPoisonResistance extends Ring {
  get material() { return Materials.Wood; }
  PoisonResistance() { return this.buc; }
}

@rarity(5)
export class RingOfShockResistance extends Ring {
  get material() { return Materials.Iron; }
  ShockResistance() { return this.buc; }
}

@rarity(5)
export class RingOfAcidResistance extends Ring {
  get material() { return Materials.Leather; }
  AcidResistance() { return this.buc; }
}

@rarity(5)
export class RingOfFireResistance extends Ring {
  get material() { return Materials.Leather; }
  FireResistance() { return this.buc; }
}

@rarity(5)
export class RingOfIceResistance extends Ring {
  get material() { return Materials.Glass; }
  IceResistance() { return this.buc; }
}
// endregion