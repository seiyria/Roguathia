
import * as Behaviors from '../behaviors/_all';
import * as Attacks from '../attacks/_all';
import Factions from '../../constants/factions';

export const waterMoccasin = { difficulty: 7, spawnPattern: '1d1', frequency: 0, init: () =>
  ({ glyph: { key: 'S', fg: 'red' },
    addAntiFactions: [Factions.ALL],
    attributes: { ac: -7, speed: 200, level: 4, killXp: '6d10', spawnHp: '2d4' },
    stats: { name: 'water moccasin', race: 'Snake',
      behaviors: [Behaviors.LeavesCorpse(), Behaviors.SeeksTargetViaHearing(), Behaviors.SeeksTargetInSight(), Behaviors.Attacks()],
      attacks: [Attacks.PoisonBite({ roll: '1d6' })]
    } }) };

export const waterDemon = { difficulty: 11, spawnPattern: '1d1', frequency: 0, init: () =>
  ({ glyph: { key: '&', fg: 'blue' },
    attributes: { ac: -14, speed: 175, level: 8, killXp: '18d10', spawnHp: '5d10' },
    stats: { name: 'water demon', race: 'Demon',
      behaviors: [Behaviors.SeeksTargetInSight(), Behaviors.Attacks(), Behaviors.DropsItems()]
    } }) };