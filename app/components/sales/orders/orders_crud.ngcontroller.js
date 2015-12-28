(function() {
  'use strict';
  module.exports = ordersCRUDController;

  function ordersCRUDController($scope, $stateParams, ordersFactory, lodash) {

    $scope.addOrder = function() {
      ordersFactory.addOrder($scope.order).then(function(added) {
        $scope.orders.push(added);
      });
    };

    $scope.removeOrder = function() {
      ordersFactory.removeOrder($stateParams.id);
    };

    $scope.editOrder = function(data) {
      ordersFactory.editOrder($stateParams.id, data).then(function(edited) {

        var findItem = lodash.find($scope.orders, function(arg) {
          return arg.id === $stateParams.id;
        });

        if (findItem) {
          findItem = edited;
        }

      });
    };

  }

  ordersCRUDController.$inject = ['$scope', '$stateParams', 'ordersFactory', 'lodash'];

})();
