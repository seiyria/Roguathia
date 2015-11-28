
import _ from 'lodash';

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

  $scope.genders = [
    { key: 'Random', val: undefined },
    { key: 'Male', val: 'Male' },
    { key: 'Female', val: 'Female' }
  ];

  $scope.aligns = [
    { key: 'Random', val: undefined },
    { key: 'Eviler', val: -200 },
    { key: 'Evil', val: -100 },
    { key: 'Neutral', val: 0 },
    { key: 'Good', val: 100 },
    { key: 'Gooder', val: 200 }
  ];

  $scope.professions = [{ key: 'Random', val: undefined }].concat(_(UpgradeDataManager.upgrades)
    .filter(u => _.contains(u, 'Class:'))
    .map(u => u.split(' ')[1])
    .map(u => ({ key: u, val: u }))
    .value());

  $scope.races = [{ key: 'Random', val: undefined }].concat(_(UpgradeDataManager.upgrades)
    .filter(u => _.contains(u, 'Race:'))
    .map(u => u.split(' ')[1])
    .map(u => ({ key: u, val: u }))
    .value());

  $scope.colors = [
    { key: 'Default', val: undefined },
    { key: 'Red', val: '#f00' },
    { key: 'Blue', val: '#00f' },
    { key: 'Green', val: '#0f0' },
    { key: 'Yellow', val: '#ff0' },
    { key: 'Cyan', val: '#0ff' },
    { key: 'Magenta', val: '#f0f' }
  ];
});