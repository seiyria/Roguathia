
import _ from 'lodash';
import dice from 'dice.js';
import Monsters from '../content/monsters/_all';
import Monster from '../definitions/monster';
import GameState from '../init/gamestate';
import Log from '../lib/logger';
import { WeightedExtension } from '../lib/rot-extensions';

export default class MonsterSpawner {
  static spawn(basedOn) {
    const dungeonLevel = basedOn.z + 1;
    const targetLevel = basedOn.level;

    const lowestDifficulty = Math.floor((dungeonLevel+targetLevel)/2);
    const highestDifficulty = 5 * dungeonLevel;

    const chosenName = WeightedExtension(Monsters, 'frequency', monsterName => Monsters[monsterName].difficulty >= lowestDifficulty && Monsters[monsterName].difficulty < highestDifficulty).key;

    if(!chosenName || !Monsters[chosenName]) {
      Log('MonsterSpawner', `Monster (${chosenName}) could not be spawned: DLvl ${dungeonLevel} TargetLevel ${targetLevel} | difficulty range ${lowestDifficulty}-${highestDifficulty}`);
      return;
    }

    const numMonsters = +dice.roll(Monsters[chosenName].spawnPattern);
    
    for(let i = 0; i < numMonsters; i++) {
      const tile = _.sample(GameState.world.getValidTilesInRange(basedOn.x, basedOn.y, basedOn.z, 50, (tile) => basedOn.distBetween(tile) > basedOn.getSight()));
      this.spawnSingle(Monsters[chosenName], tile);
    }
  }

  static spawnSingle(monster, tile) {

    // allow for string loading of a monster
    if(_.isString(monster)) {
      monster = Monsters[monster];
    }

    if(!monster) {
      Log('MonsterSpawner', `Bad monster ${monster}: ${new Error().stack}`);
    }

    const monsterOpts = monster.init();
    monsterOpts.difficulty = monster.difficulty;
    new Monster(tile.x, tile.y, tile.z, monsterOpts);
  }
}