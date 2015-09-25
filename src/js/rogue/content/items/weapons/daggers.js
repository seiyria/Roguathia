
import _ from 'lodash';
import { Hands } from '../../../definitions/equipment';
import Attacks from '../../attacks/_all';
import Materials from '../../../constants/materials';
import { rarity } from '../../../constants/decorators';

@rarity(35)
export class OrcishDagger extends Hands {
  get material() { return Materials.Copper; }
  constructor(opts = {}) {
    _.extend(opts, {
      glyph: { fg: '#ccc' },
      attacks: [Attacks.Stab({ roll: '1d3' })]
    });
    super(opts);
  }
}

@rarity(25)
export class Dagger extends Hands {
  get material() { return Materials.Iron; }
  constructor(opts = {}) {
    _.extend(opts, {
      glyph: { fg: 'teal' },
      attacks: [Attacks.Stab({ roll: '1d4' })]
    });
    super(opts);
  }
}

@rarity(15)
export class SilverDagger extends Hands {
  get material() { return Materials.Silver; }
  constructor(opts = {}) {
    _.extend(opts, {
      glyph: { fg: 'teal' },
      attacks: [Attacks.Stab({ roll: '1d5' })]
    });
    super(opts);
  }
}

@rarity(15)
export class ElvenDagger extends Hands {
  get material() { return Materials.Mithril; }
  constructor(opts = {}) {
    _.extend(opts, {
      glyph: { fg: 'teal' },
      attacks: [Attacks.Stab({ roll: '1d7' })]
    });
    super(opts);
  }
}

@rarity(5)
export class Crysknife extends Hands {
  get material() { return Materials.Mineral; }
  constructor(opts = {}) {
    _.extend(opts, {
      glyph: { fg: 'teal' },
      attacks: [Attacks.Stab({ roll: '1d10' })]
    });
    super(opts);
  }
}