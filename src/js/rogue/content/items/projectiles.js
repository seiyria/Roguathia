
import _ from 'lodash';
import { Weapon } from '../../definitions/equipment';
import Attacks from '../attacks/_all';
import Materials from '../../constants/materials';
import { material, rarity } from '../../constants/decorators';

@rarity(50)
@material(Materials.Iron)
export class Dart extends Weapon {
  constructor(opts = {}) {
    _.extend(opts, {
      autoRemove: true,
      charges: '2d4',
      glyph: { key: ')', fg: '#00f' },
      attacks: [Attacks.Shot({ roll: '1d3', toHit: '0d0', range: 3 })]
    });
    super(opts);
  }
}

@rarity(50)
@material(Materials.Stone)
export class Rock extends Weapon {
  constructor(opts = {}) {
    _.extend(opts, {
      autoRemove: true,
      charges: '2d4',
      glyph: { key: ')', fg: '#00f' },
      attacks: [Attacks.Shot({ roll: '1d3', toHit: '0d0', range: 9 })]
    });
    super(opts);
  }
}

@rarity(25)
@material(Materials.Stone)
export class FlintStone extends Weapon {
  constructor(opts = {}) {
    _.extend(opts, {
      autoRemove: true,
      charges: '2d4',
      glyph: { key: ')', fg: '#00f' },
      attacks: [Attacks.Shot({ roll: '1d6', toHit: '0d0', range: 4 })]
    });
    super(opts);
  }
}

@rarity(10)
@material(Materials.Iron)
export class Javelin extends Weapon {
  constructor(opts = {}) {
    _.extend(opts, {
      autoRemove: true,
      charges: '1d4',
      glyph: { key: ')', fg: '#00f' },
      attacks: [Attacks.Shot({ roll: '1d6', range: 9 })]
    });
    super(opts);
  }
}

@rarity(5)
@material(Materials.Iron)
export class Shuriken extends Weapon {
  constructor(opts = {}) {
    _.extend(opts, {
      autoRemove: true,
      charges: '5d4',
      glyph: { key: ')', fg: '#00f' },
      attacks: [Attacks.Shot({ roll: '1d8', range: 15 })]
    });
    super(opts);
  }
}

@rarity(5)
@material(Materials.Iron)
export class Stiletto extends Weapon {
  constructor(opts = {}) {
    _.extend(opts, {
      autoRemove: true,
      charges: '4d4',
      glyph: { key: ')', fg: '#00f' },
      attacks: [Attacks.Shot({ roll: '1d4', toHit: '0d0', range: 4 })]
    });
    super(opts);
  }
}

@rarity(25)
@material(Materials.Wood)
export class OrcishArrow extends Weapon {
  constructor(opts = {}) {
    _.extend(opts, {
      autoRemove: true,
      charges: '1d4',
      glyph: { key: ')', fg: '#f0f' },
      attacks: [Attacks.Shot({ roll: '1d5', toHit: '0d0', range: 5 })]
    });
    super(opts);
  }
}

@rarity(20)
@material(Materials.Wood)
export class Arrow extends Weapon {
  constructor(opts = {}) {
    _.extend(opts, {
      autoRemove: true,
      charges: '1d4',
      glyph: { key: ')', fg: '#f0f' },
      attacks: [Attacks.Shot({ roll: '1d6', toHit: '0d0', range: 6 })]
    });
    super(opts);
  }
}

@rarity(15)
@material(Materials.Iron)
export class ElvenArrow extends Weapon {
  constructor(opts = {}) {
    _.extend(opts, {
      autoRemove: true,
      charges: '2d4',
      glyph: { key: ')', fg: '#f0f' },
      attacks: [Attacks.Shot({ roll: '1d8', toHit: '1d1', range: 7 })]
    });
    super(opts);
  }
}

@rarity(25)
@material(Materials.Wood)
export class Bolt extends Weapon {
  constructor(opts = {}) {
    _.extend(opts, {
      autoRemove: true,
      charges: '1d4',
      glyph: { key: ')', fg: '#f0f' },
      attacks: [Attacks.Shot({ roll: '1d8', toHit: '0d0', range: 4 })]
    });
    super(opts);
  }
}