
import _ from 'lodash';
import dice from 'dice.js';
import Behavior, { Priority } from '../../definitions/behavior';
import MessageQueue from '../../display/message-handler';

/* being stunned sucks */
class StunnedBehavior extends Behavior {
  constructor(numTurns = 1) {
    super(Priority.STUN);
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

export const Stunned = (numTurns) => new StunnedBehavior(numTurns);

/* being poisoned also sucks */
class PoisonedBehavior extends Behavior {
  constructor(numTurns = 3) {
    super(Priority.ALWAYS);
    this.poisonTurns = numTurns;
  }
  act(me) {
    if(this.poisonTurns <= 0) {
      me.removeBehavior(this);
      MessageQueue.add({ message: `${me.name} is no longer poisoned.` });
      return;
    }

    const damage = +dice.roll('1d4');
    MessageQueue.add({ message: `${me.name} takes ${damage} poison damage!` });
    this.poisonTurns--;
  }
}

export const Poisoned = (numTurns) => new PoisonedBehavior(numTurns);

/* being seduced really sucks */
class SeducedBehavior extends Behavior {
  constructor(numTurns = 2) {
    super(Priority.STUN);
    this.stunTurns = numTurns;
  }
  act(me) {
    me.breakConduct('celibate');
    if(this.stunTurns <= 0) {
      me.removeBehavior(this);
      MessageQueue.add({ message: `${me.name} is no longer seduced.` });
      return true;
    }

    this.stunTurns--;
    MessageQueue.add({ message: `${me.name} is seduced!` });

    const item = _(me.equipment).values().flatten().sample();
    if(!item) return false;

    me.unequip(item);
    me.dropItem(item);

    MessageQueue.add({ message: `${me.name} dropped ${item.name}!` });
    return false;
  }
}

export const Seduced = (numTurns) => new SeducedBehavior(numTurns);