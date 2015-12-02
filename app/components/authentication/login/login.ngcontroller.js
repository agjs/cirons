/* global module */
(function () {
    'use strict';


    angular.module('CIRONS-MAIN-APP').controller('loginController', function ($scope, Auth, $location, $window) {
        $scope.user = {};
        $scope.errors = {};

        $scope.login = function (form) {
            $scope.submitted = true;

            if (form.$valid) {
                Auth.login({
                        email: $scope.user.email,
                        password: $scope.user.password
                    })
                    .then(function (data) {

                        $location.path('/');
                    })
                    .catch(function (err) {
                        $scope.errors.other = err.message;
                    });
            }
        };

        $scope.loginOauth = function (provider) {
            $window.location.href = '/auth/' + provider;
        };
    })


})();