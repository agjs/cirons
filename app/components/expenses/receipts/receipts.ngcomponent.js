(function() {
  "use strict";

  angular.module('CIRONS-MAIN-APP')
    .controller('receiptsController', require('./receipts.ngcontroller'))
    .controller('receiptsCRUDController', require('./receipts_crud.ngcontroller'))
    .factory('receiptsFactory', require('./receipts.ngfactory'))
    .config(require('./receipts.ngrouter'));

})();
