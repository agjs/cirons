(function() {
  'use strict';
  module.exports = mainController;

  function mainController($scope, $auth, $state) {
    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };

    

  }

  mainController.$inject = ['$scope', '$auth', '$state'];

})();
