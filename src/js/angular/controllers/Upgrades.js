
import _ from 'lodash';

import module from '../module';
import GameState from '../../rogue/init/gamestate';
import { StartGameCycle } from '../../rogue/init/init';
import { NewState, SetState } from '../../rogue/init/gameupgrades';
import Upgrades from '../../rogue/constants/upgrades';

module.filter('visibleUpgrades', (CurrencyDataManager, UpgradeDataManager) => {
  return (upgrades, type) => {
    return _.filter(upgrades, upgrade => upgrade.cost < CurrencyDataManager.currency[type] / 2
      && upgrade.currency === type
      && UpgradeDataManager.canSeeUpgrade(upgrade)
    );
  };
});

module.controller('Upgrades', ($scope, CurrencyDataManager, UpgradeDataManager) => {

  $scope.upgrades = Upgrades;
  $scope.upgradeDataManager = UpgradeDataManager;
  $scope.currencyDataManager = CurrencyDataManager;

  let curState = {};

  $scope.buyUpgrade = (upgrade) => {
    if(!UpgradeDataManager.buyUpgrade(upgrade)) return;
    upgrade.operate(curState);
  };

  const rebuildUpgrades = () => {
    const newState = curState = NewState();

    _.each(UpgradeDataManager.upgrades, name => {
      const upgrade = _.findWhere(Upgrades, { name });
      upgrade.operate(newState);
    });

    SetState(newState);
  };

  rebuildUpgrades();
  StartGameCycle();

  GameState.on('gameover', () => {
    _.each(['sp', 'kp', 'vp'], key => {
      const add = GameState[`${key}Earned`] || 0;
      CurrencyDataManager.addCurrency(key, add);
    });

    rebuildUpgrades();

    $scope.$apply();
  });

});