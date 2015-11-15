
import _ from 'lodash';
import ROT from 'rot-js';
import SETTINGS from '../constants/settings';
import World from '../worldgen/world';
import GameState from './gamestate';

import { SingleGameScreen } from '../display/screens/game';
import DeadScreen from '../display/screens/dead';
import WinScreen from '../display/screens/win';

import Player from '../definitions/player';
import * as Victories from '../constants/victories';

export default class Game {
  constructor() {
    this.display = new ROT.Display({
      fontSize: 14,
      fontStyle: 'bold',
      font: 'Courier New',
      width: SETTINGS.screen.width,
      height: SETTINGS.screen.height
    });
    this.currentScreen = null;

    this.listeners = {};

    const bindToScreen = (event) => {
      const listener = window.addEventListener(event, (e) => {
        if(this.currentScreen === null) return;
        
        this.currentScreen.handleInput(event, e);
      });

      this.listeners[event] = listener;
    };
    
    _.each(['keydown', 'keypress'], (event) => bindToScreen(event));
  }
  
  refresh() {
    if(!this.display) return;
    this.display.clear();
    this.currentScreen.render(this.display);
  }
  
  gameOver() {
    this.switchScreen(DeadScreen);
  }

  checkWin() {
    const didWin = GameState.winCondition.check();
    if(didWin) this.win();
    return didWin;
  }

  win() {
    this.switchScreen(WinScreen);
  }
  
  safeSwitchScreen(me, newScreen) {
    if(this.currentScreen !== me) return;
    this.switchScreen(newScreen);
  }

  changeSplitScreen() {
    if(!this.currentScreen.split || GameState.players.length === 1) return;
    GameState.splitScreen = !GameState.splitScreen;
    this.switchScreen(this.currentScreen.split);
  }
  
  switchScreen(screen) {
    if(this.currentScreen) {
      this.currentScreen.exit(this.display);
    }
    
    this.currentScreen = screen;

    if(this.currentScreen) {
      this.currentScreen.enter(this.display);
      this.refresh();
    }
  }
  
  setup() {
    this.scheduler = new ROT.Scheduler.Speed();
    this.engine = new ROT.Engine(this.scheduler);
    
/*    if(false) {
      this.loadOldData();
      return;
    }
*/

    this.startNewGame();
  }
  
  loadOldData() {}
  
  startNewGame() {
    GameState.winCondition = _(Victories).values().sample();

    GameState.world = new World();
    GameState.world.generateWorld();
    const zeroStartStairs = GameState.world.stairs[0].up;
    
    const playerLocations = GameState.world.getValidTilesInRange(
      zeroStartStairs[0], zeroStartStairs[1], 0, 2, (tile) => tile.glyph.key === '.'
    );

    for(let i = 0; i < 4; i++) {
      const startTile = playerLocations.shift();
      const player = new Player(0, 0, 0);

      GameState.world.moveEntity(player, startTile.x, startTile.y, 0);
      GameState.players.push(player);
    }

    GameState.livingPlayers = GameState.players.length;
    GameState.playerTurnsTaken = 0;

    this.engine.start();
    GameState.emit('start');
    
    setTimeout(() => {
      if(this.currentScreen.name === 'DeadScreen') return; // turn 1 death (you spawned with an amulet of strangulation, etc)
      this.switchScreen(SingleGameScreen);
      if(GameState.players.length > 1) this.changeSplitScreen();
    }, 100);
  }

  cleanUp() {
    this.display._data = null;
    this.display = null;
    this.currentScreen = null;
    this.scheduler = null;
    this.engine = null;

    _.each(['keydown', 'keypress'], event => window.removeEventListener(event, this.listeners[event]));
    this.listeners = null;
  }
}