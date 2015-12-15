(function() {
  'use strict';
  module.exports = suppliersSingleItemController;

  function suppliersSingleItemController($scope, $stateParams, expensesFactory) {
    $scope.supplier = $stateParams.supplier;
    $scope.id = $stateParams.id;


    if (!$scope.supplier) {
      expensesFactory.getSupplier($scope.id).then(function(item) {
        $scope.supplier = item;
      });
    }

  }

  suppliersSingleItemController.$inject = ['$scope', '$stateParams', 'expensesFactory'];

})();
