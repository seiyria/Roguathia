
import _ from 'lodash';
import Professions from '../content/professions/_all';
import Races from '../content/races/_all';

const upgrades = [
  { name: 'Rename Tag',
    help: 'Allow for renaming of player characters.',
    cost: 100000,
    currency: 'sp' }
];

_.each(_.keys(Professions), profession => {
  upgrades.push(
    { name: `Random: ${profession}`,
      help: `This class (${profession}) will show up randomly.`,
      cost: 10000,
      currency: 'sp',
      operate: (upgradeData) => upgradeData.unlocked.profession.push(profession)
    });

  upgrades.push(
    { name: `Class: ${profession}`,
      help: `This class (${profession}) can be selected for all party members.`,
      req: `Random: ${profession}`,
      cost: 50000,
      currency: 'sp',
      operate: (upgradeData) => upgradeData.selectable.profession.push(profession)
    });
});

_.each(_.keys(Races), race => {
  upgrades.push(
    { name: `Random: ${race}`,
      help: `This race (${race}) will show up randomly.`,
      cost: 30000,
      currency: 'sp',
      operate: (upgradeData) => upgradeData.unlocked.race.push(race)
    });

  upgrades.push(
    { name: `Race: ${race}`,
      help: `This race (${race}) can be selected for all party members.`,
      req: `Random: ${race}`,
      cost: 80000,
      currency: 'sp',
      operate: (upgradeData) => upgradeData.selectable.race.push(race)
    });
});

for(let i = 0; i < 3; i++) {
  upgrades.push({
    name: `Bigger Party ${i+1}`,
    help: `Add one member to your adventuring party.`,
    req: i > 0 ? `Bigger Party ${i}` : null,
    currency: 'sp',
    cost: (i+2) * 150000,
    operate: (upgradeData) => upgradeData.extra.players++
  });
}

export default upgrades;
