(function() {
  'use strict';
  module.exports = invoicesSingleItemController;

  function invoicesSingleItemController($scope, $stateParams, invoicesFactory) {
    $scope.invoice = $stateParams.invoice;
    $scope.id = $stateParams.id;


    if (!$scope.invoice) {
      invoicesFactory.getInvoice($scope.id).then(function(item) {
        $scope.invoice = item;
      });
    }

  }

  invoicesSingleItemController.$inject = ['$scope', '$stateParams', 'invoicesFactory'];

})();
