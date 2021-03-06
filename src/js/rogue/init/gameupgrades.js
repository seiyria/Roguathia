
import _ from 'lodash';

const baseState = {
  dungeon: {
    itemsInDungeon: 0,
    itemDropChance: 0,
    altarSpawnChance: 0,
    throneSpawnChance: 0,
    graveSpawnChance: 0,
    fountainSpawnChance: 0,
    sinkSpawnChance: 0,
    monsterLimit: 10,
    maxDifficulty: 5,
    depth: 10,
    squarity: 70

   /* itemDropChance: 100,
    altarSpawnChance: 1000,
    templeSpawnChance: 100,
    throneSpawnChance: 1000,
    throneRoomSpawnChance: 100,
    graveSpawnChance: 1000,
    graveyardSpawnChance: 100,
    fountainSpawnChance: 1000,
    oracleRoomChance: 100,
    sinkSpawnChance: 1000,
    bathroomSpawnChance: 100*/

  },

  templates: [],

  unlocked: {
    race: ['Elf', 'Human', 'Gnome'],
    profession: ['Tourist']
  },

  selectable: {
    race: [],
    profession: []
  },

  extra: {
    players: 1,
    respawnTime: 0
  }
};

export const NewState = () => _.cloneDeep(baseState);

let curState = NewState();

export const SetState = (newState) => curState = newState;

export const Current = () => curState;

export default curState;