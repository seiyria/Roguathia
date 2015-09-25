
import { Body } from '../../definitions/equipment';
import { AC } from '../../lib/default-calculations';
import Materials from '../../constants/materials';
import { rarity } from '../../constants/decorators';

@rarity(100)
export class TShirt extends Body {
  get material() { return Materials.Cloth; }
}

@rarity(75)
export class LeatherJacket extends Body {
  get material() { return Materials.Leather; }
  ac() {
    return AC(this);
  }
}

@rarity(65)
export class OrcishRingMail extends Body {
  get material() { return Materials.Iron; }
  ac() {
    return AC(this, 2);
  }
}

@rarity(55)
export class StuddedLeatherArmor extends Body {
  get material() { return Materials.Leather; }
  ac() {
    return AC(this, 3);
  }
}

@rarity(55)
export class RingMail extends Body {
  get material() { return Materials.Iron; }
  ac() {
    return AC(this, 3);
  }
}

@rarity(1)
export class DragonScales extends Body {
  get material() { return Materials.Dragon; }
  ac() {
    return AC(this, 3);
  }
}

@rarity(45)
export class OrcishChainMail extends Body {
  get material() { return Materials.Iron; }
  ac() {
    return AC(this, 4);
  }
}

@rarity(45)
export class ScaleMail extends Body {
  get material() { return Materials.Iron; }
  ac() {
    return AC(this, 4);
  }
}

@rarity(25)
export class ChainMail extends Body {
  get material() { return Materials.Iron; }
  ac() {
    return AC(this, 5);
  }
}

@rarity(25)
export class ElvenMithrilCoat extends Body {
  get material() { return Materials.Mithril; }
  ac() {
    return AC(this, 5);
  }
}

@rarity(15)
export class SplintMail extends Body {
  get material() { return Materials.Iron; }
  ac() {
    return AC(this, 6);
  }
}

@rarity(15)
export class BandedMail extends Body {
  get material() { return Materials.Iron; }
  ac() {
    return AC(this, 6);
  }
}

@rarity(15)
export class DwarvenMithrilCoat extends Body {
  get material() { return Materials.Mithril; }
  ac() {
    return AC(this, 6);
  }
}

@rarity(15)
export class BronzePlateMail extends Body {
  get material() { return Materials.Copper; }
  ac() {
    return AC(this, 6);
  }
}

@rarity(5)
export class PlateMail extends Body {
  get material() { return Materials.Iron; }
  ac() {
    return AC(this, 7);
  }
}

@rarity(5)
export class CrystalPlateMail extends Body {
  get material() { return Materials.Glass; }
  ac() {
    return AC(this, 7);
  }
}

@rarity(1)
export class DragonScaleMail extends Body {
  get material() { return Materials.Dragon; }
  ac() {
    return AC(this, 9);
  }
}