(function() {
  "use strict";

  angular.module('CIRONS-MAIN-APP')
    .controller('productsController', require('./products.ngcontroller'))
    .factory('productsFactory', require('./products.ngfactory'));

})();
