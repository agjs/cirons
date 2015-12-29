(function() {
  'use strict';
  module.exports = invoicesController;

  function invoicesController($scope, $rootScope, $auth, invoicesFactory, $state) {

    invoicesFactory.getInvoices().then(function(invoices) {
      $scope.invoices = invoices;
    });



  }

  invoicesController.$inject = ['$scope', '$rootScope', '$auth', 'invoicesFactory', '$state'];

})();
