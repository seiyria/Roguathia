
import _ from 'lodash';

import module from '../module';
import GameState from '../../rogue/init/gamestate';
import { StartGameCycle } from '../../rogue/init/init';
import { NewState, SetState } from '../../rogue/init/gameupgrades';
import Upgrades from '../../rogue/constants/upgrades';

module.controller('Upgrades', ($scope, CurrencyDataManager, UpgradeDataManager) => {

  $scope.upgradeDataManager = UpgradeDataManager;
  $scope.currencyDataManager = CurrencyDataManager;

  const rebuildUpgrades = () => {
    const newState = NewState();

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
      UpgradeDataManager.addCurrency(key, add);
    });

    rebuildUpgrades();

    $scope.$apply();
  });

});