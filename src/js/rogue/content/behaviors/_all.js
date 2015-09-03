
import _ from 'lodash';
import * as Combat from './combat';
import * as Conditions from './conditions';
import * as Death from './death';
import * as Interactions from './interactions';
import * as Regeneration from './regeneration';
import * as Targetting from './targetting';

export default _.extend({}, Combat, Conditions, Death, Interactions, Regeneration, Targetting);