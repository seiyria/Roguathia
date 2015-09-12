
import _ from 'lodash';
import * as Canines from './canines';
import * as Elementals from './elementals';
import * as Gnomes from './gnomes';
import * as Insects from './insects';
import * as Kobolds from './kobolds';
import * as Nymphs from './nymphs';
import * as Orcs from './orcs';
import * as Puddings from './puddings';
import * as Rats from './rats';
import * as Salamanders from './salamanders';
import * as Spores from './spores';
import * as Summoned from './_summoned';

export default _.extend({}, Canines, Elementals, Gnomes,
  Insects, Kobolds, Nymphs, Orcs, Puddings, Rats, Salamanders,
  Spores, Summoned);