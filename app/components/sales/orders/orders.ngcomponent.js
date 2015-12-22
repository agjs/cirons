(function() {
  "use strict";

  angular.module('CIRONS-MAIN-APP')
    .controller('ordersController', require('./orders.ngcontroller'))
    .factory('ordersFactory', require('./orders.ngfactory'));

})();
