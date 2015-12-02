(function () {
    "use strict";

    angular.module('CIRONS-MAIN-APP')
        .controller('expensesController', function ($scope, expensesFactory) {

            expensesFactory.getSuppliers().then(function(expenses){
                console.log(expenses);
               $scope.expenses = expenses;
            });

        });

})();

