(function () {
    "use strict";

    angular.module('CIRONS-MAIN-APP').run(['$rootScope', '$state',
        function ($rootScope, $state) {


            $rootScope.$on('$stateChangeSuccess',
                function (event, toState, toParams, fromState, fromParams) {
                    $rootScope.currentState = toState;

                }
            );


        }
    ]);

})();

