(function() {
  "use strict";

  angular.module('CIRONS-MAIN-APP')
    .controller('webshopsController', require('./webshops.ngcontroller'))
    .config(require('./webshops.ngrouter'));

})();
