
import GameState from "./gamestate";
import MessageQueue from "./message-handler";

import calc from "./lib/directional-probability";

// behaviors are functionality that cascade, ie, a monster could have 10 behaviors that override die()

// priorities determine the ordering of behavior execution
const PRIORITIES = {
  STUN: 0,
  DEFENSE: 1,
  INTERACT: 3,
  MOVE: 5
};

// retarget and find a new player to attack
let targetNewPlayer = (me) => {
    if(!me.target || (me.target && me.target.hp.atMin())) {
      me.target = _(GameState.players).reject(player => player.hp.atMin()).sample();
    }
    
    if(!me.target || me.target.z !== me.z) return false; //they can wait, you may come back
    
    return true; // successful retarget
};

/* being stunned sucks */
export var Stunned = (numTurns = 1) => ({
  stunTurns: numTurns,
  priority: PRIORITIES.STUN,
  act: (me) => {
    if(this.stunTurns === 0) {
      me.removeBehavior(this);
      MessageQueue.add({message: `${me.name} is no longer stunned.`});
      return;
    }
    
    MessageQueue.add({message: `${me.name} is stunned!`});
    this.stunTurns--;
  }
});

/* monsters can attack with this */
export var Attacks = () => ({
  priority: PRIORITIES.DEFENSE,
  act: (me) => {
    return !me.tryAttack(); //successful attack cancels subsequent action
  }
});

/* monsters leave a corpse */
export var LeavesCorpse = (percent = 100) => ({ die: (me) => console.log('drop corpse here now plz') });

/* explodes upon death. can be pretty dangerous */
export var Explodes = (roll, percent = 100) => ({ 
  die: (me) => {
    if(ROT.RNG.getPercentage() > percent) {
      MessageQueue.add({message: `${me.name} explodes a little bit.`});
      return;
    }
    MessageQueue.add({message: `${me.name} violently explodes!`});
    _.each(GameState.world.getValidEntitiesInRange(me.x, me.y, me.z, 1), (entity) => {
      if(me === entity) return; //infinite loop prevention
      entity.takeDamage(+dice.roll(roll), me);
    });
  }
});

/* always seeks a target */
export var Bloodthirsty = () => ({
  priority: PRIORITIES.MOVE,
  act: (me) => {
    
    if(!targetNewPlayer(me)) return;
    
    me.stepTowards(me.target);
    
    return false;
  }
});

/* seeks a target if they're within vision range */
export var SeeksTargetInSight = () => ({
  priority: PRIORITIES.MOVE,
  act: (me) => {
    let possibleTargets = [];
    
    GameState.world.fov[me.z].compute(
      me.x, me.y, me.getSight(), 
      (x, y, radius, visibility) => {
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
});

/* wanders around aimlessly */
export var Wanders = () => ({
  priority: PRIORITIES.MOVE,
  act: (me) => {
    me.stepRandomly();
    
    return false;
  }
});

/* breaks down doors that it finds */
export var BreaksDoors = () => ({
  priority: PRIORITIES.INTERACT,
  act: (me) => {
    
    return false;
  }
});

/* opens doors that it finds */
export var OpensDoors = () => ({
  priority: PRIORITIES.INTERACT,
  act: (me) => {
    let doors = GameState.world.getValidTilesInRange(me.x, me.y, me.z, 1, (tile) => tile.constructor.name === 'Door' && tile.density);
    if(doors.length > 0) {
      let door = doors[0];
      door.interact(me);
      return false;
    }
    
    return true;
  }
});