
import module from '../module';

module.service('CurrencyDataManager', ($localStorage) => {

  if(!$localStorage.currency) {
    $localStorage.currency = { sp: 0, kp: 0, vp: 0 };
  }

  const currency = $localStorage.currency;

  const addCurrency = (key, val) => {
    currency[key] += val;
    $localStorage.currency = currency;
  };

  const hasCurrency = (key, val) => currency[key] >= val;

  const useCurrency = (key, val) => {
    if(!hasCurrency(key, val)) return;
    addCurrency(key, -val);
  };

  return {
    addCurrency,
    hasCurrency,
    useCurrency,
    currency
  };

});