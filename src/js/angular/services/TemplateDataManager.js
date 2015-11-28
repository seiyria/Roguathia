
import module from '../module';

module.service('TemplateDataManager', ($localStorage) => {

  if(!$localStorage.templates) {
    $localStorage.templates = [];
  }

  const templates = $localStorage.templates;

  return {
    templates
  };

});