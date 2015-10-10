
import module from '../module';
import GameState from '../../rogue/init/gamestate';

module.controller('Party', ($scope) => {
  $scope.GameState = GameState;

  $scope.$watch('GameState', (newVal) => console.log(newVal), true);
});