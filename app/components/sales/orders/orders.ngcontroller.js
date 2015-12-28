(function() {
  'use strict';
  module.exports = ordersController;

  function ordersController($scope, $rootScope, $auth, ordersFactory, $state) {

    ordersFactory.getOrders().then(function(orders) {
      $scope.orders = orders;
    });



  }

  ordersController.$inject = ['$scope', '$rootScope', '$auth', 'ordersFactory', '$state'];

})();
