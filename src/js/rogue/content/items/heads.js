
import { Head } from '../../definitions/equipment';
import { AC } from '../../lib/default-calculations';
import Materials from '../../constants/materials';
import { material, rarity } from '../../constants/decorators';

@rarity(50)
@material(Materials.Cloth)
export class OrdinaryHat extends Head {}

@rarity(1) // so hipster
@material(Materials.Cloth)
export class Fedora extends Head {}

@rarity(2)
@material(Materials.Leather)
export class NightGoggles extends Head {
  Infravision() {
    return this.buc;
  }
}

@rarity(2)
@material(Materials.Cloth)
export class DunceCap extends Head {
  int() { return -5; }
  wis() { return -5; }
  constructor(opts = {}) {
    opts.bucName = 'cursed'; // always starts cursed
    super(opts);
  }
}

@rarity(2)
@material(Materials.Cloth)
export class Cornuthaum extends Head {
  Clairvoyance() {
    return 5;
  }
}

@rarity(15)
@material(Materials.Iron)
export class OrcishHelm extends Head {
  ac() {
    return AC(this);
  }
}

@rarity(35)
@material(Materials.Iron)
export class DentedPot extends Head {
  ac() {
    return AC(this);
  }
}

@rarity(15)
@material(Materials.Leather)
export class ElvenLeatherHelm extends Head {
  ac() {
    return AC(this);
  }
}

@rarity(3)
@material(Materials.Iron)
export class HelmOfBrilliance extends Head {
  int() { return 3; }
  wis() { return 3; }
  ac() {
    return AC(this);
  }
}

@rarity(2)
@material(Materials.Iron)
export class HelmOfTelepathy extends Head {
  Telepathy() {
    return 20;
  }
}

@rarity(10)
@material(Materials.Iron)
export class DwarvenIronHelm extends Head {
  ac() {
    return AC(this, 2);
  }
}

@rarity(5)
@material(Materials.Iron)
export class HelmOfProtection extends Head {
  Protection() {
    return this.buc * -2;
  }
}