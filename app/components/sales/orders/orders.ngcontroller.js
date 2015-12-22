(function() {
  'use strict';
  module.exports = ordersController;

  function ordersController($scope, $rootScope, $auth, ordersFactory, $state, $filter) {

    ordersFactory.getOrders().then(function(orders) {
      $scope.orders = orders;
    });

    ordersFactory.getPendingOrders().then(function(orders){
        $scope.pending = orders;
        $scope.cardCounter = orders.length;
    });

    ordersFactory.getPendingOrdersSum().then(function(data){
        $scope.pending_sum = data;
        $scope.cardSecondary = $filter('currency')(data, "SEK ", 2);
    });

  }

  ordersController.$inject = ['$scope', '$rootScope', '$auth', 'ordersFactory', '$state', '$filter'];

})();
