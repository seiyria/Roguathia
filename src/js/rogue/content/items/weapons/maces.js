
import _ from 'lodash';
import { Hands } from '../../../definitions/equipment';
import Attacks from '../../attacks/_all';
import Materials from '../../../constants/materials';
import { material, rarity, twoHanded } from '../../../constants/decorators';

@rarity(25)
@material(Materials.Leather)
export class Bullwhip extends Hands {
  constructor(opts = {}) {
    _.extend(opts, {
      glyph: { fg: 'teal' },
      attacks: [Attacks.Smash({ roll: '1d3' })]
    });
    super(opts);
  }
}

@rarity(15)
@material(Materials.Plastic)
export class GardenHose extends Hands {
  constructor(opts = {}) {
    _.extend(opts, {
      glyph: { fg: 'teal' },
      attacks: [Attacks.Smash({ roll: '1d2' })]
    });
    super(opts);
  }
}

@rarity(25)
@material(Materials.Wood)
export class Club extends Hands {
  constructor(opts = {}) {
    _.extend(opts, {
      glyph: { fg: 'teal' },
      attacks: [Attacks.Smash({ roll: '1d6' })]
    });
    super(opts);
  }
}

@rarity(25)
@material(Materials.Iron)
export class Aklys extends Hands {
  constructor(opts = {}) {
    _.extend(opts, {
      glyph: { fg: 'teal' },
      attacks: [Attacks.Smash({ roll: '1d6' })]
    });
    super(opts);
  }
}

@rarity(20)
@material(Materials.Iron)
export class Mace extends Hands {
  constructor(opts = {}) {
    _.extend(opts, {
      glyph: { fg: 'teal' },
      attacks: [Attacks.Smash({ roll: '1d6 + 1' })]
    });
    super(opts);
  }
}

@rarity(5)
@material(Materials.Iron)
export class Flail extends Hands {
  constructor(opts = {}) {
    _.extend(opts, {
      glyph: { fg: 'teal' },
      attacks: [Attacks.Smash({ roll: '1d6 + 2', toHit: '1d2' }), Attacks.Stab({ roll: '1d2' })]
    });
    super(opts);
  }
}

@rarity(15)
@material(Materials.Iron)
export class Morningstar extends Hands {
  constructor(opts = {}) {
    _.extend(opts, {
      glyph: { fg: 'teal' },
      attacks: [Attacks.Smash({ roll: '2d4' })]
    });
    super(opts);
  }
}

@rarity(1)
@material(Materials.Iron)
@twoHanded
export class Warhammer extends Hands {
  constructor(opts = {}) {
    _.extend(opts, {
      glyph: { fg: 'teal' },
      attacks: [Attacks.Smash({ roll: '2d14' })]
    });
    super(opts);
  }
}