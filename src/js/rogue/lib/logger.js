
import BRAGI from 'bragi-browser';

// remove extra log line
BRAGI.transports.get('Console').property({ showMeta: false });
export default (group, message) => BRAGI.log(group, message);