(function () {
    "use strict";

    angular.module('CIRONS-MAIN-APP')
        .controller('expensesController', function ($scope, expensesFactory, $state) {

            expensesFactory.getSuppliers().then(function(expenses){
                $scope.cardType = 'Invoices';
                $scope.cardDescription = 'Manage your invoices';
                $scope.cardColor = 'red';
                $scope.cardIcon = 'building';
                $scope.cardCounter = expenses.length;
                $scope.cardState = 'suppliers';
            });

        });
})();

