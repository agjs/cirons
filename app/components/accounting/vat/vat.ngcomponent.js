(function() {
  "use strict";

  angular.module('CIRONS-MAIN-APP')
    .controller('VATController', require('./vat.ngcontroller'))
    .controller('VATItemsController', require('./vat_items.ngcontroller'))

    .controller('VATDeclarationsCreateController', require('./declaration/create.ngcontroller'))

    .factory('VATFactory', require('./vat.ngfactory'))
    .factory('VATDeclarationsFactory', require('./declaration/vat_declarations.ngfactory'))
    .config(require('./vat.ngrouter'));

})();
