
import _ from 'lodash';
import module from '../module';

module.service('UpgradeDataManager', (CurrencyDataManager, $localStorage) => {

  if(!$localStorage.upgrades) {
    $localStorage.upgrades = [];
  }

  const upgrades = $localStorage.upgrades;

  const _hasUpgrade = (upgradeName) => _.contains(upgrades, upgradeName);
  const hasUpgrade = (upgrade) => _hasUpgrade(upgrade.name);

  const hasUpgradeReq = (upgrade) => upgrade.req ? _hasUpgrade(upgrade.req) : true;

  const buyUpgrade = (upgrade) => {
    if(!CurrencyDataManager.hasCurrency(upgrade.currency, upgrade.cost)) return;
    if(!hasUpgradeReq(upgrade)) return;
    CurrencyDataManager.useCurrency(upgrade.currency, upgrade.cost);
    upgrades.push(upgrade.name);
    $localStorage.upgrades = upgrades;
  };

  const canSeeUpgrade = (upgrade) => !hasUpgrade(upgrade) && hasUpgradeReq(upgrade);

  return {
    buyUpgrade,
    hasUpgrade,
    canSeeUpgrade,
    upgrades
  };

});