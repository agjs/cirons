(function() {
  'use strict';
  module.exports = contactsCRUDController;

  function contactsCRUDController($scope, $stateParams, contactsFactory, lodash, $state) {

    $scope.contact = {};

    $scope.addContact = function() {
      contactsFactory.addContact($scope.contact).then(function(added) {
        $scope.contacts.unshift(added);
        $state.go("contacts.item", {id: added.id, contact: added});
      });
    };

    $scope.cancel = function(){
        $state.go("contacts");
    };

  }

  contactsCRUDController.$inject = ['$scope', '$stateParams', 'contactsFactory', 'lodash', '$state'];

})();
