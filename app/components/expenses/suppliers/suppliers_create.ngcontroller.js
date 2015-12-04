(function () {
    "use strict";

    angular.module('CIRONS-MAIN-APP').controller('suppliersCreateController', function ($scope, $stateParams, expensesFactory) {

        $scope.addSupplier = function () {
            expensesFactory.addSupplier($scope.company_name).then(function (added) {
                $scope.expenses.push(added.data);
            });
        }

    });

})();
