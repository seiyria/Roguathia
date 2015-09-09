
import _ from 'lodash';
import dice from 'dice.js';
import Effect from '../../definitions/effect';
import { Ring as RandomRing } from '../../constants/random';
import GameState from '../../init/gamestate';
import MonsterSpawner from '../../worldgen/monster-spawner';

class SinkKickEffect extends Effect {}

export class BasicEffect extends SinkKickEffect {
  static get probability() { return 7; }
  static use(entity) {
    this.msg(entity, `${entity.name} kicks the sink and it vibrates nosily.`);
    entity.alertAllInRange(50);
  }
}

export class RingGen extends SinkKickEffect {
  static get probability() { return 3; }
  static use(entity, sink) {
    if(sink._gotRing) {
      this.msg(entity, `${entity.name} kicked murky water out of the sink.`);
      return;
    }
    sink._gotRing = true;
    entity.exercise('wis');
    entity.exercise('dex');
    const ring = RandomRing({ bucName: 'uncursed' });
    GameState.world.moveItem(ring, entity.x, entity.y, entity.z);
    this.msg(entity, `${entity.name} found a ring shining in the murky goop!`);
  }
}

export class BadKick extends SinkKickEffect {
  static get probability() { return 1; }
  static use(entity) {
    this.msg(entity, `${entity.name} fumbled while kicking the sink.`);
    entity.alertAllInRange(50);
    entity.abuse('dex');
    entity.abuse('wis');
    const damage = +dice.roll('1d5');
    entity.takeDamage(damage);
  }
}

export class SpawnsPudding extends SinkKickEffect {
  static get probability() { return 1; }
  static use(entity, sink) {
    const validTile = _.sample(this.getEmptyTilesInRange(sink));

    if(!validTile) return;
    this.msg(entity, `${entity.name} caused black ooze to rise out of the sink!`);
    MonsterSpawner.spawnSingle('blackPudding', validTile);
  }
}