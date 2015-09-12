
import _ from 'lodash';
import Settings from './settings';

const conducts = [
  // breakable conducts
  { check: (player) => !player.brokenConduct.stubborn, affirmMessage: 'You never changed equipment.' },
  { check: (player) => !player.brokenConduct.wieldedWeapon, affirmMessage: 'You never hit with a wielded weapon.' },
  { check: (player) => !player.brokenConduct.pacifist, affirmMessage: 'You %were a pacifist.' },
  { check: (player) => !player.brokenConduct.nudist, affirmMessage: 'You never equipped armor.' },
  { check: (player) => !player.brokenConduct.celibate, affirmMessage: 'You %were celibate.' },

  // traits
  { check: (player) => player.hasTrait('Infravision'), affirmMessage: 'You %had infravision.' },
  { check: (player) => player.hasTrait('Protection'), affirmMessage: 'You %had protection.' },
  { check: (player) => player.hasTrait('Clairvoyance'), affirmMessage: 'You %had clairvoyance.' },
  { check: (player) => player.hasTrait('Warning'), affirmMessage: 'You %were warned.' },
  { check: (player) => player.hasTrait('Telepathy'), affirmMessage: 'You %were telepathic.' },
  { check: (player) => player.hasTrait('Stealth'), affirmMessage: 'You %were stealthy.' },
  { check: (player) => player.hasTrait('Invisible'), affirmMessage: 'You %were invisible.' },
  { check: (player) => player.hasTrait('SeeInvisible'), affirmMessage: 'You %could see invisible.' },
  { check: (player) => player.getSpeed() > Settings.game.baseSpeed, affirmMessage: 'You %were fast.' },
  { check: (player) => player.getSpeed() < Settings.game.baseSpeed, affirmMessage: 'You %were slow.' },

  { check: (player) => player.hasTrait('PoisonResistance'), affirmMessage: 'You %were poison resistant.' },
  { check: (player) => player.hasTrait('ShockResistance'), affirmMessage: 'You %were shock resistant.' },
  { check: (player) => player.hasTrait('FireResistance'), affirmMessage: 'You %were fire resistant.' },

  // statuses
  { check: (player) => player.hasBehavior('Stunned'), affirmMessage: 'You %were stunned.' },
  { check: (player) => player.hasBehavior('Poisoned'), affirmMessage: 'You %were poisoned.' },
  { check: (player) => player.hasBehavior('Seduced'), affirmMessage: 'You %were seduced.' },

  // alignment
  { check: (player) => player.getAlign() === 0, affirmMessage: 'You %were neutral.' },
  { check: (player) => player.getAlign() < 0, affirmMessage: 'You %were evil.' },
  { check: (player) => player.getAlign() > 0, affirmMessage: 'You %were good.' },

  // you probably always see this
  { check: (player) => player.hp.atMin(), affirmMessage: 'You died.' }
];

export default (player) => {
  const finalConduct = [];

  const tenses = [
    { split: '%could', past: 'could', now: 'can' },
    { split: '%were',  past: 'were',  now: 'are' },
    { split: '%had',   past: 'had',   now: 'have' }
  ];

  const adjustMessage = (msg) => _.reduce(tenses, ((prev, obj) => prev.split(obj.split).join(player.hp.atMin() ? obj.past : obj.now)), msg);
  const addMessage = (msg) => finalConduct.push(adjustMessage(msg));

  _.each(conducts, (conduct) => {
    if(conduct.check(player)) {
      addMessage(conduct.affirmMessage);
    } else if(conduct.rejectMessage) {
      addMessage(conduct.rejectMessage);
    }
  });

  return _.sortBy(finalConduct);
};