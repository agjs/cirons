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

    meFactory.promise().then(function(user) {
      $scope.user = user;
    });


  }

  navigationController.$inject = ['$scope', '$rootScope', '$auth', '$state', 'meFactory'];

})();
