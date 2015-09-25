
import _ from 'lodash';
import { Hands } from '../../../definitions/equipment';
import Attacks from '../../attacks/_all';
import Materials from '../../../constants/materials';
import { material, rarity, twoHanded } from '../../../constants/decorators';

@rarity(25)
@material(Materials.Iron)
export class Longsword extends Hands {
  constructor(opts = {}) {
    _.extend(opts, {
      glyph: { fg: 'teal' },
      attacks: [Attacks.Slash({ roll: '1d8' })]
    });
    super(opts);
  }
}

@rarity(15)
@material(Materials.Iron)
export class Katana extends Hands {
  constructor(opts = {}) {
    _.extend(opts, {
      glyph: { fg: 'teal' },
      attacks: [Attacks.Slash({ roll: '1d10' })]
    });
    super(opts);
  }
}

@rarity(20)
@material(Materials.Iron)
export class Broadsword extends Hands {
  constructor(opts = {}) {
    _.extend(opts, {
      glyph: { fg: 'teal' },
      attacks: [Attacks.Slash({ roll: '2d4' })]
    });
    super(opts);
  }
}

@rarity(5)
@material(Materials.Wood)
export class ElvenBroadsword extends Hands {
  constructor(opts = {}) {
    _.extend(opts, {
      glyph: { fg: 'teal' },
      attacks: [Attacks.Slash({ roll: '1d6 + 1d4' })]
    });
    super(opts);
  }
}

@rarity(1)
@material(Materials.Silver)
export class SilverSaber extends Hands {
  constructor(opts = {}) {
    _.extend(opts, {
      glyph: { fg: 'teal' },
      attacks: [Attacks.Slash({ roll: '1d8', toHit: '1d4' })]
    });
    super(opts);
  }
}

@rarity(5)
@material(Materials.Iron)
export class Scimitar extends Hands {
  constructor(opts = {}) {
    _.extend(opts, {
      glyph: { fg: 'teal' },
      attacks: [Attacks.Slash({ roll: '1d8', toHit: '1d4' })]
    });
    super(opts);
  }
}

@rarity(15)
@material(Materials.Iron)
@twoHanded
export class Greatsword extends Hands {
  constructor(opts = {}) {
    _.extend(opts, {
      glyph: { fg: 'teal' },
      attacks: [Attacks.Slash({ roll: '1d12' })]
    });
    super(opts);
  }
}

@rarity(1)
@material(Materials.Iron)
@twoHanded
export class Tsurugi extends Hands {
  constructor(opts = {}) {
    _.extend(opts, {
      glyph: { fg: 'teal' },
      attacks: [Attacks.Slash({ roll: '1d16' })]
    });
    super(opts);
  }
}