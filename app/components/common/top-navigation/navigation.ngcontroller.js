(function() {
  'use strict';
  module.exports = navigationController;

  function navigationController($scope, $rootScope, $auth, $state, meFactory) {
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

    meFactory.async().then(function(user) {
      $scope.user = user.data;
    });

  }

  navigationController.$inject = ['$scope', '$rootScope', '$auth', '$state', 'meFactory'];

})();
