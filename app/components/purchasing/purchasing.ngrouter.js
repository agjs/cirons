(function () {
    "use strict";

    angular.module('CIRONS-MAIN-APP').config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('purchasing', {
                url: "/purchasing",
                controller: 'purchasingController',
                templateUrl: "components/purchasing/purchasing.view.html",
                
            })


    });
})();
