(function() {
  'use strict';
  module.exports = hrController;

  function hrController($scope, usersFactory) {
      $scope.usersCount = 0;

      usersFactory.getUsers().then(function(users){
          $scope.usersCount = users.length;
      });

  }

  hrController.$inject = ['$scope', 'usersFactory'];

})();
