
export default {
  screen: {
    width: 80,
    height: 24
  },
  game: {
    turnDelay: 50,
    killXpDivisor: 5,
    minStatValue: 3,
    alignThreshold: 100,
    baseAC: 10,
    spawnSteps: 100,
    nameLength: 15,

    display: {
      turns: 4,
      log: 50
    },

    defaultStats: {
      monster: {
        str: 8,
        con: 8,
        dex: 8,
        int: 8,
        wis: 8,
        cha: 8
      },

      attributes: {
        ac:  0,
        str: 8,
        con: 8,
        dex: 8,
        int: 8,
        wis: 8,
        cha: 8,
        luk: 0,
        gold: 0,
        level: 1,
        align: 0,
        speed: 100,
        sight: 4,
        sound: 50,
        killXp: '0d0',
        spawnHp: '15d1',
        spawnMp: '0d0',
        regenHp: 20,
        regenMp: 10
      },

      stats: {
        gender: 'Male',
        name: 'Dudley',
        race: 'Human',
        attacks: [],
        behaviors: [],
        profession: 'Developer'
      },

      profession: {
        hp  : '0d0',
        mp  : '0d0',
        ac  : 0,
        str : 0,
        con : 0,
        int : 0,
        dex : 0,
        wis : 0,
        cha : 0,
        luk : 0,
        speed: 0,
        sight: 0,
        spawnSteps: 0,
        addFactions: [],
        addBehaviors: [],
        titles: [],
        attacks: [],
        traits: [],
        skillCaps: {}
      },

      equipmentSlots: {
        hands:  2,
        head:   1,
        body:   1,
        feet:   2,
        wrist:  2,
        cloak:  1,
        neck:   1,
        ring:   2
      },

      race: {
        ac  : 0,
        hp  : 0,
        mp  : 0,
        str : 0,
        con : 0,
        int : 0,
        dex : 0,
        wis : 0,
        cha : 0,
        luk : 0,
        speed: 0,
        sight: 0,
        spawnSteps: 0,
        addFactions: [],
        addBehaviors: [],
        attacks: [],
        traits: [],
        skillBonus: {}
      }
    }
  },
  upgradeParameters: {
    MAX_FEATURE_SPAWN_CHANCE: 10000
  },
  upgradeIncrement: {
    itemsInDungeon: 1,
    itemDropChance: 1,
    altarSpawnChance: 25,
    templeSpawnChance: 5,
    throneSpawnChance: 25,
    throneRoomSpawnChance: 5,
    graveSpawnChance: 25,
    graveyardSpawnChance: 5,
    fountainSpawnChance: 25,
    oracleRoomChance: 5,
    sinkSpawnChance: 25,
    bathroomSpawnChance: 5
  },
  upgrades: {
    itemsInDungeon: 1,
    itemDropChance: 1,
    altarSpawnChance: 0,
    templeSpawnChance: 0,
    throneSpawnChance: 0,
    throneRoomSpawnChance: 0,
    graveSpawnChance: 0,
    graveyardSpawnChance: 0,
    fountainSpawnChance: 0,
    oracleRoomChance: 0,
    sinkSpawnChance: 0,
    bathroomSpawnChance: 0
  },
  upgradesMax: {
    itemDropChance: 75,
    altarSpawnChance: 1000,
    templeSpawnChance: 100,
    throneSpawnChance: 1000,
    throneRoomSpawnChance: 100,
    graveSpawnChance: 1000,
    graveyardSpawnChance: 100,
    fountainSpawnChance: 1000,
    oracleRoomChance: 100,
    sinkSpawnChance: 1000,
    bathroomSpawnChance: 100
  }
};