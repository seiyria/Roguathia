
import _ from 'lodash';
import ROT from 'rot-js';
import Roll from '../../lib/dice-roller';
import * as Traits from '../traits/_all';
import GameState from '../../init/gamestate';
import Effect from '../../definitions/effect';
import MonsterSpawner from '../../worldgen/monster-spawner';

class ThroneEffect extends Effect {}

export class Identify extends ThroneEffect {
  static get probability() { return 1; }
  static use(entity) {
    this.msg(entity, `${entity.name} was granted insight!`);
    _.each(entity.inventory, item => {
      if(ROT.RNG.getPercentage() <= 20) return;
      item.identify();
    });
  }
}

export class HealthGainBonus extends ThroneEffect {
  static get probability() { return 1; }
  static use(entity) {
    const hpGained = Roll('1d10');
    this.msg(entity, `${entity.name} feels much, much better!`);
    entity.hp.max += hpGained;
    entity.hp.toMax();
  }
}

export class Ouch extends ThroneEffect {
  static get probability() { return 1; }
  static use(entity) {
    const hpLost = Roll('1d10');
    const statLost = Roll('1d4 + 2');
    const stat = _.sample(['con', 'dex', 'int', 'wis', 'str', 'cha', 'luk']);
    this.msg(entity, `${entity.name} feels a painful surge!`);
    entity.hp.sub(hpLost);
    entity[stat] -= statLost;
  }
}

export class Shocking extends ThroneEffect {
  static get probability() { return 1; }
  static use(entity) {
    const hasShkRst = entity.hasTrait('ShockResistance');
    const damageRoll = hasShkRst ? '1d6' : '1d30';

    entity.abuse('con', '1d1');
    entity.takeDamage(Roll(damageRoll), { name: 'throne' });
    this.msg(entity, `${entity.name} was viciously shocked!`);
  }
}

export class Clarity extends ThroneEffect {
  static get probability() { return 1; }
  static use(entity) {
    if(entity.hasTrait('SeeInvisible')) {
      this.msg(entity, `${entity.name} has a strange sensation, then it passes.`);
      return;
    }
    entity.addTrait(Traits.SeeInvisible({ level: 5 }));
    this.msg(entity, `${entity.name} has a moment of clarity.`);
  }
}

export class LoseThatGold extends ThroneEffect {
  static get probability() { return 1; }
  static use(entity) {
    if(entity.gold === 0) {
      this.msg(entity, `${entity.name} has a strange sensation, then it passes.`);
      return;
    }

    entity.gold = 0;
    this.msg(entity, `${entity.name} lost a lotta gold!`);
  }
}

export class RandomTeleport extends ThroneEffect {
  static get probability() { return 1; }
  static use(entity) {
    this.msg(entity, `${entity.name} feels a wrenching sensation!`);
    GameState.world.placeEntityAtRandomLocation(entity);
  }
}

export class SpawnCreatures extends ThroneEffect {
  static get probability() { return 1; }
  static use(entity) {

    const monsters = ['kobold', 'gnome', 'goblin', 'hobgoblin', 'orc'];

    this.msg(entity, `${entity.name} summoned a throne room audience!`);
    const spawned = Roll('1d10');

    const validTiles = _.sample(this.getEmptyTilesInRange(entity, 5), spawned);

    for(let i = 0; i < spawned; i++) {
      if(!validTiles[i]) continue;
      MonsterSpawner.spawnSingle(_.sample(monsters), validTiles[i]);
    }
  }
}