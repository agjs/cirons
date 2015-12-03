(function () {
    "use strict";

    angular.module('CIRONS-MAIN-APP').config(function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise("/dashboard");
        $stateProvider

            .state('login', {
                url: "/login",
                controller: 'loginController',
                templateUrl: "components/authentication/login/login.view.html"
            })

    });


})();
