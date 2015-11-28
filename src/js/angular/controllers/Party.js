
import module from '../module';
import GameState from '../../rogue/init/gamestate';

module.controller('Party', ($scope, $uibModal) => {

  $scope.inventoryOffset = () => 60 + document.getElementsByClassName('player-block')[0].offsetHeight;

  $scope.openEditWindow = (player, index) => {
    $uibModal.open({
      templateUrl: 'player-edit',
      controller: 'PartyMemberEdit',
      keyboard: false,
      backdrop: 'static',
      resolve: { player, index }
    });
  };

  GameState.on('redraw', () => {
    $scope.players = GameState.players;
    $scope.$apply();
  });
});

module.controller('PartyMemberEdit', ($scope, $uibModalInstance, TemplateDataManager, UpgradeDataManager, player, index) => {
  $scope.close = $uibModalInstance.close;

  $scope.templateDataManager = TemplateDataManager;
  $scope.upgradeDataManager = UpgradeDataManager;
  $scope.index = index;
  $scope.player = player;
});