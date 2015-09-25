
import { Ring } from '../../definitions/equipment';
import Materials from '../../constants/materials';

// region Attribute Rings

export class RingOfStrength extends Ring {
  get material() { return Materials.Iron; }
  static get rarity() { return 15; }
  str() { return this.buc; }
}

export class RingOfConstitution extends Ring {
  get material() { return Materials.Copper; }
  static get rarity() { return 5; }
  con() { return this.buc; }
}

export class RingOfDexterity extends Ring {
  get material() { return Materials.Copper; }
  static get rarity() { return 15; }
  dex() { return this.buc; }
}

export class RingOfIntelligence extends Ring {
  get material() { return Materials.Copper; }
  static get rarity() { return 20; }
  int() { return this.buc; }
}

export class RingOfWisdom extends Ring {
  get material() { return Materials.Copper; }
  static get rarity() { return 25; }
  wis() { return this.buc; }
}

export class RingOfAdornment extends Ring {
  get material() { return Materials.Gold; }
  static get rarity() { return 2; }
  cha() { return this.buc; }
}

export class RingOfLuck extends Ring {
  get material() { return Materials.Copper; }
  static get rarity() { return 1; }
  luk() { return this.buc; }
}

// endregion

// region Trait Rings
export class RingOfProtection extends Ring {
  get material() { return Materials.Copper; }
  static get rarity() { return 5; }
  Protection() { return this.buc; }
}

export class RingOfHaste extends Ring {
  get material() { return Materials.Copper; }
  static get rarity() { return 4; }
  Haste() { return this.buc * 25; }
}

export class RingOfSight extends Ring {
  get material() { return Materials.Copper; }
  static get rarity() { return 1; }
  Infravision() { return this.buc; }
}

export class RingOfAccuracy extends Ring {
  get material() { return Materials.Copper; }
  static get rarity() { return 50; }
  toHit() { return `0d0 +${this.buc}`; }
}

export class RingOfBonusDamage extends Ring {
  get material() { return Materials.Copper; }
  static get rarity() { return 30; }
  bonusDamage() { return `0d0 +${this.buc}`; }
}

export class RingOfStealth extends Ring {
  get material() { return Materials.Cloth; }
  static get rarity() { return 1; }
  Stealth() { return this.buc * 10; }
}

export class RingOfInvisibility extends Ring {
  get material() { return Materials.Cloth; }
  static get rarity() { return 1; }
  Invisible() { return this.buc; }
}

export class RingOfSeeInvisible extends Ring {
  get material() { return Materials.Cloth; }
  static get rarity() { return 1; }
  SeeInvisible() { return this.buc; }
}

export class RingOfWarning extends Ring {
  get material() { return Materials.Leather; }
  static get rarity() { return 1; }
  Warning() { return this.buc * 10; }
}

export class RingOfRegeneration extends Ring {
  get material() { return Materials.Copper; }
  static get rarity() { return 1; }
  hpRegen() { return -3 * this.buc; }
  mpRegen() { return -3 * this.buc; }
}

// endregion

// region Resistance Rings
export class RingOfPoisonResistance extends Ring {
  get material() { return Materials.Wood; }
  static get rarity() { return 5; }
  PoisonResistance() { return this.buc; }
}

export class RingOfShockResistance extends Ring {
  get material() { return Materials.Iron; }
  static get rarity() { return 5; }
  ShockResistance() { return this.buc; }
}

export class RingOfAcidResistance extends Ring {
  get material() { return Materials.Leather; }
  static get rarity() { return 5; }
  AcidResistance() { return this.buc; }
}

export class RingOfFireResistance extends Ring {
  get material() { return Materials.Leather; }
  static get rarity() { return 5; }
  FireResistance() { return this.buc; }
}

export class RingOfIceResistance extends Ring {
  get material() { return Materials.Glass; }
  static get rarity() { return 5; }
  IceResistance() { return this.buc; }
}
// endregion