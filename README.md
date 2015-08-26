# TODO

* Content (all types of items)
* Conducts
* Add more players. Allow for main game to focus on party leader, or splitscreen like the other views. Allow for "vertical" or "horizontal" splitscreen - when you have 2 or more people adjust the screen accordingly.
* Properties (Intrinsic, Extrinsic): (element|debuff)-resist, regeneration, searching, see/invisible, teleport/control, polymorph/control, levitation, stealth, aggravation, conflict, protection, warning, hunger, telepathy, speed, unbreathing, amphibious, jumping, infravision, reflection, life saving, phasing, fumbling, displacement, clairvoyance, half-(type)-damage, swimming, free action, flight, slow digestion
* Item type proficiencies (weapon, spells, etc) - these should be based off of the attack type (Slash, Shot, etc)
* Meta-currency (and benefits)
  * SP (every turn taken = 1 step)
    * More character classes
    * Permanent character benefits (+1 str, etc)
    * More party members
    * More behavior types
    * More races
    * Assignable behaviors
    * Assignable classes
    * More starting equipment (unlock certain starting equipment tiers)
    * Better starting equipment (enchanted, more charges, etc)
    * More item variety (ie, unlock the 25%, 50%, 75% and 100% percentile of rarity in items)
    * Temporary enchantments, blessings, uncursings, etc (spent in the meta, apply to current game only)
    * Better tombstones (per character)
    * Pet slot
    * Pet (based on chooseable monsters)
    * Template slots (assignable to a character, but kept separate, these would allow you to store a configuration
  * KP (monsters are worth different amounts of points)
    * More monster variety
    * Stronger monsters (ie, their stats are overall better)
    * Expand item drop variety (ie, their starting equipment is better)
    * Tameable monster variety
    * More pet choices
  * VP (you get points for surviving the dungeon, your conduct is worth lots of points)
    * More dungeon features (fountains, thrones, decorations, sinks, etc)
    * Deeper dungeons (+2 floors / lvl)
    * More floor types (caves, mines, towns, etc) (see [here](http://crawl.chaosforge.org/Dungeon_branches) for possible branch types)
    * More chance of generating items on the floor (say, 1% chance per floor, increasing by 1% each time)
    * More items generated on the floor (say, increase the max by 1 per level - the min would always be 1)
    * Better items generated on the floor
    * Possibly unlock a dungeon editor (you can rearrange what floors are in what order, and how many of them spawn)
    * Better respawn time
* Ending conditions (worth different amounts of VP)
  * Kill Selyk
  * Find the ring of Selyk (opens a chamber leading to an altar)
  * Find the stone of Selyk (insta-win, low VP gain)
  * Possibly other endings depending on dungeon path (or maybe all ends lead to Selyk), or other paths have different artifacts you can collect/use that are worth different amounts of VP
* Catchable ammo, recoverable ammo

# Website
* Ascii-styled theme for bootstrap [this maybe](https://kristopolous.github.io/BOOTSTRA.386/)
* Sliders for game speed, etc, and switches for skipping some screens, maybe
* Favicon: unicode goblin

# Pre-release
* Analysis tool to make sure stats/etc are declared properly (they may need to be moved to the prototype so they can be imported)
* Assertions, unit tests, logging, general code refactoring / cleanup
* IRC bot (Selyk) to announce major events (deaths, etc) / scrollback to chat
* Track statistics (games played, monsters killed, killed by, total SP/KP/VP, features interacted with [doors opened, etc])
* Refactor / reorg / unit tests for classes

# Post-release
* Doors that require keys that are spawned in the level, and have treasure or stairs behind them
* More content
* More puzzles
* More intricate death messages ("while asleep" "while stunned")