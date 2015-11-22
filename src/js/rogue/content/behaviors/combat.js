
import _ from 'lodash';
import ROT from 'rot-js';
import Behavior, { Priority } from '../../definitions/behavior';
import GameState from '../../init/gamestate';
import MessageQueue, { MessageTypes } from '../../display/message-handler';
import MonsterSpawner from '../../worldgen/monster-spawner';
import { Stunned } from './conditions';
import Roll from '../../lib/dice-roller';

/* monsters can attack with this */
class AttacksBehavior extends Behavior {
  constructor() { super(Priority.DEFENSE); }
  act(me) {
    return !me.tryAttack();
  }
}

export const Attacks = () => new AttacksBehavior();

class TeleportsWhenHitBehavior extends Behavior {
  constructor(percent = 100) {
    super(Priority.DEFER);
    this.percent = percent;
  }
  takeDamage(me) {
    if(ROT.RNG.getPercentage() > this.percent) return;
    GameState.world.placeEntityAtRandomLocation(me);
  }
}

export const TeleportsWhenHit = (percent) => new TeleportsWhenHitBehavior(percent);

/* hitting in melee range will stun you */
class ParalyzesWhenHitBehavior extends Behavior {
  constructor(percent = 100, range = 2) {
    super(Priority.DEFER);
    this.percent = percent;
    this.range = range;
  }
  takeDamage(me, attacker) {
    if(ROT.RNG.getPercentage() > this.percent || me.distBetween(attacker) > this.range) return;
    const turns = Roll('1d50 + 50');
    attacker.addUniqueBehavior(Stunned(turns));
  }
}

export const ParalyzesWhenHit = (percent, range) => new ParalyzesWhenHitBehavior(percent, range);

class StealsBehavior extends Behavior {
  constructor(percent = 100) {
    super(Priority.ALWAYS);
    this.percent = percent;
  }
  act(me) {
    if(ROT.RNG.getPercentage() > this.percent) return;
    let didSteal = false;
    let item = null;
    const entities = GameState.world.getValidEntitiesInRange(me.x, me.y, me.z, 1, ent => me.canAttack(ent));
    _.each(entities, ent => {
      item = _.sample(ent.inventory);
      if(!item) return;
      didSteal = ent;
      return false;
    });

    if(didSteal) {
      MessageQueue.add({ message: `${me.name} stole ${item.name} from ${didSteal.name}!`, type: MessageTypes.COMBAT });
      didSteal.removeFromInventory(item);
      me.addToInventory(item);
    }
  }
}

export const Steals = () => new StealsBehavior();

class SplitsWhenHitBehavior extends Behavior {
  constructor(percent = 100) {
    super(Priority.ALWAYS);
    this.percent = percent;
  }
  takeDamage(me) {
    if(ROT.RNG.getPercentage() > this.percent || me.hp.atMin()) return;
    const validTiles = GameState.world.getValidTilesInRange(me.x, me.y, me.z, 1, (tile) => GameState.world.isTileEmpty(tile.x, tile.y, tile.z));
    const chosenTile = _.sample(validTiles);

    if(!chosenTile) return;

    const newSpawn = MonsterSpawner.spawnSingle(me._name, chosenTile);
    if(!newSpawn) return;
    const newHp = Math.floor(me.hp.cur / 2);
    me.hp._set(newHp);
    newSpawn.hp._set(newHp);
  }
}

export const SplitsWhenHit = (percent) => new SplitsWhenHitBehavior(percent);