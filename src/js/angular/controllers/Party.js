
import module from '../module';
import GameState from '../../rogue/init/gamestate';

module.controller('Party', ($scope) => {

  $scope.dropItem = (player, item) => player.dropItem(item);

  $scope.inventoryOffset = () => 40 + 40 + document.getElementsByClassName('player-block')[0].offsetHeight;

  GameState.on('redraw', () => {
    $scope.players = GameState.players;
    $scope.$apply();
  });
});