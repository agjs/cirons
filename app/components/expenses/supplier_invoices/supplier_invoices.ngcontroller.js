(function() {
  'use strict';
  module.exports = supplierInvoicesController;

  function supplierInvoicesController($scope, $rootScope, $auth, supplierInvoicesFactory, $state, $filter) {

    supplierInvoicesFactory.getSupplierInvoices().then(function(supplierInvoices) {
      $scope.supplierInvoices = supplierInvoices;
    });

    $scope.search = {
        paid: '',
        supplier: {
            company_name: ''
        }
    };

    $scope.orderByKey = "id";
    $scope.orderByReverse = true;

    $scope.filtered = function(){
        var items = $scope.supplierInvoices;

        if($scope.dateStart){
            items = $filter('dateRange')(items, 'date', $scope.dateStart, $scope.dateEnd);
        }
        return items;
    };

  }

  supplierInvoicesController.$inject = ['$scope', '$rootScope', '$auth', 'supplierInvoicesFactory', '$state', '$filter'];

})();
