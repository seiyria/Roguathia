# Roguathia [![Code Climate](https://codeclimate.com/github/seiyria/Roguathia/badges/gpa.svg)](https://codeclimate.com/github/seiyria/Roguathia) [![Dependency Status](https://gemnasium.com/seiyria/Roguathia.svg)](https://gemnasium.com/seiyria/Roguathia) [![bitHound Score](https://www.bithound.io/github/seiyria/Roguathia/badges/score.svg)](https://www.bithound.io/github/seiyria/Roguathia) [![Build Status](https://travis-ci.org/seiyria/Roguathia.svg)](https://travis-ci.org/seiyria/Roguathia) [![Codacy Badge](https://www.codacy.com/project/badge/7d38b1b793bb4cec862debe3af85f851)](https://www.codacy.com/app/seiyria/Roguathia)

# Notes
If the game whitescreens for you (in Chrome), please disable hardware acceleration.

# TODO
* Meta-currency (and benefits)
  * SP (every turn taken = 1 step)
    * More character classes
    * Permanent character benefits (+1 str, etc) - there has to be a way to limit this so people don't invest too heavily in it. Maybe high scaling cost and is allocalable to any stat, and caps off at a certain spot.
    * More party members
    * More behavior types
    * More races
    * Higher starting level
    * Assignable behaviors
    * Assignable classes
    * More starting equipment (unlock certain starting equipment tiers)
    * Better starting equipment (enchanted, more charges, etc)
    * More item variety (ie, unlock the 25%, 50%, 75% and 100% percentile of rarity in items)
    * Temporary enchantments, blessings, uncursings, etc (spent in the meta, apply to current game only)
    * Better tombstones (per character)
    * Pet slot
    * Pet (based on chooseable monsters)
    * Better starting proficiencies
    * Template slots (assignable to a character, but kept separate, these would allow you to store a configuration)
    * More color choices for players to be
    * More border style choices (style = character[s] + color)
    * Higher SP multiplier
  * KP (monsters are worth different amounts of points)
    * More monster variety (ie, unlock certain difficulties for monsters. By default you only get up to difficulty 5 or so.)
    * Stronger monsters (ie, their stats are overall better)
    * Expand item drop variety (ie, their starting equipment is better)
    * Tameable monster variety
    * More pet choices
    * Higher monster limit
    * Higher KP multiplier
  * VP (you get points for surviving the dungeon, your conduct is worth lots of points)
    * More dungeon features (fountains, thrones, decorations, sinks, torches, etc)
    * Deeper dungeons (+2 floors / lvl)
    * More floor types (caves, mines, towns, etc) (see [here](http://crawl.chaosforge.org/Dungeon_branches) for possible branch types)
    * More chance of generating items on the floor (try to generate 1%, one tile, then try to generate another 1% for another item (keep going until max is reached, or failure occurs))
    * More items generated on the floor (say, increase the max by 1 per level - the min would always be 1)
    * Better items generated on the floor
    * Possibly unlock a dungeon editor (you can rearrange what floors are in what order, and how many of them spawn)
    * Better respawn time
    * Guaranteed N artifact generations
    * Higher VP multiplier
* Achievements (worth VP, some worth recurring VP to a lesser extent)
  * Beat game with one party member @ level X (10, 25, 50, 100)
  * Beat game with one party member where dungeon size >= X (10, 25, 50, 100)
  * Unlock all Y (Y = party member slots, behaviors, traits, classes, races, colors, pets, dungeon floor types, dungeon features)
  * Get a dungeon of size X (10, 20, 30, 40, 50...)
  * Customize a player (template slot | color | pet | tombstone)
  * Deck out a player (template slot, color, pet, tombstone)
  * Get an item enchanted to +5, +7, +9

# Pre-release
* Analysis tool to make sure stats/etc are declared properly (they may need to be moved to the prototype so they can be imported)
* Assertions, unit tests, logging, general code refactoring / cleanup
* IRC bot (Selyk) to announce major events (deaths, etc)
* Track statistics (games played, monsters killed, killed by, total SP/KP/VP, features interacted with [doors opened, etc])
* Refactor / reorg / unit tests for classes
* Conventional changelog for bump/release
* Import/export savefile
* More messages! Make sure the messages line up with with the game better, ie, show:
  * descend
  * game over
  * other special events (sitting on a throne, interacting with a fountain, etc)

# Idea Bucket (TBD)
* Gravestones should use deaths from other players to spawn occasionally. also, they should get a death message. maybe also store deaths in the firebase
* Chests and other containers
* More intricate death messages ("while asleep" "while stunned")
* Catchable ammo, recoverable ammo
* Gems: random category, unidentifiable until the end of the game
* Scrolls: only usable by players? (ie, not the characters in the dungeon)
* Traps in the dungeon (also implement levitation)
* Deities (also, add altars as dungeon features and temples as possible rooms)
* Conflict trait
* More floor types such as [this](http://www.gamasutra.com/blogs/AAdonaac/20150903/252889/Procedural_Dungeon_Generation_Algorithm.php)
* More victory types leading through various dungeons (similar to SelykAltar, generate a few extra floors at the bottom)
* Possibly allow people to use a slider to determine the relative generatability of room types
* Allow fountains to also spurt out pools onto the floor
* Themed rooms (Oracle room, Throne room, Bathroom, Graveyard)
  * More [here](https://nethackwiki.com/wiki/Special_room)
* Artifact Weapons
* Reflection (and an amulet, cloak)
* Magic resistance (for some monsters, and a cloak)
* Forgetful trait - you can only know what you see, the rest you forget (ie, explored hash is useless)
* Use known healing potions or use random potions when dying (also, allow people to manually use potions)
* heavy weapons (maces, greatmaces) that have knockback on their attacks (or bonus damage if the target is against a wall)
* Random colored stars on the respawn screen
* Random dungeon afflictions/bonuses (+120% SP gain, -3 con, etc)
* Pick better spells randomly
  * Potions as well (possibly, players interact with these things)
  * don't always pick healing potions -- random potions if healing is not identified -- maybe some kind of weighting for situations to try new things? "danger sense"?
  * implement more spellbooks and wands that incorporate buffs (possibly if you're not in combat, attempt to buff yourself, based on the buffs you have)
* Polymorph self
  * Chameleons can do this
* Corrision
  * -1 enchantLevel hit with a corrosionPercent chance of happening, adds "corroded" to name if < 0
  * add CorrodesWhenHit and a corrosion attribute to the attack that both do the same thing. Or maybe a CorrodeOnHit behavior?
  * Black Pudding
  * only affects corrodable items
* Burning
  * on a burn attack, everything has a chance of burning (if burnable), or explode (if explodable)
* More dungeon types
  * Mines
  * Town (arena with shops in it, or a digger with empty spaces/corridor spaces replaced with basic tile)
  * Big Room
  * Fortress
  * Swamp
  * Flooded
  * Castle
  * Lava floes
* figure out instance decorators for materials, glyphs, slotsTaken, etc