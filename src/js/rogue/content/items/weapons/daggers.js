
import _ from 'lodash';
import { Hands } from '../../../definitions/equipment';
import Attacks from '../../attacks/_all';
import Materials from '../../../constants/materials';

export class OrcishDagger extends Hands {
  get material() { return Materials.Copper; }
  static get rarity() { return 35; }
  constructor(opts = {}) {
    _.extend(opts, {
      glyph: { fg: '#ccc' },
      attacks: [Attacks.Stab({ roll: '1d3' })]
    });
    super(opts);
  }
}

export class Dagger extends Hands {
  get material() { return Materials.Iron; }
  static get rarity() { return 25; }
  constructor(opts = {}) {
    _.extend(opts, {
      glyph: { fg: 'teal' },
      attacks: [Attacks.Stab({ roll: '1d4' })]
    });
    super(opts);
  }
}

export class SilverDagger extends Hands {
  get material() { return Materials.Silver; }
  static get rarity() { return 15; }
  constructor(opts = {}) {
    _.extend(opts, {
      glyph: { fg: 'teal' },
      attacks: [Attacks.Stab({ roll: '1d5' })]
    });
    super(opts);
  }
}

export class ElvenDagger extends Hands {
  get material() { return Materials.Mithril; }
  static get rarity() { return 15; }
  constructor(opts = {}) {
    _.extend(opts, {
      glyph: { fg: 'teal' },
      attacks: [Attacks.Stab({ roll: '1d7' })]
    });
    super(opts);
  }
}

export class Crysknife extends Hands {
  get material() { return Materials.Mineral; }
  static get rarity() { return 15; }
  constructor(opts = {}) {
    _.extend(opts, {
      glyph: { fg: 'teal' },
      attacks: [Attacks.Stab({ roll: '1d10' })]
    });
    super(opts);
  }
}