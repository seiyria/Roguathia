
import Start from './game-starter';

// remove extra log line
BRAGI.transports.get('Console').property({ showMeta: false });

if(!ROT.isSupported()) {
  alert(`rot.js isn't supported :(`);
} else {
  Start();
}
