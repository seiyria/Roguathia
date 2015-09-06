
import _ from 'lodash';
import * as Canines from './canines';
import * as Insects from './insects';
import * as Salamanders from './salamanders';
import * as Spores from './spores';

export default _.extend({}, Canines, Insects, Salamanders, Spores);