(function() {
  'use strict';
  module.exports = purchasingController;

  function purchasingController($scope, purchaseOrdersFactory) {
      $scope.ordersCount = 0;

      purchaseOrdersFactory.getPurchaseOrders().then(function(orders){
          $scope.ordersCount = orders.length;
      });
  }

  purchasingController.$inject = ['$scope', 'purchaseOrdersFactory'];

})();
