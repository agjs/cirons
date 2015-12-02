(function () {
    "use strict";

    angular.module('CIRONS-MAIN-APP')
        .controller('navigationController', function ($scope, $rootScope) {

            $rootScope.$watch('currentState', function(newValue, oldValue) {
                $scope.title = newValue.name;
            });


        });

})();

