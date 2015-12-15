(function(){
"use strict";

angular.module('CIRONS-MAIN-APP')
    .controller('expensesController', require('./expenses.ngcontroller'))
    .controller('suppliersController', require('./suppliers/suppliers.ngcontroller'))
    .controller('suppliersCRUDController', require('./suppliers/suppliers_crud.ngcontroller'))
    .controller('suppliersSingleItemController', require('./suppliers/suppliers_item.ngcontroller'))
    .controller('suppliersListController', require('./suppliers/suppliers_list.ngcontroller'))
    .factory('expensesFactory', require('./expenses.ngfactory'))
    .config(require('./expenses.ngrouter'));

})();
