
import Character from './character';
import SETTINGS from '../constants/settings';
import GameState from '../init/gamestate';
import MonsterSpawner from '../worldgen/monster-spawner';
import * as Behaviors from '../content/behaviors/behaviors';
import Factions from '../constants/factions';

export default class Player extends Character {
  
  constructor(x, y, z, opts = {}) {
    opts.stats = { behaviors: [Behaviors.Attacks(), Behaviors.PickUpItems(), Behaviors.HealsBelowPercent(50), Behaviors.Interacts(), Behaviors.Wanders()] };
    super({ key: '@' }, x, y, z, opts);
    this.factions.push(Factions.PLAYER);
    this.antiFactions.push(Factions.MONSTER);
    this.spawnSteps = 100; // spawn creatures every 100 steps
    this.totalXpEarned = 0;
    this.kpEarned = 0;
    this.conquest = {};
    
    this.name = _.trunc(this.name, { length: 15, omission: '' });
    this.brokenConduct.stubborn = false;
  }
  
  getSpawnSteps() {
    return this.getStat('spawnSteps');
  }
  
  gainXp(xp) {
    super.gainXp(xp);
    this.totalXpEarned += xp;
  }
  
  kill(dead) {
    super.kill(dead);
    this.totalKpEarned += dead.difficulty * dead.killXp;
    if(!this.conquest[dead.name]) this.conquest[dead.name] = 0;
    this.conquest[dead.name]++;
    
    // probably refactor this into a lose/gainAlign and some constants for common occurrences
    if(dead.hasFaction(Factions.PLAYER)) {
      this.align -= 50;
    }
  }
  
  act() {
    var engine = this.game.engine;
    engine.lock();
    
    super.act();
    
    this.rebuildPathingMap();
    
    if(this.currentTurn % this.getSpawnSteps() === 0) {
      this.spawnMonster();
    }
    
    this.game.refresh();
    
    setTimeout(() => engine.unlock(), SETTINGS.game.turnDelay/GameState.players.length);
  }
  
  rebuildPathingMap() {
    let canPass = (x, y) => {
      let entity = GameState.world.getEntity(x, y, this.z);
      let isAttackable = entity && this.canAttack(entity);
      let isMe = this.x === x && this.y === y;
      return GameState.world.isTilePassable(x, y, this.z) || isMe || isAttackable;
    };
    
    this._path = new ROT.Path.Dijkstra(this.x, this.y, canPass, { topology: 8 });
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
  
  getScore() {
    return this.currentTurn + this.gold + this.totalXpEarned + this.kpEarned;
  }
}