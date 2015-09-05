
import _ from 'lodash';
import * as Walls from './walls';
import * as Floors from './floors';
import * as Stairs from './stairs';
import * as Features from './features';

export default _.extend({}, Walls, Floors, Stairs, Features);