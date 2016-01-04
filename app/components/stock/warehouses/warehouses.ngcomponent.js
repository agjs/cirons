(function() {
  "use strict";

  angular.module('CIRONS-MAIN-APP')
    .controller('warehousesController', require('./warehouses.ngcontroller'))
    .controller('warehousesCRUDController', require('./warehouses_crud.ngcontroller'))
    .controller('warehousesSingleItemController', require('./warehouses_item.ngcontroller'))
    .factory('warehousesFactory', require('./warehouses.ngfactory'))
    .factory('stocksFactory', require('./stocks.ngfactory'))
    .config(require('./warehouses.ngrouter'));

})();
