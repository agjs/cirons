(function() {
  'use strict';
  module.exports = contactsController;

  function contactsController($scope, $rootScope, $auth, contactsFactory, $state) {

    contactsFactory.getContacts().then(function(contacts) {
      $scope.contacts = contacts;
      $scope.cardCounter = contacts.length;
    });

  }

  contactsController.$inject = ['$scope', '$rootScope', '$auth', 'contactsFactory', '$state'];

})();
