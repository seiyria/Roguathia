
import _ from 'lodash';
import ROT from 'rot-js';
import Character from './character';
import Settings from '../constants/settings';
import GameState from '../init/gamestate';
import MonsterSpawner from '../worldgen/monster-spawner';
import * as Behaviors from '../content/behaviors/_all';
import Factions from '../constants/factions';
import { Entities as Glyphs } from '../constants/glyphs';

export default class Player extends Character {
  
  constructor(x, y, z, opts = {}) {
    opts.stats = { behaviors: [
      Behaviors.Attacks(),
      Behaviors.DropsGold('0d0'), Behaviors.HealsBelowPercent(50),
      Behaviors.Wanders(), Behaviors.AlertsOnStep()
    ] };
    super({ key: Glyphs.Player }, x, y, z, opts);
    this.factions.push(Factions.PLAYER);
    this.antiFactions.push(Factions.MONSTER);
    this.spawnSteps = Settings.game.spawnSteps; // spawn creatures every 100 steps
    this.totalXpEarned = 0;
    this.totalKpEarned = 0;
    this.kpEarned = 0;
    this.conquest = {};
    
    this.name = _.trunc(this.name, { length: Settings.game.nameLength, omission: '' });
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
    if(GameState.game.checkWin()) return;

    const engine = GameState.game.engine;
    engine.lock();

    const livingPlayers = _.reject(GameState.players, (player) => player.hp.atMin());

    if(!GameState.manualMove) {
      super.act();
      setTimeout(function() { engine.unlock(); }, Settings.game.turnDelay/livingPlayers.length);
    }
    
    this.rebuildPathingMap();
    
    if(this.currentTurn % this.getSpawnSteps() === 0) {
      this.spawnMonster();
    }

    GameState.playerTurnsTaken++;

    if(GameState.playerTurnsTaken >= GameState.livingPlayers) {
      GameState.game.refresh();
      GameState.emit('redraw');

      GameState.playerTurnsTaken = 0;
    }
  }
  
  rebuildPathingMap() {
    const canPass = (x, y) => {
      const entity = GameState.world.getEntity(x, y, this.z);
      const isAttackable = entity && this.canAttack(entity);
      const isMe = this.x === x && this.y === y;
      return GameState.world.isTilePassable(x, y, this.z) || isMe || isAttackable;
    };
    
    this._path = new ROT.Path.Dijkstra(this.x, this.y, canPass, { topology: 8 });
  }
  
  die(killer) {
    super.die(killer);

    GameState.emit('redraw');
    GameState.emit('die');
    GameState.livingPlayers--;

    if(_.every(GameState.players, (player) => player.hp.atMin())) {
      GameState.emit('gameover');
      GameState.game.gameOver();
      GameState.game.engine.lock();
    }
  }

  cleanUp() {
    super.cleanUp();
    this._path = null;
  }
  
  spawnMonster() {
    MonsterSpawner.spawn(this);
  }
  
  descend() {
    if(GameState.currentFloor+1 === GameState.world.depth) return;
    const newFloor = GameState.currentFloor = GameState.currentFloor+1;
    const stairs = GameState.world.stairs[newFloor].up;

    _.each(GameState.players, (player) => {
      if(player.hp.atMin()) return;
      GameState.world.moveEntity(player, stairs[0], stairs[1], newFloor);
      player.stepRandomly();
    });

    GameState.world.descend();
    GameState.emit('descend');
  }
  
  ascend() {
    GameState.currentFloor--;
  }
  
  getScore() {
    return this.currentTurn + this.gold + this.totalXpEarned;
  }
}