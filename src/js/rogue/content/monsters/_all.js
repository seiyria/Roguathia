
import _ from 'lodash';
import * as Canines from './canines';
import * as Elementals from './elementals';
import * as Insects from './insects';
import * as Nymphs from './nymphs';
import * as Puddings from './puddings';
import * as Rats from './rats';
import * as Salamanders from './salamanders';
import * as Spores from './spores';
import * as Summoned from './_summoned';

export default _.extend({}, Canines, Elementals, Insects, Nymphs, Puddings, Rats, Salamanders, Spores, Summoned);