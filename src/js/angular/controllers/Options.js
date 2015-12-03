import module from '../module';
import GameState from '../../rogue/init/gamestate';
import _ from 'lodash';

module.controller('Options', ($scope) => {

  $scope.seppuku = () => {
    _.each(GameState.players, p =>  {
      if (!p.hp.atMin()) {
        p.die({ name:'Seppuku' });
      }
    });
  };

  $scope.getCurrentSpKp = () => {
    $scope.spEarned = GameState.spEarned;
    $scope.kpEarned = GameState.kpEarned;
  };

});
