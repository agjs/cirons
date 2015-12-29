(function() {
  "use strict";

  angular.module('CIRONS-MAIN-APP')
    .controller('productsController', require('./products.ngcontroller'))
    .controller('productsCRUDController', require('./products_crud.ngcontroller'))
    .controller('productsSingleItemController', require('./products_item.ngcontroller'))
    .factory('productsFactory', require('./products.ngfactory'))
    .config(require('./products.ngrouter'));

})();
