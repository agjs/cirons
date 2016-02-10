(function() {
    'use strict';
    module.exports = receiptsController;

    function receiptsController($scope, $rootScope, $auth, receiptsFactory, $state) {

        var payment = ["Cash", "CC Company", "CC Private"];
        $scope.paymentMethods = payment;

        receiptsFactory.getReceipts().then(function(receipts) {
            $scope.receipts = receipts;
            $scope.cardCounter = receipts.length;

            for (var i = 0; i < $scope.receipts.length; i++) {
                $scope.receipts[i].id = parseInt($scope.receipts[i].id);
                $scope.receipts[i].date = new Date($scope.receipts[i].date);
                $scope.receipts[i].payment = payment[parseInt($scope.receipts[i].payment)];
            }
        });

        $scope.search = {

        };

        $scope.lastDate = null;
        $scope.newLastDate = function(date) {
            $scope.lastDate = date;
            return true;
        };

        $scope.orderByKey = "date";
        $scope.orderByReverse = true;

        $scope.filtered = function() {
            var items = $scope.receipts;

            if ($scope.dateStart) {
                items = $filter('dateRange')(items, 'date', $scope.dateStart, $scope.dateEnd);
            }
            return items;
        };

    }

    receiptsController.$inject = ['$scope', '$rootScope', '$auth', 'receiptsFactory', '$state'];

})();
