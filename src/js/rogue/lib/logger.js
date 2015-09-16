
import BRAGI from 'bragi-browser';

// remove extra log line
BRAGI.transports.get('Console').property({ showMeta: false });
export default (group, message, isError = false) => {
  if(isError) console.error(new Error(message).stack);
  BRAGI.log(group, message);
};