(function() {
  "use strict";

  angular.module('CIRONS-MAIN-APP')
    .controller('invoicesController', require('./invoices.ngcontroller'))
    .factory('invoicesFactory', require('./invoices.ngfactory'));

})();
