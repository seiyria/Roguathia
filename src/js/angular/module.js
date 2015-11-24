
import _ from 'lodash';

const module = angular.module('Roguathia', ['ui.bootstrap', 'ngStorage']);

module.run(($rootScope) => $rootScope._ = _);

export default module;