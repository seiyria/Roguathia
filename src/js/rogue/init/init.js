
import ROT from 'rot-js';
import Start from './game-starter';

if(!ROT.isSupported()) {
  alert(`rot.js isn't supported :(`);
} else {
  Start();
}
