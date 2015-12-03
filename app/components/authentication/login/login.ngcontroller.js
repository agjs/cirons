(function() {

    'use strict';

    angular
        .module('CIRONS-MAIN-APP')
        .controller('loginController', function($scope, $auth, $state) {



        $scope.login = function() {

            var credentials = {
                username: $scope.username,
                password: $scope.password
            };

            // Use Satellizer's $auth service to login
            $auth.login(credentials).then(function(data) {

                // If login is successful, redirect to the users state

                $state.go('dashboard', {});

            });
        }

    });

})();