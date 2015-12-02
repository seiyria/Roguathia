
import _ from 'lodash';
import Roll from '../lib/dice-roller';
import Monsters from '../content/monsters/_all';
import Monster from '../definitions/monster';
import GameState from '../init/gamestate';
import Log from '../lib/logger';
import { WeightedExtension } from '../lib/rot-extensions';

export default class MonsterSpawner {
  static spawn(basedOn) {
    const dungeonLevel = basedOn.z + 1;
    const targetLevel = basedOn.level;

    const highestDifficulty = Math.min(GameState.upgrades.maxDifficulty, 5 * dungeonLevel);
    const lowestDifficulty = Math.min(highestDifficulty, Math.floor((dungeonLevel+targetLevel)/2));

    let chosenName = WeightedExtension(Monsters, 'frequency', monsterName => Monsters[monsterName].difficulty >= lowestDifficulty && Monsters[monsterName].difficulty < highestDifficulty).key;

    if(!chosenName || !Monsters[chosenName]) {
      Log('MonsterSpawner', `Monster (${chosenName}) could not be spawned: DLvl ${dungeonLevel} TargetLevel ${targetLevel} | difficulty range ${lowestDifficulty}-${highestDifficulty} -- picking random monster to spawn...`, false);
      chosenName = WeightedExtension(Monsters, 'frequency', monsterName => Monsters[monsterName].difficulty > 0 && Monsters[monsterName].difficulty < highestDifficulty).key;
    }

    const numMonsters = Roll(Monsters[chosenName].spawnPattern);
    
    for(let i = 0; i < numMonsters; i++) {
      const tile = _.sample(GameState.world.getValidTilesInRange(basedOn.x, basedOn.y, basedOn.z, 50, (tile) => basedOn.distBetween(tile) > basedOn.getSight()));
      this.spawnSingle(chosenName, tile);
    }
  }

  static spawnSingle(monsterName, tile) {

    while(GameState.monsters.length >= GameState.upgrades.monsterLimit) {

      // some monsters can be marked important, like Selyk, so they will always spawn and never despawn
      const firstBadMonster = _.find(GameState.monsters, mon => !mon.important);

      // clean up old monsters
      firstBadMonster.die({ name: `Selyk's Divine Hand` });
    }

    const monster = Monsters[monsterName];

    if(!monster) {
      Log('MonsterSpawner', `Bad monster ${monsterName}: ${new Error().stack}`);
    }

    try {
      const monsterOpts = monster.init();
      monsterOpts.difficulty = monster.difficulty;
      const monsterInstance = new Monster(tile.x, tile.y, tile.z, monsterOpts);
      monsterInstance._name = monsterName;

      return monsterInstance;
    } catch (e) {
      Log('MonsterSpawner', `Could not spawn monster ${monsterName}: ${e.stack}`);
    }
  }
}