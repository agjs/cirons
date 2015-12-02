(function () {
    "use strict";

    angular.module('CIRONS-MAIN-APP').config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider

            .state('sales', {
                url: "/sales",
                controller: '',
                controllerAs: '',
                templateUrl: "components/sales/sales.view.html"
            })


    });


})();
