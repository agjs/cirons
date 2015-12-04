(function () {
    "use strict";

    angular.module('CIRONS-MAIN-APP').controller('suppliersCRUDController', function ($scope, $stateParams, expensesFactory) {

        $scope.addSupplier = function () {
            expensesFactory.addSupplier($scope.company_name).then(function (added) {
                $scope.expenses.push(added);
            });
        };

        $scope.removeSupplier = function () {
            expensesFactory.removeSupplier($stateParams.id);
        };

        $scope.editSupplier = function (companyName) {
            expensesFactory.editSupplier($stateParams.id, companyName).then(function (edited) {

                var findItem = _.find($scope.expenses, function (arg) {
                    return arg.id === $stateParams.id;
                });

                if (findItem) {
                    findItem.company_name = edited.company_name;
                }


            });
        };


    });

})();
