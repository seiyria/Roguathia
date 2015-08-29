
import GameState from './gamestate';

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
};