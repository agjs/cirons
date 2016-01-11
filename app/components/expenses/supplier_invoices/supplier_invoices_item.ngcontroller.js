(function() {
  'use strict';
  module.exports = supplierInvoicesSingleItemController;

  function supplierInvoicesSingleItemController($scope, $stateParams, supplierInvoicesFactory) {
    $scope.supplierInvoice = $stateParams.supplierInvoice;
    $scope.id = $stateParams.id;


    if (!$scope.supplierInvoice) {
      supplierInvoicesFactory.getSupplierInvoice($scope.id).then(function(item) {
        $scope.supplierInvoice = item;
      });
    }

  }

  supplierInvoicesSingleItemController.$inject = ['$scope', '$stateParams', 'supplierInvoicesFactory'];

})();
