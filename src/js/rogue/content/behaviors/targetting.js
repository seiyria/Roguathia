
import Behavior, { Priority } from '../../definitions/behavior';
import GameState from '../../init/gamestate';

// retarget and find a new player to attack
let targetNewPlayer = (me) => {
  if(!me.target || (me.target && me.target.hp.atMin()) || (me.target && me.target.z !== me.z)) {
    me.target = _(GameState.players).reject(player => player.hp.atMin()).sample();
  }

  if(!me.target) return false; // they can wait, you may come back

  return true; // successful retarget
};

/* always seeks a target */
class BloodthirstyBehavior extends Behavior {
  constructor() { super(Priority.MOVE); }
  act(me) {
    if(!targetNewPlayer(me)) return;
    me.stepTowards(me.target);
    return false;
  }
}
export var Bloodthirsty = () => new BloodthirstyBehavior();

/* seeks a target if they're within vision range */
class SeeksTargetInSightBehavior extends Behavior {
  constructor() { super(Priority.MOVE); }
  act(me) {
    let possibleTargets = [];

    GameState.world.fov[me.z].compute(
      me.x, me.y, me.getSight(),
      (x, y) => {
        let entity = GameState.world.getEntity(x, y, me.z);
        if(!entity || !me.canAttack(entity)) return;
        possibleTargets.push(entity);
      }
    );

    if(me.target && _.contains(possibleTargets, me.target)) {
      me.stepTowards(me.target);

    } else if(possibleTargets.length > 0) {
      me.target = _.sample(possibleTargets);
      me.stepTowards(me.target);

    } else {
      me.stepRandomly();
    }

    return false;
  }
}
export var SeeksTargetInSight = () => new SeeksTargetInSightBehavior();

/* wanders around aimlessly */
class WandersBehavior extends Behavior {
  constructor() { super(Priority.MOVE); }
  act(me) {
    me.stepRandomly();

    return false;
  }
}
export var Wanders = () => new WandersBehavior();