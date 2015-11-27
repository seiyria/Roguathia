
import ROT from 'rot-js';
import Start from './game-starter';

let gameStarted = false;

export const StartGameCycle = () => {
  if(gameStarted) return;

  if(!ROT.isSupported()) {
    alert(`rot.js isn't supported :(`);
  } else {
    gameStarted = true;
    Start();
  }
};
