(function () {
    "use strict";

    angular.module('CIRONS-MAIN-APP').config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('system_admin', {
                url: "/system_admin",
                controller: 'hrController',
                templateUrl: "components/system_admin/system_admin.view.html"
            })


    });
})();


