(function () {
    "use strict";

    angular.module('CIRONS-MAIN-APP').config(function ($stateProvider, $urlRouterProvider) {

        $stateProvider

            .state('calendar', {
                url: "/calendar",
                controller: 'calendarController',
                templateUrl: "components/calendar/calendar.view.html"
            })

    });


})();