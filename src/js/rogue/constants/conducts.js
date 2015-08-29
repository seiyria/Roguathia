
const conducts = [
  { check: (player) => !player.brokenConduct.stubborn, affirmMessage: 'You never changed equipment.' },
  { check: (player) => !player.brokenConduct.wieldedWeapon, affirmMessage: 'You never hit with a wielded weapon.' },
  { check: (player) => !player.brokenConduct.pacifist, affirmMessage: 'You %tense a pacifist.' },
  { check: (player) => !player.brokenConduct.nudist, affirmMessage: 'You never equipped armor.' },
  { check: (player) => player.getAlign() === 0, affirmMessage: 'You %tense neutral.' },
  { check: (player) => player.getAlign() < 0, affirmMessage: 'You %tense evil.' },
  { check: (player) => player.getAlign() > 0, affirmMessage: 'You %tense good.' },
  { check: (player) => player.hp.atMin(), affirmMessage: 'You died.' }
];

export default (player) => {
  let finalConduct = [];

  let adjustMessage = (msg) => msg.split('%tense').join(player.hp.atMin() ? 'were' : 'are');
  let addMessage = (msg) => finalConduct.push(adjustMessage(msg));

  _.each(conducts, (conduct) => {
    if(conduct.check(player)) {
      addMessage(conduct.affirmMessage);
    } else if(conduct.rejectMessage) {
      addMessage(conduct.rejectMessage);
    }
  });

  return _.sortBy(finalConduct);
};