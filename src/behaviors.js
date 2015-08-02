
import GameState from "./gamestate";
import MessageQueue from "./message-handler";

const PRIORITIES = {
  STUN: 0,
  DEFENSE: 1,
  INTERACT: 3,
  MOVE: 5
};

let retarget = (me) => {
    if(!me.target || (me.target && me.target.hp.atMin())) {
      me.target = _(GameState.players).reject(player => player.hp.atMin()).sample();
    }
    
    if(!me.target || me.target.z !== me.z) return false; //they can wait, you may come back
    
    return true; // successful retarget
};

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

export var Attacks = () => ({
  priority: PRIORITIES.DEFENSE,
  act: (me) => {
    return !me.tryAttack(); //successful attack cancels subsequent action
  }
});

/* behaviors are functionality that cascade, ie, a monster could have 10 behaviors that override die() */
export var LeavesCorpse = (percent = 100) => ({ die: (me) => console.log('drop corpse here now plz') });
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

export var SeeksPlayer = () => ({
  priority: PRIORITIES.MOVE,
  act: (me) => {
    
    if(!retarget(me)) return;
    
    me.stepTowards(me.target);
    
    return false;
  }
});

export var SeeksPlayerInSight = () => ({
  priority: PRIORITIES.MOVE,
  act: (me) => {
    
    return false;
  }
});

export var Wanders = () => ({
  priority: PRIORITIES.MOVE,
  act: (me) => {
    
    return false;
  }
});

export var BreaksDoors = () => ({
  priority: PRIORITIES.INTERACT,
  act: (me) => {
    
    return false;
  }
});

export var OpensDoors = () => ({
  priority: PRIORITIES.INTERACT,
  act: (me) => {
    
    return false;
  }
});