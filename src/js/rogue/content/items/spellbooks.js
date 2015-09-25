
import _ from 'lodash';
import { Spellbook } from '../../definitions/equipment';
import Attacks from '../attacks/_all';
import { rarity } from '../../constants/decorators';

@rarity(25)
export class ForceBolt extends Spellbook {
  constructor(opts = {}) {
    _.extend(opts, {
      manaCost: 2,
      attacks: [Attacks.Force({ roll: '2d6', range: 4 })]
    });
    super(opts);
  }
}

@rarity(0)
export class CureSelf extends Spellbook {
  constructor(opts = {}) {
    _.extend(opts, {
      manaCost: 10,
      healRoll: '3d6'
    });
    super(opts);
  }
}