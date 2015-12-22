(function() {
  "use strict";

  angular.module('CIRONS-MAIN-APP')
    .controller('contactsController', require('./contacts.ngcontroller'))
    .factory('contactsFactory', require('./contacts.ngfactory'));

})();
