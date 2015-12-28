(function() {
  'use strict';
  module.exports = ordersSingleItemController;

  function ordersSingleItemController($scope, $stateParams, ordersFactory) {
    $scope.order = $stateParams.order;
    $scope.id = $stateParams.id;


    if (!$scope.order) {
      ordersFactory.getOrder($scope.id).then(function(item) {
        $scope.order = item;
      });
    }

  }

  ordersSingleItemController.$inject = ['$scope', '$stateParams', 'ordersFactory'];

})();
