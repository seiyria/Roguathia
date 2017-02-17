
import ROT from 'rot-js';
import GameState from './gamestate';

window.GameState = GameState;

let debugInitialized = false;

export default () => {
  if(debugInitialized) return;
  debugInitialized = true;

  document.body.addEventListener('keydown', (e) => {
    if(e.keyCode !== ROT.VK_P) return;
    
    GameState.isPaused = !GameState.isPaused;
    
    if(GameState.isPaused) {
      GameState.game.engine.lock();
    } else {
      GameState.game.engine.unlock();
    }
  });
  
  document.body.addEventListener('keydown', (e) => {
    if(e.keyCode !== ROT.VK_R) return;
    
    GameState.renderAll = !GameState.renderAll;
  });

  document.body.addEventListener('keydown', (e) => {
    if(e.keyCode !== ROT.VK_L) return;

    GameState.game.changeSplitScreen();
  });

  /*
  document.body.addEventListener('keydown', (e) => {
    if(e.keyCode !== ROT.VK_D) return;

    GameState.players[0].descend();
  });
  */

  document.body.addEventListener('keydown', (e) => {
    if(e.keyCode !== ROT.VK_M) return;

    GameState.manualMove = !GameState.manualMove;
    if(!GameState.manualMove) {
      GameState.game.engine.unlock();
    }
  });

  document.body.addEventListener('keydown', (e) => {

    const offsets = {
      [ROT.VK_S]: { x: 0, y: -1 },
      [ROT.VK_W]: { x: 0, y: 1 },
      [ROT.VK_A]: { x: -1, y: 0 },
      [ROT.VK_D]: { x: 1, y: 0 },

      [ROT.VK_NUMPAD8]: { x: 0, y: -1 },
      [ROT.VK_NUMPAD2]: { x: 0, y: 1 },
      [ROT.VK_NUMPAD4]: { x: -1, y: 0 },
      [ROT.VK_NUMPAD6]: { x: 1, y: 0 },

      [ROT.VK_NUMPAD1]: { x: -1, y: -1 },
      [ROT.VK_NUMPAD9]: { x: 1, y: 1 },
      [ROT.VK_NUMPAD7]: { x: -1, y: 1 },
      [ROT.VK_NUMPAD3]: { x: 1, y: -1 }
    };

    if(!offsets[e.keyCode] || !GameState.manualMove) return;

    const player = GameState.players[0];
    player.moveTo(player.x+offsets[e.keyCode].x, player.y+offsets[e.keyCode].y);
    GameState.game.engine.unlock();
  });
};