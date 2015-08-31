import SETTINGS from '../constants/settings';
import World from '../worldgen/world';
import GameState from './gamestate';

import { SingleGameScreen } from '../display/screens/game';
import DeadScreen from '../display/screens/dead';

import Player from '../definitions/player';

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
    
    let bindToScreen = (event) => {
      window.addEventListener(event, (e) => {
        if(this.currentScreen === null) return;
        
        this.currentScreen.handleInput(event, e);
      });
    };
    
    _.each(['keydown', 'keypress'], (event) => bindToScreen(event));
  }
  
  refresh() {
    this.display.clear();
    this.currentScreen.render(this.display);
  }
  
  gameOver() {
    this.switchScreen(DeadScreen);
  }
  
  safeSwitchScreen(me, newScreen) {
    if(this.currentScreen !== me) return;
    this.switchScreen(newScreen);
  }

  changeSplitScreen() {
    if(!this.currentScreen.split || GameState.players.length === 1) return;
    this.splitScreen = !this.splitScreen;
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
    
    if(false) {
      this.loadOldData();
      return;
    }
    
    this.startNewGame();
  }
  
  loadOldData() {}
  
  startNewGame() {
    GameState.world = new World();
    GameState.world.generateWorld();
    let zeroStartStairs = GameState.world.stairs[0].up;
    
    GameState.players = [];
    let playerLocations = GameState.world.getValidTilesInRange(
      zeroStartStairs[0], zeroStartStairs[1], 0, 2, (tile) => tile.glyph.key === '.'
    );

    GameState.currentFloor = 0;

    for(let i = 0; i < 4; i++) {
      let startTile = playerLocations.shift();
      let player = new Player(0, 0, 0);

      GameState.world.moveEntity(player, startTile.x, startTile.y, 0);
      GameState.players.push(player);
    }
    this.engine.start();
    
    setTimeout(() => {
      this.switchScreen(SingleGameScreen);
      if(GameState.players.length > 1) this.changeSplitScreen();
    }, 100);
  }
}