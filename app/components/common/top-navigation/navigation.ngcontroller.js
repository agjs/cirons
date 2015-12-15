(function() {
  'use strict';
  module.exports = navigationController;

  function navigationController($scope, $rootScope, $auth, $state) {
    $scope.iconMenu = [

      {
        icon: 'fa fa-bullhorn',
        state: ''
      }, {
        icon: 'fa fa-bell',
        state: ''
      }, {
        icon: 'fa fa-exclamation-triangle',
        state: ''
      }


    ];

    $scope.logout = function() {
      $auth.logout();
    };

  }

  navigationController.$inject = ['$scope', '$rootScope', '$auth', '$state'];

})();
