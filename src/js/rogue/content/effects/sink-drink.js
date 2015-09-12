
import _ from 'lodash';
import Roll from '../../lib/dice-roller';
import Effect from '../../definitions/effect';
import GameState from '../../init/gamestate';
import MonsterSpawner from '../../worldgen/monster-spawner';
import { Ring as RandomRing, Potion as RandomPotion } from '../../constants/random';

class SinkDrinkEffect extends Effect {}

export class NoEffect extends SinkDrinkEffect {
  static get probability() { return 25; }
  static use(entity) {
    this.msg(entity, `${entity.name} takes a sip of water from the sink.`);
  }
}

export class HardWater extends SinkDrinkEffect {
  static get probability() { return 20; }
  static use(entity) {
    this.msg(entity, `${entity.name} tastes hard, awful water.`);
    entity.gainXp(1);
  }
}

export class HotWater extends SinkDrinkEffect {
  static get probability() { return 5; }
  static use(entity) {
    const hasFireRst = entity.hasTrait('FireResistance');
    let msg = `${entity.name} took a sip of scalding hot water.`;
    if(hasFireRst) {
      msg += ' It was quite tasty.';
    } else {
      const damage = Roll('1d6');
      entity.takeDamage(damage);
    }

    this.msg(entity, msg);
  }
}

export class SpawnRat extends SinkDrinkEffect {
  static get probability() { return 1; }
  static use(entity, sink) {

    const validTile = _.sample(this.getEmptyTilesInRange(sink));

    if(!validTile) return;
    this.msg(entity, `${entity.name} found a rat in the sink. Ewww!`);
    MonsterSpawner.spawnSingle('sewerRat', validTile);
  }
}

export class SpawnElemental extends SinkDrinkEffect {
  static get probability() { return 1; }
  static use(entity, sink) {

    const validTile = _.sample(this.getEmptyTilesInRange(sink));

    if(!validTile) return;
    this.msg(entity, `${entity.name} caused the water to think for itself!`);
    MonsterSpawner.spawnSingle('waterElemental', validTile);
  }
}

export class RingGen extends SinkDrinkEffect {
  static get probability() { return 1; }
  static use(entity, sink) {
    if(sink._gotRing) {
      this.msg(entity, `${entity.name} sees murky water in the sink.`);
      return;
    }
    sink._gotRing = true;
    entity.exercise('wis');
    const ring = RandomRing({ bucName: 'uncursed' });
    GameState.world.moveItem(ring, entity.x, entity.y, entity.z);
    this.msg(entity, `${entity.name} found a ring in the sink!`);
  }
}

export class PotionDrink extends SinkDrinkEffect {
  static get probability() { return 1; }
  static use(entity) {
    const potion = RandomPotion({ bucName: 'uncursed' });
    this.msg(entity, `${entity.name} sees ${potion.color} water flowing in the sink!`);
    potion.use(entity);
  }
}
