
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
    
    let canPass = (x, y) => {
      let entity = GameState.world.getEntity(x, y, this.z);
      let isAttackable = entity && this.canAttack(entity);
      let isMe = this.x === x && this.y === y;
      return GameState.world.isTilePassable(x, y, this.z) || isMe || isAttackable;
    };
    
    this._path = new ROT.Path.Dijkstra(this.x, this.y, canPass, {topology: 8});
    
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
    
    this.stepRandomly();
  }
  
  die(killer) {
    super.die(killer);
    GameState.game.gameOver();
    GameState.game.engine.lock();
  }
  
  spawnMonster() {
    MonsterSpawner.spawn(this);
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