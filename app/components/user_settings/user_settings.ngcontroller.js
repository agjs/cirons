(function() {
  'use strict';
  module.exports = userSettingsController;

  function userSettingsController($scope, userSettingsFactory, meFactory) {

    meFactory.async().then(function(user) {
      $scope.user = user.data;
    });

    $scope.updateUser = function() {
      userSettingsFactory.edit($scope.user);
    }
  }
  userSettingsController.$inject = ['$scope', 'userSettingsFactory', 'meFactory'];
})();

(function() {
  'use strict';
  module.exports = validationInterceptor;

  function validationInterceptor($stateProvider) {
    $stateProvider
      .state('hr', {
        url: "/hr",
        controller: 'hrController',
        templateUrl: "components/hr/hr.view.html",

      })


  }

  validationInterceptor.$inject = ['$stateProvider'];

})();
