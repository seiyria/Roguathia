
import { Body } from '../../definitions/equipment';
import { AC } from '../../lib/default-calculations';
import Materials from '../../constants/materials';
import { material, rarity } from '../../constants/decorators';

@rarity(100)
@material(Materials.Cloth)
export class TShirt extends Body {}

@rarity(50)
@material(Materials.Cloth)
export class Robe extends Body {}

@rarity(75)
@material(Materials.Leather)
export class LeatherJacket extends Body {
  ac() {
    return AC(this);
  }
}

@rarity(65)
@material(Materials.Iron)
export class OrcishRingMail extends Body {
  ac() {
    return AC(this, 2);
  }
}

@rarity(55)
@material(Materials.Leather)
export class StuddedLeatherArmor extends Body {
  ac() {
    return AC(this, 3);
  }
}

@rarity(55)
@material(Materials.Iron)
export class RingMail extends Body {
  ac() {
    return AC(this, 3);
  }
}

@rarity(1)
@material(Materials.Dragon)
export class DragonScales extends Body {
  ac() {
    return AC(this, 3);
  }
}

@rarity(45)
@material(Materials.Iron)
export class OrcishChainMail extends Body {
  ac() {
    return AC(this, 4);
  }
}

@rarity(45)
@material(Materials.Iron)
export class ScaleMail extends Body {
  ac() {
    return AC(this, 4);
  }
}

@rarity(25)
@material(Materials.Iron)
export class ChainMail extends Body {
  ac() {
    return AC(this, 5);
  }
}

@rarity(25)
@material(Materials.Mithril)
export class ElvenMithrilCoat extends Body {
  ac() {
    return AC(this, 5);
  }
}

@rarity(15)
@material(Materials.Iron)
export class SplintMail extends Body {
  ac() {
    return AC(this, 6);
  }
}

@rarity(15)
@material(Materials.Iron)
export class BandedMail extends Body {
  ac() {
    return AC(this, 6);
  }
}

@rarity(15)
@material(Materials.Mithril)
export class DwarvenMithrilCoat extends Body {
  ac() {
    return AC(this, 6);
  }
}

@rarity(15)
@material(Materials.Copper)
export class BronzePlateMail extends Body {
  ac() {
    return AC(this, 6);
  }
}

@rarity(5)
@material(Materials.Iron)
export class PlateMail extends Body {
  ac() {
    return AC(this, 7);
  }
}

@rarity(5)
@material(Materials.Glass)
export class CrystalPlateMail extends Body {
  ac() {
    return AC(this, 7);
  }
}

@rarity(1)
@material(Materials.Dragon)
export class DragonScaleMail extends Body {
  ac() {
    return AC(this, 9);
  }
}