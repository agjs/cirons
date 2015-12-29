(function() {
  "use strict";

  angular.module('CIRONS-MAIN-APP')
    .controller('contactsController', require('./contacts.ngcontroller'))
    .controller('contactsCRUDController', require('./contacts_crud.ngcontroller'))
    .controller('contactsSingleItemController', require('./contacts_item.ngcontroller'))
    .factory('contactsFactory', require('./contacts.ngfactory'))
    .config(require('./contacts.ngrouter'));

})();
