(function () {
    "use strict";

    angular.module('CIRONS-MAIN-APP').controller('suppliersCRUDController', function ($scope, $stateParams, expensesFactory) {

        $scope.addSupplier = function () {
            expensesFactory.addSupplier($scope.company_name).then(function (added) {
                $scope.expenses.push(added);
            });
        };

        $scope.removeSupplier = function () {
            expensesFactory.removeSupplier($stateParams.id).then(function (removed) {
                console.log('supplier with id ' + $stateParams.id + '  removed!');
            });
        };

        $scope.editSupplier = function (companyName) {
            expensesFactory.editSupplier($stateParams.id, companyName).then(function (edited) {
                console.log(edited);
                console.log('supplier with id ' + $stateParams.id + '  edited!');
            });
        };


    });

})();
