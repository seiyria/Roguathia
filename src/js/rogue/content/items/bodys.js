
import { Body } from '../../definitions/equipment';
import { AC } from '../../lib/default-calculations';
import Materials from '../../constants/materials';

export class TShirt extends Body {
  get material() { return Materials.Cloth; }
  static get rarity() { return 100; }
}

export class LeatherJacket extends Body {
  get material() { return Materials.Leather; }
  static get rarity() { return 75; }
  ac() {
    return AC(this);
  }
}

export class OrcishRingMail extends Body {
  get material() { return Materials.Iron; }
  static get rarity() { return 65; }
  ac() {
    return AC(this, 2);
  }
}

export class StuddedLeatherArmor extends Body {
  get material() { return Materials.Leather; }
  static get rarity() { return 55; }
  ac() {
    return AC(this, 3);
  }
}

export class RingMail extends Body {
  get material() { return Materials.Iron; }
  static get rarity() { return 55; }
  ac() {
    return AC(this, 3);
  }
}

export class DragonScales extends Body {
  get material() { return Materials.Dragon; }
  static get rarity() { return 1; }
  ac() {
    return AC(this, 3);
  }
}

export class OrcishChainMail extends Body {
  get material() { return Materials.Iron; }
  static get rarity() { return 45; }
  ac() {
    return AC(this, 4);
  }
}

export class ScaleMail extends Body {
  get material() { return Materials.Iron; }
  static get rarity() { return 45; }
  ac() {
    return AC(this, 4);
  }
}

export class ChainMail extends Body {
  get material() { return Materials.Iron; }
  static get rarity() { return 25; }
  ac() {
    return AC(this, 5);
  }
}

export class ElvenMithrilCoat extends Body {
  get material() { return Materials.Mithril; }
  static get rarity() { return 25; }
  ac() {
    return AC(this, 5);
  }
}

export class SplintMail extends Body {
  get material() { return Materials.Iron; }
  static get rarity() { return 15; }
  ac() {
    return AC(this, 6);
  }
}

export class BandedMail extends Body {
  get material() { return Materials.Iron; }
  static get rarity() { return 15; }
  ac() {
    return AC(this, 6);
  }
}

export class DwarvenMithrilCoat extends Body {
  get material() { return Materials.Mithril; }
  static get rarity() { return 15; }
  ac() {
    return AC(this, 6);
  }
}

export class BronzePlateMail extends Body {
  get material() { return Materials.Copper; }
  static get rarity() { return 15; }
  ac() {
    return AC(this, 6);
  }
}

export class PlateMail extends Body {
  get material() { return Materials.Iron; }
  static get rarity() { return 5; }
  ac() {
    return AC(this, 7);
  }
}

export class CrystalPlateMail extends Body {
  get material() { return Materials.Glass; }
  static get rarity() { return 5; }
  ac() {
    return AC(this, 7);
  }
}

export class DragonScaleMail extends Body {
  get material() { return Materials.Dragon; }
  static get rarity() { return 1; }
  ac() {
    return AC(this, 9);
  }
}