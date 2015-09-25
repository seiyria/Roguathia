
import _ from 'lodash';
import { Hands } from '../../../definitions/equipment';
import Attacks from '../../attacks/_all';
import Materials from '../../../constants/materials';
import { material, rarity, twoHanded } from '../../../constants/decorators';

@rarity(5)
@material(Materials.Wood)
@twoHanded
export class Partisan extends Hands {
  constructor(opts = {}) {
    _.extend(opts, {
      glyph: { fg: '#ccc' },
      attacks: [Attacks.Stab({ roll: '1d3' }), Attacks.Slash({ roll: '1d6' })]
    });
    super(opts);
  }
}

@rarity(5)
@material(Materials.Wood)
@twoHanded
export class Glaive extends Hands {
  constructor(opts = {}) {
    _.extend(opts, {
      glyph: { fg: '#ccc' },
      attacks: [Attacks.Stab({ roll: '1d3' }), Attacks.Slash({ roll: '1d8' })]
    });
    super(opts);
  }
}

@rarity(5)
@material(Materials.Wood)
@twoHanded
export class Spetum extends Hands {
  constructor(opts = {}) {
    _.extend(opts, {
      glyph: { fg: '#ccc' },
      attacks: [Attacks.Stab({ roll: '1d8' }), Attacks.Slash({ roll: '1d4' })]
    });
    super(opts);
  }
}

@rarity(1)
@material(Materials.Iron)
@twoHanded
export class LucerneHammer extends Hands {
  constructor(opts = {}) {
    _.extend(opts, {
      glyph: { fg: '#ccc' },
      attacks: [Attacks.Stab({ roll: '1d8' }), Attacks.Slash({ roll: '1d4' }), Attacks.Smash({ roll: '1d4' })]
    });
    super(opts);
  }
}

@rarity(3)
@material(Materials.Wood)
@twoHanded
export class Guisarme extends Hands {
  constructor(opts = {}) {
    _.extend(opts, {
      glyph: { fg: '#ccc' },
      attacks: [Attacks.Stab({ roll: '1d5 + 1d5 + 1d5' })]
    });
    super(opts);
  }
}

@rarity(3)
@material(Materials.Wood)
@twoHanded
export class Ranseur extends Hands {
  constructor(opts = {}) {
    _.extend(opts, {
      glyph: { fg: '#ccc' },
      attacks: [Attacks.Stab({ roll: '1d10 + 1d3 + 1d3' })]
    });
    super(opts);
  }
}

@rarity(5)
@material(Materials.Wood)
@twoHanded
export class Voulge extends Hands {
  constructor(opts = {}) {
    _.extend(opts, {
      glyph: { fg: '#ccc' },
      attacks: [Attacks.Stab({ roll: '1d3' }), Attacks.Slash({ roll: '1d10' })]
    });
    super(opts);
  }
}

@rarity(1)
@material(Materials.Wood)
@twoHanded
export class Halberd extends Hands {
  constructor(opts = {}) {
    _.extend(opts, {
      glyph: { fg: '#ccc' },
      attacks: [Attacks.Stab({ roll: '1d4' }), Attacks.Slash({ roll: '1d10 + 1d5' })]
    });
    super(opts);
  }
}

@rarity(1)
@material(Materials.Wood)
@twoHanded
export class Bardiche extends Hands {
  constructor(opts = {}) {
    _.extend(opts, {
      glyph: { fg: '#ccc' },
      attacks: [Attacks.Slash({ roll: '1d5 * 4' })]
    });
    super(opts);
  }
}