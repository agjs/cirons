(function () {
    "use strict";

    angular.module('CIRONS-MAIN-APP').run(function ($rootScope, $state, meFactory) {


            $rootScope.$on('$stateChangeSuccess',
                function (event, toState, toParams, fromState, fromParams) {
                    $rootScope.currentState = toState;

                }
            );

            meFactory.get().then(function (user) {
                $rootScope.loggedIn = user;
            });


        }
    );

})();

