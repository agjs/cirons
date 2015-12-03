(function () {
    "use strict";

    angular.module('CIRONS-MAIN-APP').config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('hr', {
                url: "/hr",
                controller: 'hrController',
                templateUrl: "components/hr/hr.view.html"
            })


    });
})();


