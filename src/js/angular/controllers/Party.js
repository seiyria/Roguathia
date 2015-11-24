
import module from '../module';
import GameState from '../../rogue/init/gamestate';

module.controller('Party', ($scope) => {

  $scope.inventoryOffset = () => 40 + document.getElementsByClassName('player-block')[0].offsetHeight;

  GameState.on('redraw', () => {
    $scope.players = GameState.players;
    $scope.$apply();
  });
});