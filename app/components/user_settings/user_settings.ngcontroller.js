(function() {
  'use strict';
  module.exports = userSettingsController;

  function userSettingsController($scope, userSettingsFactory, meFactory) {

    meFactory.async().then(function(user) {
      $scope.user = user.data;
    });


    $scope.updateUser = function() {

      userSettingsFactory.edit({
        username: $scope.username,
        first_name: $scope.first_name,
        last_name: $scope.last_name,
        job_title: $scope.job_title,
        email: $scope.email
      });

    }
  }
  userSettingsController.$inject = ['$scope', 'userSettingsFactory', 'meFactory'];
})();
