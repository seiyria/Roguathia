
import _ from 'lodash';

import module from '../module';
import GameState from '../../rogue/init/gamestate';
import { StartGameCycle } from '../../rogue/init/init';
import { NewState, SetState } from '../../rogue/init/gameupgrades';
import Upgrades from '../../rogue/constants/upgrades';

module.filter('visibleUpgrades', (CurrencyDataManager, UpgradeDataManager) => {
  return (upgrades, type) => {
    return _.filter(upgrades, upgrade => upgrade.cost / 2 < CurrencyDataManager.currency[type]
      && upgrade.currency === type
      && UpgradeDataManager.canSeeUpgrade(upgrade)
    );
  };
});

module.controller('Upgrades', ($scope, $localStorage,$timeout, CurrencyDataManager, UpgradeDataManager, TemplateDataManager) => {

  $scope.upgrades = Upgrades;
  $scope.upgradeDataManager = UpgradeDataManager;
  $scope.currencyDataManager = CurrencyDataManager;

  let curState = {};

  $scope.buyUpgrade = (upgrade) => {
    if(!UpgradeDataManager.buyUpgrade(upgrade)) return;
    if(upgrade.operate) upgrade.operate(curState);
  };

  const rebuildUpgrades = () => {
    const newState = curState = NewState();

    _.each(newState.unlocked.race.concat(newState.unlocked.profession), random => {
      if(_.contains(UpgradeDataManager.upgrades, `Random: ${random}`)) return;
      UpgradeDataManager.upgrades.push(`Random: ${random}`);
    });

    _.each(UpgradeDataManager.upgrades, name => {
      const upgrade = _.findWhere(Upgrades, { name });
      if(upgrade && upgrade.operate) upgrade.operate(newState);
    });

    newState.templates = TemplateDataManager.templates;

    SetState(newState);
  };

  const getCurrencyFrom = (store) => {
    _.each(['sp', 'kp', 'vp'], key => {
      const add = store[`${key}Earned`] || 0;
      CurrencyDataManager.addCurrency(key, add);
    });
  };

  if($localStorage.saveStateCache) {
    getCurrencyFrom($localStorage.saveStateCache);
    $localStorage.saveStateCache = null;
  }

  rebuildUpgrades();
  StartGameCycle();

  GameState.on('redraw', () => {
    $localStorage.saveStateCache = {
      spEarned: GameState.spEarned,
      kpEarned: GameState.kpEarned
    };
  });

  const awardCurrency = () => {
    
    $timeout(function() {
      getCurrencyFrom(GameState);

      $localStorage.saveStateCache = null;

      rebuildUpgrades();
    });

  };

  GameState.on('gameend.gameover', awardCurrency);
  GameState.on('gameend.victory', awardCurrency);

});
