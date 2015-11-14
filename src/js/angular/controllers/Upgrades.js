
import _ from 'lodash';

import module from '../module';
import GameState from '../../rogue/init/gamestate';

module.controller('Upgrades', ($scope, $localStorage) => {

  if(!$localStorage.currency) {
    $localStorage.currency = { sp: 0, kp: 0, vp: 0 };
  }
  $scope.currency = $localStorage.currency;

  const addCurrency = (key, val) => {
    $scope.currency[key] += val;
    $localStorage.currency = $scope.currency;
  };

  GameState.on('gameover', () => {
    _.each(['sp', 'kp', 'vp'], key => {
      const add = GameState[`${key}Earned`] || 0;
      addCurrency(key, add);
    });
    $scope.$apply();
  });

});