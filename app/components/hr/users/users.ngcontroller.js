(function() {
  'use strict';
  module.exports = usersController;

  function usersController($scope, $rootScope, $auth, usersFactory, $state) {

    usersFactory.getUsers().then(function(users) {
      $scope.users = users;
    });



  }

  usersController.$inject = ['$scope', '$rootScope', '$auth', 'usersFactory', '$state'];

})();
