(function () {
    "use strict";

    angular.module('CIRONS-MAIN-APP')
        .controller('expensesController', function ($scope, expensesFactory, $state) {

            expensesFactory.getSuppliers().then(function(expenses){
               $scope.expenses = expenses.data.length;
            });

        });

})();

