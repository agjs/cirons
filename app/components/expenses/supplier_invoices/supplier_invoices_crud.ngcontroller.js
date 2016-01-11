(function() {
  'use strict';
  module.exports = supplierInvoicesCRUDController;

  function supplierInvoicesCRUDController($scope, $stateParams, supplierInvoicesFactory, lodash) {

    $scope.addSupplierInvoice = function() {
      supplierInvoicesFactory.addSupplierInvoice($scope.supplierInvoice).then(function(added) {
        $scope.supplier_invoices.push(added);
      });
    };

    $scope.removeSupplierInvoice = function() {
      supplierInvoicesFactory.removeSupplierInvoice($stateParams.id);
    };

    $scope.editSupplierInvoice = function(data) {
      supplierInvoicesFactory.editSupplierInvoice($stateParams.id, data).then(function(edited) {

        var findItem = lodash.find($scope.supplier_invoices, function(arg) {
          return arg.id === $stateParams.id;
        });

        if (findItem) {
          findItem = edited;
        }

      });
    };

  }

  supplierInvoicesCRUDController.$inject = ['$scope', '$stateParams', 'supplierInvoicesFactory', 'lodash'];

})();
