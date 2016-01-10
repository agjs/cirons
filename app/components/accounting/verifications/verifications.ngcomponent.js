(function() {
  "use strict";

  angular.module('CIRONS-MAIN-APP')
    .controller('verificationsController', require('./verifications.ngcontroller'))
    .controller('verificationsCRUDController', require('./verifications_crud.ngcontroller'))
    .controller('verificationsSingleItemController', require('./verifications_item.ngcontroller'))
    .factory('verificationsFactory', require('./verifications.ngfactory'))
    .config(require('./verifications.ngrouter'));

})();
