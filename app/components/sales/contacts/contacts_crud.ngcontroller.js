(function() {
  'use strict';
  module.exports = contactsCRUDController;

  function contactsCRUDController($scope, $stateParams, contactsFactory, lodash) {

    $scope.addContact = function() {
      contactsFactory.addContact($scope.contact).then(function(added) {
        $scope.contacts.push(added);
      });
    };

    $scope.removeContact = function() {
      contactsFactory.removeContact($stateParams.id);
    };

    $scope.editContact = function(data) {
      contactsFactory.editContact($stateParams.id, data).then(function(edited) {

        var findItem = lodash.find($scope.contacts, function(arg) {
          return arg.id === $stateParams.id;
        });

        if (findItem) {
          findItem = edited;
        }

      });
    };

  }

  contactsCRUDController.$inject = ['$scope', '$stateParams', 'contactsFactory', 'lodash'];

})();
