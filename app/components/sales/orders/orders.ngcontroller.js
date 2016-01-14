(function() {
  'use strict';
  module.exports = ordersController;

  function ordersController($scope, $rootScope, $auth, ordersFactory, $state, infoFactory, $filter) {

    ordersFactory.getOrders().then(function(orders) {
      $scope.orders = orders;
      for(var i = 0; i < $scope.orders.length; i++){
          $scope.orders[i].id = parseInt($scope.orders[i].id);
          $scope.orders[i].date = new Date($scope.orders[i].date);
      }
    });

    $scope.search = {
        step: '',
        contact: {
            name: ''
        }
    };

    $scope.statuses = [];
    var statuses = infoFactory.statuses["Order"];
    for(var status in statuses){
        var s = statuses[status];
        s.step = status;
        $scope.statuses.push(s);
    }

    $scope.orderByKey = "id";
    $scope.orderByReverse = true;

    $scope.dateStart = null;
    $scope.dateEnd = null;

    $scope.filtered = function(){
        var items = $scope.orders;

        if($scope.dateStart){
            items = $filter('dateRange')(items, 'date', $scope.dateStart, $scope.dateEnd);
        }

        return items;
    };

  }

  ordersController.$inject = ['$scope', '$rootScope', '$auth', 'ordersFactory', '$state', 'infoFactory', '$filter'];

})();
