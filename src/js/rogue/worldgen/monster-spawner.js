
import * as Monsters from '../content/monsters/_all';
import Monster from '../definitions/monster';
import GameState from '../init/gamestate';
import Log from '../lib/logger';

export default class MonsterSpawner {
  static spawn(basedOn) {
    const dungeonLevel = basedOn.z + 1;
    const targetLevel = basedOn.level;

    const lowestDifficulty = Math.floor((dungeonLevel+targetLevel)/2);
    const highestDifficulty = 5 * dungeonLevel;

    const validMonsters = _(Monsters).values().filter(monster => monster.difficulty >= lowestDifficulty && monster.difficulty < highestDifficulty).value();
    const monsterHash = _.reduce(validMonsters, ((prev, cur) => {
      prev[cur.stats.name] = cur.frequency;
      return prev;
    }), {});
    const chosenName = ROT.RNG.getWeightedValue(monsterHash);
    const chosenMonster = _.findWhere(validMonsters, { stats: { name: chosenName } });
    if(!chosenMonster) {
      Log('MonsterSpawner', `Monster could not be spawned: DLvl ${dungeonLevel} TargetLevel ${targetLevel} | difficulty range ${lowestDifficulty}-${highestDifficulty}`);
      return;
    }
    const numMonsters = +dice.roll(chosenMonster.spawnPattern);
    
    for(let i = 0; i < numMonsters; i++) {
      const tile = _.sample(GameState.world.getValidTilesInRange(basedOn.x, basedOn.y, basedOn.z, 50, (tile) => basedOn.distBetween(tile) > basedOn.getSight()));
      new Monster(tile.x, tile.y, tile.z, chosenMonster);
    }
  }
}