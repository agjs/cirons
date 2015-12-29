(function() {
  "use strict";

  angular.module('CIRONS-MAIN-APP')
    .controller('ordersController', require('./orders.ngcontroller'))
    .controller('ordersCRUDController', require('./orders_crud.ngcontroller'))
    .controller('ordersSingleItemController', require('./orders_item.ngcontroller'))
    .factory('ordersFactory', require('./orders.ngfactory'))
    .factory('orderRowsFactory', require('./order_rows.ngfactory'))
    .config(require('./orders.ngrouter'));

})();
