(function() {
  "use strict";

  angular.module('CIRONS-MAIN-APP')
    .controller('supplierInvoicesController', require('./supplier_invoices.ngcontroller'))
    .controller('supplierInvoicesCRUDController', require('./supplier_invoices_crud.ngcontroller'))
    .controller('supplierInvoicesSingleItemController', require('./supplier_invoices_item.ngcontroller'))
    .factory('supplierInvoicesFactory', require('./supplier_invoices.ngfactory'))
    .config(require('./supplier_invoices.ngrouter'));

})();
