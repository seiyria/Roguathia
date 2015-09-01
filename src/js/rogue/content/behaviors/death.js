
import Behavior, { Priority } from '../../definitions/behavior';
import GameState from '../../init/gamestate';
import MessageQueue from '../../display/message-handler';
import { Gold, Corpse } from '../items/_special';

/* drop contents on death */
class DropsItemsBehavior extends Behavior {
  constructor() { super(Priority.DEFER); }
  die(me) {
    let items = me.inventory.concat(_(me.equipment).values().flatten().value());
    _.each(items, (item) => {
      me.dropItem(item);
    });
  }
}

export var DropsItems = () => new DropsItemsBehavior();

/* monsters leave a corpse */
class LeavesCorpseBehavior extends Behavior {
  constructor(dropPercent = 100) {
    super(Priority.DEFER);
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
    super(Priority.DEFER);
    this.goldDrop = gold;
  }
  die(me) {
    let droppedGold = +dice.roll(this.goldDrop);
    let goldItem = new Gold(droppedGold + me.gold);
    GameState.world.moveItem(goldItem, me.x, me.y, me.z);
  }
}

export var DropsGold = (gold) => new DropsGoldBehavior(gold);

/* explodes upon death. can be pretty dangerous */
class ExplodesBehavior extends Behavior {
  constructor(roll = '1d4', percent = 100) {
    super(Priority.DEFER);
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