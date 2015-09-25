
import _ from 'lodash';
import * as Axes from './weapons/axes';
import * as Bows from './weapons/bows';
import * as Daggers from './weapons/daggers';
import * as Maces from './weapons/maces';
import * as ShortSwords from './weapons/shortswords';
import * as Spears from './weapons/spears';
import * as Staves from './weapons/staves';
import * as Swords from './weapons/longswords';

export default _.extend({}, Axes, Bows, Daggers, Maces, ShortSwords, Spears, Staves, Swords);