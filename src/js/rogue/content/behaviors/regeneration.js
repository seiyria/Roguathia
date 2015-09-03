
import _ from 'lodash';
import Behavior, { Priority } from '../../definitions/behavior';

class RegeneratesHpBehavior extends Behavior {
  constructor(amount = 1) {
    super(Priority.ALWAYS);
    this.amount = amount;
  }

  act(me) {
    if(me.currentTurn % me.getRegenHp() === 0) me.hp.add(this.amount);
  }
}

export const RegeneratesHp = () => new RegeneratesHpBehavior();

class RegeneratesMpBehavior extends Behavior {
  constructor(amount = 1) {
    super(Priority.ALWAYS);
    this.amount = amount;
  }

  act(me) {
    if(me.currentTurn % me.getRegenMp() === 0) me.mp.add(this.amount);
  }
}

export const RegeneratesMp = () => new RegeneratesMpBehavior();

class HealsBelowPercentBehavior extends Behavior {
  constructor(percent = 50) {
    super(Priority.HEAL);
    this.healPercent = percent;
  }
  act(me) {
    if(me.hp.gtPercent(this.healPercent)) return true;
    const healItems = _.filter(me.inventory, (item) => item.healRoll &&  item.canUse(me));
    if(healItems.length === 0) return true;
    const healItem = _.sample(healItems);
    healItem.use(me);
    return false;
  }
}

export const HealsBelowPercent = (percent) => new HealsBelowPercentBehavior(percent);