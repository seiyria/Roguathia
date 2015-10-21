
import module from '../module';

module.directive('scrollBottom', () => {
  return {
    scope: {
      scrollBottom: '='
    },
    link: (scope, element) => {
      scope.$watchCollection('scrollBottom', (newValue) => {
        if(!newValue) return;
        const el = angular.element(element);
        el.scrollTop(el[0].scrollHeight);
      });
    }
  };
});