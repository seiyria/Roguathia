
import _ from 'lodash';
import ROT from 'rot-js';
import dice from 'dice.js';
import { Gold } from '../items/_special';
import * as Traits from '../traits/_all';
import GameState from '../../init/gamestate';
import Effect from '../../definitions/effect';
import MonsterSpawner from '../../worldgen/monster-spawner';
import { waterMoccasin, waterDemon } from '../monsters/_summoned';
import { waterNymph } from '../monsters/nymphs';

class FountainEffect extends Effect {}

export class NoEffect extends FountainEffect {
  static get probability() { return 45; }
  static use(entity) {
    this.msg(`${entity.name} drinks from the fountain, but the tepid water is tasteless.`);
  }
}

export class DropGold extends FountainEffect {
  static get probability() { return 20; }
  static use(entity) {
    const gold = new Gold(+dice.roll('1d1000'));
    GameState.world.moveItem(gold, entity.x, entity.y, entity.z);
    this.msg(`${entity.name} hears the sound of gold dropping to the ground.`);
  }
}

export class Contaminated extends FountainEffect {
  static get probability() { return 1; }
  static use(entity) {
    const hasPsnRst = entity.hasTrait('PoisonResistance');
    const damageRoll = hasPsnRst ? '1d4' : '1d10';
    const abusesStats = !hasPsnRst;
    const msg = hasPsnRst ? `${entity.name} drank water from a nearby apple farm runoff stream.` : `Yuck! ${entity.name} drank contaminated water.`;
    if(abusesStats) {
      entity.abuse('str', '1d2+1');
      entity.abuse('con', '1d2');
    }

    entity.takeDamage(+dice.roll(damageRoll));
    this.msg(entity, msg);
  }
}

export class BlurredVision extends FountainEffect {
  static get probability() { return 2; }
  static use(entity) {
    entity.addTrait(Traits.SeeInvisible({ level: 5 }));
    entity.exercise('wis');
    this.msg(entity, `${entity.name} vision blurs, then returns sharper than before.`);
  }
}

export class SpawnSnakes extends FountainEffect {
  static get probability() { return 1; }
  static use(entity) {
    this.msg(entity, `${entity.name} drinks from the fountain.`);
    this.msg(entity, `An endless stream of snakes pours out!`);
    const spawned = +dice.roll('1d5 + 1');

    const validTiles = _.sample(this.getEmptyTilesInRange(entity), spawned);

    for(let i = 0; i < spawned; i++) {
      if(!validTiles[i]) continue;
      MonsterSpawner.spawnSingle(waterMoccasin, validTiles[i]);
    }
  }
}

export class StrangeFeeling extends FountainEffect {
  static get probability() { return 3; }
  static use(entity) {
    this.msg(entity, `${entity.name} momentarily feels strange, then it passes.`);
    entity.exercise('wis');
  }
}

export class CurseItems extends FountainEffect {
  static get probability() { return 2; }
  static use(entity) {
    this.msg(entity, `${entity.name} drank some bad water!`);
    _.each(entity.inventory, item => {
      if(ROT.RNG.getPercentage() > 20) return;
      item.curse();
    });
  }
}

export class SpawnDemon extends FountainEffect {
  static get probability() { return 1; }
  static use(entity) {

    const validTile = _.sample(this.getEmptyTilesInRange(entity));

    if(!validTile) return;
    this.msg(entity, `${entity.name} summons a demon from the water plane!`);
    MonsterSpawner.spawnSingle(waterDemon, validTile);
  }
}

export class SpawnNymph extends FountainEffect {
  static get probability() { return 1; }
  static use(entity) {

    const validTile = _.sample(this.getEmptyTilesInRange(entity));
    if(!validTile) return;

    this.msg(entity, `${entity.name} attracts a water nymph!`);
    MonsterSpawner.spawnSingle(waterNymph, validTile);
  }
}