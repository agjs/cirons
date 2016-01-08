(function() {
  "use strict";

  angular.module('CIRONS-MAIN-APP')
    .controller('usersController', require('./users.ngcontroller'))
    .controller('usersCRUDController', require('./users_crud.ngcontroller'))
    .controller('usersSingleItemController', require('./users_item.ngcontroller'))
    .factory('usersFactory', require('./users.ngfactory'))
    .config(require('./users.ngrouter'));

})();
