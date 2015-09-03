
import _ from 'lodash';
import Behavior, { Priority } from '../../definitions/behavior';
import GameState from '../../init/gamestate';

const isTargetBad = (me) => {
  return !me.target || (me.target && me.target.hp.atMin()) || (me.target && me.target.z !== me.z);
};

// retarget and find a new player to attack
const targetNewPlayer = (me) => {
  if(isTargetBad(me)) {
    me.setTarget(_(GameState.players).reject(player => player.hp.atMin()).sample());
  }

  if(!me.target) return false; // they can wait, you may come back

  return true; // successful retarget
};

/* always seeks a target */
class BloodthirstyBehavior extends Behavior {
  constructor() { super(Priority.TARGET); }
  act(me) {
    if(!targetNewPlayer(me)) return;
    me.stepTowards(me.target);
    return false;
  }
}
export const Bloodthirsty = () => new BloodthirstyBehavior();

/* seeks a target if they're within vision range */
class SeeksTargetInSightBehavior extends Behavior {
  constructor() { super(Priority.MOVE); }
  act(me) {
    const possibleTargets = [];

    GameState.world.fov[me.z].compute(
      me.x, me.y, me.getSight(),
      (x, y) => {
        const entity = GameState.world.getEntity(x, y, me.z);
        if(!entity || !me.canAttack(entity) || !me.canSee(entity)) return;
        possibleTargets.push(entity);
      }
    );

    if(me.target && _.contains(possibleTargets, me.target)) {
      me.stepTowards(me.target);

    } else if(possibleTargets.length > 0) {
      me.setTarget(_.sample(possibleTargets));
      me.stepTowards(me.target);

    } else {
      me.stepRandomly();
    }

    return false;
  }
}
export const SeeksTargetInSight = () => new SeeksTargetInSightBehavior();

class SeeksTargetViaHearingBehavior extends Behavior {
  constructor(range = 50) {
    super(Priority.MOVE);
    this.range = range;
  }
  act(me) {
    if(!me.target || isTargetBad(me)) return true;
    me.stepTowards(me.target);
    return false;
  }
  hear(me, potentialTarget) {
    const distBetweenTarget = me.distBetween(potentialTarget);
    if(distBetweenTarget > this.range) return;
    if(!me.target) {
      me.setTarget(potentialTarget);
    } else if(distBetweenTarget < me.distBetween(me.target)) {
      me.setTarget(potentialTarget);
    }
  }
}
export const SeeksTargetViaHearing = (range) => new SeeksTargetViaHearingBehavior(range);

/* wanders around aimlessly */
class WandersBehavior extends Behavior {
  constructor() { super(Priority.MOVE); }
  act(me) {
    me.stepRandomly();
    return false;
  }
}
export const Wanders = () => new WandersBehavior();

/* has very loud footsteps. pretty much, only players have or need this */
class AlertsOnStepBehavior extends Behavior {
  constructor() { super(Priority.ALWAYS); }
  step(me) {
    me.alertAllInRange();
  }
}

export const AlertsOnStep = () => new AlertsOnStepBehavior();