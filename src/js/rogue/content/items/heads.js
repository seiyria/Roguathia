
import { Head } from '../../definitions/equipment';
import { AC } from '../../lib/default-calculations';
import Materials from '../../constants/materials';
import { rarity } from '../../constants/decorators';

@rarity(50)
export class OrdinaryHat extends Head {
  get material() { return Materials.Cloth; }
}

@rarity(1) // so hipster
export class Fedora extends Head {
  get material() { return Materials.Cloth; }
}

@rarity(2)
export class NightGoggles extends Head {
  get material() { return Materials.Leather; }
  Infravision() {
    return this.buc;
  }
}

@rarity(2)
export class DunceCap extends Head {
  get material() { return Materials.Cloth; }
  int() { return -5; }
  wis() { return -5; }
  constructor(opts) {
    opts.bucName = 'cursed'; // always starts cursed
    super(opts);
  }
}

@rarity(2)
export class Cornuthaum extends Head {
  get material() { return Materials.Cloth; }
  Clairvoyance() {
    return 5;
  }
}

@rarity(15)
export class OrcishHelm extends Head {
  get material() { return Materials.Iron; }
  ac() {
    return AC(this);
  }
}

@rarity(35)
export class DentedPot extends Head {
  get material() { return Materials.Iron; }
  ac() {
    return AC(this);
  }
}

@rarity(15)
export class ElvenLeatherHelm extends Head {
  get material() { return Materials.Leather; }
  ac() {
    return AC(this);
  }
}

@rarity(3)
export class HelmOfBrilliance extends Head {
  get material() { return Materials.Iron; }
  int() { return 3; }
  wis() { return 3; }
  ac() {
    return AC(this);
  }
}

@rarity(2)
export class HelmOfTelepathy extends Head {
  get material() { return Materials.Iron; }
  Telepathy() {
    return 20;
  }
}

@rarity(10)
export class DwarvenIronHelm extends Head {
  get material() { return Materials.Iron; }
  ac() {
    return AC(this, 2);
  }
}

@rarity(5)
export class HelmOfProtection extends Head {
  get material() { return Materials.Iron; }
  Protection() {
    return this.buc * -2;
  }
}