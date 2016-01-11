(function() {
  'use strict';
  module.exports = mainController;

  function mainController($scope, $auth, $state, settingsFactory) {
    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };

    $scope.settings = [];
    settingsFactory.initSettings().then(function(settings) {
      $scope.settings = settings;
    });

    

  }

  mainController.$inject = ['$scope', '$auth', '$state', 'settingsFactory'];

})();
