
import { Head } from '../../definitions/equipment';
import { AC } from '../../lib/default-calculations';
import Materials from '../../constants/materials';

export class OrdinaryHat extends Head {
  static get rarity() { return 50; }
  get material() { return Materials.Cloth; }
}

export class Fedora extends Head {
  static get rarity() { return 1; } // so hipster
  get material() { return Materials.Cloth; }
}

export class NightGoggles extends Head {
  static get rarity() { return 2; }
  get material() { return Materials.Leather; }
  Infravision() {
    return this.buc;
  }
}

export class DunceCap extends Head {
  static get rarity() { return 2; }
  get material() { return Materials.Cloth; }
  int() { return -5; }
  wis() { return -5; }
  constructor(opts) {
    opts.bucName = 'cursed'; // always starts cursed
    super(opts);
  }
}

export class Cornuthaum extends Head {
  static get rarity() { return 2; }
  get material() { return Materials.Cloth; }
  Clairvoyance() {
    return 5;
  }
}

export class OrcishHelm extends Head {
  static get rarity() { return 15; }
  get material() { return Materials.Iron; }
  ac() {
    return AC(this);
  }
}

export class DentedPot extends Head {
  static get rarity() { return 35; }
  get material() { return Materials.Iron; }
  ac() {
    return AC(this);
  }
}

export class ElvenLeatherHelm extends Head {
  static get rarity() { return 15; }
  get material() { return Materials.Leather; }
  ac() {
    return AC(this);
  }
}

export class HelmOfBrilliance extends Head {
  static get rarity() { return 3; }
  get material() { return Materials.Iron; }
  int() { return 3; }
  wis() { return 3; }
  ac() {
    return AC(this);
  }
}

export class HelmOfTelepathy extends Head {
  static get rarity() { return 2; }
  get material() { return Materials.Iron; }
  Telepathy() {
    return 20;
  }
}

export class DwarvenIronHelm extends Head {
  static get rarity() { return 10; }
  get material() { return Materials.Iron; }
  ac() {
    return AC(this, 2);
  }
}

export class HelmOfProtection extends Head {
  static get rarity() { return 5; }
  get material() { return Materials.Iron; }
  Protection() {
    return this.buc * -2;
  }
}