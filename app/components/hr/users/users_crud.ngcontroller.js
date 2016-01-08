(function() {
  'use strict';
  module.exports = usersCRUDController;

  function usersCRUDController($scope, $stateParams, usersFactory, lodash, $state) {

    $scope.alerts = [];
    $scope.user = {};

    $scope.addUser = function() {
      usersFactory.addUser($scope.user).then(function(added) {
        $scope.users.unshift(added);
        $state.go('users.item', {id: added.id, user: added});
      });
    };

    

  }

  usersCRUDController.$inject = ['$scope', '$stateParams', 'usersFactory', 'lodash', '$state'];

})();
