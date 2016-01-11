(function() {
  'use strict';
  module.exports = supplierInvoicesController;

  function supplierInvoicesController($scope, $rootScope, $auth, supplierInvoicesFactory, $state) {

    supplierInvoicesFactory.getSupplierInvoices().then(function(supplierInvoices) {
      $scope.supplierInvoices = supplierInvoices;
    });



  }

  supplierInvoicesController.$inject = ['$scope', '$rootScope', '$auth', 'supplierInvoicesFactory', '$state'];

})();
