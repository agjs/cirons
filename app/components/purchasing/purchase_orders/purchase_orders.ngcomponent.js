(function() {
  "use strict";

  angular.module('CIRONS-MAIN-APP')
    .controller('purchaseOrdersController', require('./purchase_orders.ngcontroller'))
    .controller('purchaseOrdersCRUDController', require('./purchase_orders_crud.ngcontroller'))
    .controller('purchaseOrdersSingleItemController', require('./purchase_orders_item.ngcontroller'))
    .factory('purchaseOrdersFactory', require('./purchase_orders.ngfactory'))
    .config(require('./purchase_orders.ngrouter'));

})();
