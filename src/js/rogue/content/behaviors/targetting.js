
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

class ExploresDungeonBehavior extends Behavior {
  constructor() {
    super(Priority.MOVE);
    this.targets = [];
  }

  getCentralCoords(room) {
    return {
      x: room._x1 + ~~((room._x2 - room._x1)/2),
      y: room._y1 + ~~((room._y2 - room._y1)/2)
    };
  }

  checkForRoomActivity(me, ignoreCurrent = true) {
    // mark the current room, if any, as explored
    const currentRoom = _.find(GameState.world.tiles[me.z].rooms, room => {
      return room._x1 < me.x && room._x2 > me.x &&
        room._y1 < me.y && room._y2 > me.y;
    });

    if(!currentRoom || (ignoreCurrent && _.isEqual(this.target, this.getCentralCoords(currentRoom)))) return;
    currentRoom.isExplored = true;
  }

  rebuildPathToTarget(me) {
    this.pathToTarget = me.simplePathingMap(this.target.x, this.target.y);
  }

  buildListOfTargets(me) {
    this.targets = _.map(GameState.world.tiles[me.z].rooms, room => {
      const { x, y } = this.getCentralCoords(room);
      room.x = x;
      room.y = y;
      room.isRoom = true;
      return room;
    });
  }

  findMatchingTarget() {
    return _.findWhere(this.targets, this.target);
  }

  addTarget(targets) {
    this.targets.unshift(...targets);
    this.targets = _.uniq(this.targets);
  }

  removeTarget(target) {
    this.targets = _.without(this.targets, target);
  }

  act(me) {

    if(!me._path) return;

    if(!this.targets.length) {
      this.buildListOfTargets(me);
    }

    // take a random step if you've explored everything
    if(_.all(this.targets, room => room.isExplored)) {
      me.stepRandomly();
      return;
    }

    const meSight = me.getSight();

    // check for stairs down but only if you're not on the last floor (because those stairs down don't do anything if they're there)
    this.stairsInRange = GameState.world.getValidTilesInRange(me.x, me.y, me.z, meSight, tile => tile.constructor.name === 'StairsDown')[0];
    if(this.stairsInRange && GameState.currentFloor !== GameState.world.depth-1) this.addTarget([this.stairsInRange]);

    const tilesWithItems = GameState.world.getValidTilesInRange(me.x, me.y, me.z, meSight, tile => {
      const items = GameState.world.getItemsAt(tile.x, tile.y, me.z);
      return items && items.length > 0;
    });

    this.addTarget(tilesWithItems);

    const nextTarget = _.find(this.targets, t => !t.isExplored);
    this.target = { x: nextTarget.x, y: nextTarget.y };

    if(!this.lastTarget || this.lastTarget && !_.isEqual(this.target, this.lastTarget)) {
      this.rebuildPathToTarget(me);
    }

    this.lastTarget = this.target;

    // no valid path to target.. try wandering around?
    if(!me.stepTowards(this.target, this.pathToTarget)) {
      me.stepRandomly();
    }

    // if we hit the spot we're supposed to hit, clear some stuff up.
    if(this.target.x === me.x && this.target.y === me.y) {
      this.checkForRoomActivity(me);
      const targetItem = this.findMatchingTarget();
      if(!targetItem.isRoom) this.removeTarget(targetItem);
    }
  }

  step(me) {
    this.checkForRoomActivity(me, false);
  }

  descend(me) {
    this.buildListOfTargets(me);
  }
}
export const ExploresDungeon = () => new ExploresDungeonBehavior();

/* has very loud footsteps. pretty much, only players have or need this */
class AlertsOnStepBehavior extends Behavior {
  constructor() { super(Priority.ALWAYS); }
  step(me) {
    me.alertAllInRange();
  }
}

export const AlertsOnStep = () => new AlertsOnStepBehavior();