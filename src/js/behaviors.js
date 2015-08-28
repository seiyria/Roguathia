
import GameState from './gamestate';
import MessageQueue from './message-handler';
import { Gold, Corpse } from './items/special';
// behaviors are functionality that cascade, ie, a monster could have 10 behaviors that override die()

// priorities determine the ordering of behavior execution
const PRIORITIES = {
  STUN: 0,
  HEAL: 1,
  DEFENSE: 2,
  INTERACT: 3,
  MOVE: 5,
  DEFER: 10
};

// retarget and find a new player to attack
let targetNewPlayer = (me) => {
  if(!me.target || (me.target && me.target.hp.atMin())) {
    me.target = _(GameState.players).reject(player => player.hp.atMin()).sample();
  }

  if(!me.target || me.target.z !== me.z) return false; // they can wait, you may come back

  return true; // successful retarget
};

class Behavior {
  constructor(priority) {
    this.priority = priority;
  }
}

class HealsBelowPercentBehavior extends Behavior {
  constructor(percent = 50) {
    super(PRIORITIES.HEAL);
    this.healPercent = percent;
  }
  act(me) {
    if(me.hp.gtPercent(this.healPercent)) return true;
    let healItems = _.filter(me.inventory, (item) => item.healRoll &&  item.canUse(me));
    if(healItems.length === 0) return true;
    let healItem = _.sample(healItems);
    healItem.use(me);
    return false;
  }
}

export var HealsBelowPercent = (percent) => new HealsBelowPercentBehavior(percent);

/* being stunned sucks */
class StunnedBehavior extends Behavior {
  constructor(numTurns = 1) {
    super(PRIORITIES.STUN);
    this.stunTurns = numTurns;
  }
  act(me) {
    if(this.stunTurns <= 0) {
      me.removeBehavior(this);
      MessageQueue.add({ message: `${me.name} is no longer stunned.` });
      return true;
    }
    
    MessageQueue.add({ message: `${me.name} is stunned!` });
    this.stunTurns--;
    return false;
  }
}

export var Stunned = (numTurns) => new StunnedBehavior(numTurns);

/* retrieve items from the ground */
// TODO whitelist/blacklist
class PickUpItemsBehavior extends Behavior {
  constructor() { super(PRIORITIES.INTERACT); }
  act(me) {
    let items = GameState.world.getItemsAt(me.x, me.y, me.z);
    _.each(items, (item) => {
      GameState.world.removeItem(item);
      me.addToInventory(item);
      MessageQueue.add({ message: `${me.name} picked up ${item.name}.` });
    });
  }
}

export var PickUpItems = () => new PickUpItemsBehavior();

class DropsItemsBehavior extends Behavior {
  constructor() { super(PRIORITIES.DEFER); }
  die(me) {
    let items = me.inventory.concat(_(me.equipment).values().flatten().value());
    _.each(items, (item) => {
      me.dropItem(item);
    });
  }
}

export var DropsItems = () => new DropsItemsBehavior();

/* monsters can attack with this */
class AttacksBehavior extends Behavior {
  constructor() { super(PRIORITIES.DEFENSE); }
  act(me) {
    return !me.tryAttack();
  }
}

export var Attacks = () => new AttacksBehavior();

/* monsters leave a corpse */
class LeavesCorpseBehavior extends Behavior {
  constructor(dropPercent = 100) { 
    super(PRIORITIES.DEFER);
    this.dropPercent = dropPercent;
  }
  die(me) {
    if(ROT.RNG.getPercentage() > this.dropPercent) return;
    let corpse = new Corpse({ monsterName: me.name });
    GameState.world.moveItem(corpse, me.x, me.y, me.z);
  }
}

export var LeavesCorpse = (percent) => new LeavesCorpseBehavior(percent);

/* some things drop gold */
class DropsGoldBehavior extends Behavior {
  constructor(gold) {
    super(PRIORITIES.DEFER);
    this.goldDrop = gold;
  }
  die(me) {
    let droppedGold = +dice.roll(this.goldDrop);
    let goldItem = new Gold(droppedGold);
    GameState.world.moveItem(goldItem, me.x, me.y, me.z);
  }
}

export var DropsGold = (gold) => new DropsGoldBehavior(gold);

/* explodes upon death. can be pretty dangerous */
class ExplodesBehavior extends Behavior {
  constructor(roll = '1d4', percent = 100) {
    super(PRIORITIES.DEFER);
    this.roll = roll;
    this.percent = percent;
  }
  
  die(me) {
    if(ROT.RNG.getPercentage() > this.percent) {
      MessageQueue.add({ message: `${me.name} explodes a little bit.` });
      return;
    }
    MessageQueue.add({ message: `${me.name} violently explodes!` });
    _.each(GameState.world.getValidEntitiesInRange(me.x, me.y, me.z, 1), (entity) => {
      if(me === entity || entity.hp.atMin()) return; // infinite loop prevention
      entity.takeDamage(+dice.roll(this.roll), me);
    });
  }
}

export var Explodes = (roll, percent) => new ExplodesBehavior(roll, percent);

/* always seeks a target */
class BloodthirstyBehavior extends Behavior {
  constructor() { super(PRIORITIES.MOVE); }
  act(me) {
    if(!targetNewPlayer(me)) return;
    me.stepTowards(me.target);
    return false;
  }
}
export var Bloodthirsty = () => new BloodthirstyBehavior();

/* seeks a target if they're within vision range */
class SeeksTargetInSightBehavior extends Behavior {
  constructor() { super(PRIORITIES.MOVE); }
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
  constructor() { super(PRIORITIES.MOVE); }
  act(me) {
    me.stepRandomly();
    
    return false;
  }
}
export var Wanders = () => new WandersBehavior();

/* interacts with everything */
class InteractsBehavior extends Behavior {
  constructor() { super(PRIORITIES.INTERACT); }
  act(me) {
    var tiles = GameState.world.getAllTilesInRange(me.x, me.y, me.z, 1);
    
    for(let i = 0; i < tiles.length; i++) {
      let tile = tiles[i];
      
      if(tile.canInteract && tile.interact && tile.canInteract(me)) {
        let msg = tile.interact(me);
        MessageQueue.add({ message: msg });
        return false;
      }
    }
    
    return true;
  }
}
export var Interacts = () => new InteractsBehavior();

/* breaks down doors that it finds */
class BreaksDoorsBehavior extends Behavior {
  constructor() { super(PRIORITIES.INTERACT); }
  act() {
    return false;
  }
}
export var BreaksDoors = () => new BreaksDoorsBehavior();

/* opens doors that it finds */
class OpensDoorsBehavior extends Behavior {
  constructor() { super(PRIORITIES.INTERACT); }
  act(me) {
    let doors = GameState.world.getValidTilesInRange(me.x, me.y, me.z, 1, (tile) => tile.constructor.name === 'Door' && tile.density);
    if(doors.length > 0) {
      let door = doors[0];
      door.interact(me);
      return false;
    }
    
    return true;
  }
}
export var OpensDoors = () => new OpensDoorsBehavior();