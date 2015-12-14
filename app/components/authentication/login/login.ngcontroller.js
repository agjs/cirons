(function() {

  'use strict';

  angular
    .module('CIRONS-MAIN-APP')
    .controller('loginController', function($scope, $auth, $state, $window, $location, authenticationFactory) {

      $scope.user = {};
      $scope.errors = {};

      $scope.login = function(form) {
        $scope.submitted = true;


        $auth.login({
            username: $scope.username,
            password: $scope.password
          })
          .then(function(data) {

            $location.path('/');
          })
          .catch(function(err) {
            $scope.errors.other = err.message;
          });

      };

      $scope.loginOauth = function(provider) {
        $window.location.href = '/auth/' + provider;
      };

    });

})();
