import SETTINGS from "./settings";
import World from "./world";
import GameState from "./gamestate";

import {SingleGameScreen, DeadScreen} from "./screens";

import Player from "./player";

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
      loadOldData();
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
      
    let startTile = _.sample(playerLocations);
    let player = new Player({key: '@'}, 0, 0, 0);
    
    GameState.currentFloor = 0;
    GameState.world.moveEntity(player, startTile.x, startTile.y, 0);
    GameState.players.push(player);
    this.engine.start();
    
    setTimeout( () => this.switchScreen(SingleGameScreen), 100);
  }
}