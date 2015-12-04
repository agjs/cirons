(function () {
    "use strict";

    angular.module('CIRONS-MAIN-APP')
        .controller('suppliersListController', function ($scope, $state) {

            $scope.currentState = function () {
                console.log($state.current);
                return $state.current.name;
            };


        });
})();

