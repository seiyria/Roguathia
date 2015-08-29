
import * as MonsterAttacks from './monster-attacks';
import * as PhysicalAttacks from './physical-attacks';
import * as MagicAttacks from './magic-attacks';

let attacks = {};
let theseAttacks = _.values(MonsterAttacks)
  .concat(_.values(PhysicalAttacks))
  .concat(_.values(MagicAttacks));

_.each(theseAttacks, (attack) => {
  let attackFunc = (r, h, d) => new attack(r, h, d);
  attackFunc.real = attack;
  attacks[attack.name] = attackFunc;
});
export default attacks;



