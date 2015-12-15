(function () {
    "use strict";

    angular.module('CIRONS-MAIN-APP').config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider

            .state('stock', {
                url: "/stock",
                controller: 'stockController',
                templateUrl: "components/stock/stock.view.html",
                
            })


    });


})();
