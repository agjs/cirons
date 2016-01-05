(function() {
  'use strict';
  module.exports = contactsSingleItemController;

  function contactsSingleItemController($scope, $stateParams, contactsFactory, lodash) {
    $scope.contact = $stateParams.contact;
    $scope.id = $stateParams.id;


    if (!$scope.contact) {
      contactsFactory.getContact($scope.id).then(function(item) {
        $scope.contact = item;
      });
    }

    $scope.saveContact = function(){
        contactsFactory.editContact($scope.id, $scope.contact).then(function(contact){
            var findItem = lodash.find($scope.contacts, function(arg) {
              return arg.id === $stateParams.id;
            });
            if (findItem) {
              findItem = contact;
            }
        });
    };

  }

  contactsSingleItemController.$inject = ['$scope', '$stateParams', 'contactsFactory', 'lodash'];

})();
