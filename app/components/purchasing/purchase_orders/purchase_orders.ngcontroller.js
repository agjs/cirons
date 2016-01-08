(function() {
  'use strict';
  module.exports = purchaseOrdersController;

  function purchaseOrdersController($scope, $rootScope, $auth, purchaseOrdersFactory, $state) {

    purchaseOrdersFactory.getPurchaseOrders().then(function(purchaseOrders) {
      $scope.purchaseOrders = purchaseOrders;
    });



  }

  purchaseOrdersController.$inject = ['$scope', '$rootScope', '$auth', 'purchaseOrdersFactory', '$state'];

})();
