
import ROT from 'rot-js';
import GameState from './gamestate';

window.GameState = GameState;

export default () => {
  document.body.addEventListener('keydown', (e) => {
    if(e.keyCode !== ROT.VK_SPACE) return;
    
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
    if(e.keyCode !== ROT.VK_S) return;

    GameState.game.changeSplitScreen();
  });

  document.body.addEventListener('keydown', (e) => {
    if(e.keyCode !== ROT.VK_D) return;

    GameState.players[0].descend();
  });

  document.body.addEventListener('keydown', (e) => {
    if(e.keyCode !== ROT.VK_M) return;

    GameState.manualMove = !GameState.manualMove;
    if(!GameState.manualMove) {
      GameState.game.engine.unlock();
    }
  });

  document.body.addEventListener('keydown', (e) => {

    const offsets = {
      [ROT.VK_UP]: { x: 0, y: -1 },
      [ROT.VK_DOWN]: { x: 0, y: 1 },
      [ROT.VK_LEFT]: { x: -1, y: 0 },
      [ROT.VK_RIGHT]: { x: 1, y: 0 }
    };

    if(!offsets[e.keyCode] || !GameState.manualMove) return;

    const player = GameState.players[0];
    player.moveTo(player.x+offsets[e.keyCode].x, player.y+offsets[e.keyCode].y);
    GameState.game.engine.unlock();
  });
};