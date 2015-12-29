(function() {
  "use strict";

  angular.module('CIRONS-MAIN-APP')
    .controller('invoicesController', require('./invoices.ngcontroller'))
    .controller('invoicesCRUDController', require('./invoices_crud.ngcontroller'))
    .controller('invoicesSingleItemController', require('./invoices_item.ngcontroller'))
    .factory('invoicesFactory', require('./invoices.ngfactory'))
    .config(require('./invoices.ngrouter'));

})();
