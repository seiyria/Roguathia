
import * as Monsters from "./monsters";
import Monster from "./monster";
import GameState from "./gamestate";

export default class MonsterSpawner {
  static spawn(basedOn) {
    let dungeonLevel = basedOn.z + 1;
    let targetLevel = basedOn.level;
    
    let lowestDifficulty = Math.floor((dungeonLevel+targetLevel)/2);
    let highestDifficulty = 5 * dungeonLevel;
    
    let chosenMonster = _(Monsters).values().filter(monster => monster.difficulty >= lowestDifficulty && monster.difficulty < highestDifficulty).sample();
    let numMonsters = +dice.roll(chosenMonster.spawnPattern);
    
    for(let i = 0; i < numMonsters; i++) {
      let tile = _.sample(GameState.world.getValidTilesInRange(basedOn.x, basedOn.y, basedOn.z, 50, (tile) => basedOn.distBetween(tile) > basedOn.getSight()));
      let monster = new Monster(tile.x, tile.y, tile.z, chosenMonster);
      monster.target = basedOn;
    }
  }
}