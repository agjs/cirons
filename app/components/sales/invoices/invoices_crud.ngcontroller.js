(function() {
  'use strict';
  module.exports = invoicesCRUDController;

  function invoicesCRUDController($scope, $stateParams, invoicesFactory, lodash) {

    $scope.addInvoice = function() {
      invoicesFactory.addInvoice($scope.invoice).then(function(added) {
        $scope.invoices.push(added);
      });
    };

    $scope.removeInvoice = function() {
      invoicesFactory.removeInvoice($stateParams.id);
    };

    $scope.editInvoice = function(data) {
      invoicesFactory.editInvoice($stateParams.id, data).then(function(edited) {

        var findItem = lodash.find($scope.invoices, function(arg) {
          return arg.id === $stateParams.id;
        });

        if (findItem) {
          findItem = edited;
        }

      });
    };

  }

  invoicesCRUDController.$inject = ['$scope', '$stateParams', 'invoicesFactory', 'lodash'];

})();
