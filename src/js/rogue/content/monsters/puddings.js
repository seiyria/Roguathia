
import * as Behaviors from '../behaviors/_all';
import Attacks from '../attacks/_all';

export const blackPudding = { difficulty: 12, spawnPattern: '1d1', frequency: 1, init: () =>
  ({ glyph: { key: 'P', fg: 'gray' },
  attributes: { ac: -4, speed: 30, level: 10, killXp: '20d10', spawnHp: '5d5' },
  stats: { name: 'black pudding', race: 'Pudding',
    behaviors: [Behaviors.LeavesCorpse(), Behaviors.SplitsWhenHit(), Behaviors.SeeksTargetViaHearing(), Behaviors.SeeksTargetInSight(), Behaviors.Attacks()],
    attacks: [Attacks.Claw({ roll: '3d8' })]
  } }) };

// todo implement corrision (-1 enchantLevel hit with a corrosionPercent chance of happening, adds "corroded" to name if < 0)
// add CorrodesWhenHit and a corrosion attribute to the attack that both do the same thing. Or maybe a CorrodeOnHit behavior?