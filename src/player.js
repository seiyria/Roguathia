
import Character from "./character";
import SETTINGS from "./settings";
import GameState from "./gamestate";
import MessageQueue from "./message-handler";
import MonsterSpawner from "./monster-spawner";

import calc from "./lib/directional-probability";

export default class Player extends Character {
  
  constructor(x, y, z, opts) {
    super(x, y, z, opts);
    this.spawnSteps = 100; // spawn creatures every 100 steps
  }
  
  getSpawnSteps() {
    return this.getStat('spawnSteps');
  }
  
  act() {
    super.act();
    
    var engine = this.game.engine;
    engine.lock();
    
    if(this.currentTurn % this.getSpawnSteps() === 0) {
      this.spawnMonster();
    }
    
    this.inspectSurroundings();
    this.game.refresh();
    
    setTimeout( () => engine.unlock(), SETTINGS.game.turnDelay/GameState.players.length);
  }
  
  inspectSurroundings() {
    
    if(this.tryAttack()) return;
    
    var tiles = GameState.world.getAllTilesInRange(this.x, this.y, this.z, 1);
    
    for(let i = 0; i < tiles.length; i++) {
      let tile = tiles[i];
      
      if(tile.canInteract && tile.interact && tile.canInteract(this)) {
        let msg = tile.interact(this);
        MessageQueue.add({message: msg});
        return;
      }
    }
    
    this.tryMove(tiles);
  }
  
  die(killer) {
    super.die(killer);
    GameState.game.gameOver();
    GameState.game.engine.lock();
  }
  
  spawnMonster() {
    MonsterSpawner.spawn(this);
  }
  
  tryMove(tiles) {
    
    var validTiles = _.map(tiles, (tile, i) => GameState.world.isTileEmpty(tile.x, tile.y, tile.z) ? i+1 : null); // 1-9 instead of 0-8
    
    var direction = _(validTiles).compact().sample() - 1; // adjustment for array
    var newTile = tiles[direction]; // default to a random tile
    
    if(this.lastDirection) {
      let probs = calc(this.lastDirection + 1); //adjust for array
      let choices = _(validTiles).map(tileIndex => tileIndex ? [tileIndex, probs[tileIndex]] : null).compact().zipObject().value();
      direction = parseInt(ROT.RNG.getWeightedValue(choices)) - 1;
      newTile = tiles[direction];
    }
    
    this.move(newTile);
    this.lastDirection = direction;
  }
  
  descend() {
    let newFloor = GameState.currentFloor = GameState.currentFloor+1;
    let stairs = GameState.world.stairs[newFloor].up;
    GameState.world.moveEntity(this, stairs[0], stairs[1], newFloor);
  }
  
  ascend() {
    GameState.currentFloor--;
  }
}