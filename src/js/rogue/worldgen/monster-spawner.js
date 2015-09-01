
import * as Monsters from '../content/monsters/_all';
import Monster from '../definitions/monster';
import GameState from '../init/gamestate';
import Log from '../lib/logger';

export default class MonsterSpawner {
  static spawn(basedOn) {
    let dungeonLevel = basedOn.z + 1;
    let targetLevel = basedOn.level;
    
    let lowestDifficulty = Math.floor((dungeonLevel+targetLevel)/2);
    let highestDifficulty = 5 * dungeonLevel;
    
    let validMonsters = _(Monsters).values().filter(monster => monster.difficulty >= lowestDifficulty && monster.difficulty < highestDifficulty).value();
    let monsterHash = _.reduce(validMonsters, ((prev, cur) => {
      prev[cur.stats.name] = cur.frequency;
      return prev;
    }), {});
    let chosenName = ROT.RNG.getWeightedValue(monsterHash);
    let chosenMonster = _.findWhere(validMonsters, { stats: { name: chosenName } });
    if(!chosenMonster) {
      Log('MonsterSpawner', `Monster could not be spawned: DLvl ${dungeonLevel} TargetLevel ${targetLevel} | difficulty range ${lowestDifficulty}-${highestDifficulty}`);
      return;
    }
    let numMonsters = +dice.roll(chosenMonster.spawnPattern);
    
    for(let i = 0; i < numMonsters; i++) {
      let tile = _.sample(GameState.world.getValidTilesInRange(basedOn.x, basedOn.y, basedOn.z, 50, (tile) => basedOn.distBetween(tile) > basedOn.getSight()));
      let monster = new Monster(tile.x, tile.y, tile.z, chosenMonster);
      monster.target = basedOn;
    }
  }
}