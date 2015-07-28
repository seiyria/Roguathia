
import GameState from "./gamestate";

const PRIORITIES = {
  DEFENSE: 1,
  INTERACT: 3,
  MOVE: 5
};

export var Attacks = () => ({
  priority: PRIORITIES.DEFENSE,
  act: (me) => {
    
  }
});

/* behaviors are functionality that cascade, ie, a monster could have 10 behaviors that override die() */
export var LeavesCorpse = (percent = 100) => ({ die: (me) => console.log('drop corpse here now plz') });
export var Explodes = (roll, percent = 100) => ({ die: (me) => console.log('explodan') });

let retarget = (me) => {
    if(!me.target || (me.target && me.target.hp.atMin())) {
      me.target = _(GameState.players).reject(player => player.hp.atMin()).sample();
    }
    
    if(!me.target || me.target.z !== me.z) return false; //they can wait, you may come back
    
    return true; // successful retarget
};

export var SeeksPlayer = () => ({
  priority: PRIORITIES.MOVE,
  act: (me) => {
    
    if(!retarget(me)) return;
    
    let path = [];
    let canPass = (x, y) => {
      let isMe = me.x === x && me.y === y;
      let isTarget = me.target.x === x && me.y === me.target.y;
      return GameState.world.isTilePassable(x, y, me.z) || isMe || isTarget;
    };
    let astar = new ROT.Path.AStar(me.target.x, me.target.y, canPass, {topology: 8});
    let addPath = (x, y) => path.push({x, y});
    astar.compute(me.x, me.y, addPath);
    
    path.shift();
    let step = path.shift();
    if(!step) return;
    
    me.moveTo(step.x, step.y);
    
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