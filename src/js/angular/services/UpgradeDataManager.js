
import _ from 'lodash';
import module from '../module';

module.service('UpgradeDataManager', (CurrencyDataManager, $localStorage) => {

  if(!$localStorage.upgrades) {
    $localStorage.upgrades = [];
  }

  const upgrades = $localStorage.upgrades;

  const buyUpgrade = (upgrade) => {
    if(!CurrencyDataManager.hasCurrency(upgrade.currency, upgrade.cost)) return;
    CurrencyDataManager.useCurrency(upgrade.currency, upgrade.cost);
    upgrades.push(upgrade.name);
    $localStorage.upgrades = upgrades;
  };

  const hasUpgrade = (upgrade) => _.contains(upgrades, upgrade.name);

  return {
    buyUpgrade,
    hasUpgrade,
    upgrades
  };

});