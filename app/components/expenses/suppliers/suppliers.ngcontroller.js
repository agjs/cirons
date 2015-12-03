(function () {
    "use strict";

    angular.module('CIRONS-MAIN-APP')
        .controller('suppliersController', function ($scope, $rootScope, $auth, expensesFactory, $state) {

            expensesFactory.getSuppliers().then(function (expenses) {
                $scope.expenses = expenses.data;
            });

        });

})();

