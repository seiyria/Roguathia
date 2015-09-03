
import _ from 'lodash';
import * as MonsterAttacks from './monster-attacks';
import * as PhysicalAttacks from './physical-attacks';
import * as MagicAttacks from './magic-attacks';

const attacks = {};
const theseAttacks = _.values(MonsterAttacks)
  .concat(_.values(PhysicalAttacks))
  .concat(_.values(MagicAttacks));

_.each(theseAttacks, (attack) => {
  const attackFunc = (r, h, d) => new attack(r, h, d);
  attackFunc.real = attack;
  attacks[attack.name] = attackFunc;
});
export default attacks;



