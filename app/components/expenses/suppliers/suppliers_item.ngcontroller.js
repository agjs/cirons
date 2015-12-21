(function() {
  'use strict';
  module.exports = suppliersSingleItemController;

  function suppliersSingleItemController($scope, $stateParams, suppliersFactory) {
    $scope.supplier = $stateParams.supplier;
    $scope.id = $stateParams.id;


    if (!$scope.supplier) {
      suppliersFactory.getSupplier($scope.id).then(function(item) {
        $scope.supplier = item;
      });
    }

  }

  suppliersSingleItemController.$inject = ['$scope', '$stateParams', 'suppliersFactory'];

})();
