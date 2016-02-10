(function() {
  'use strict';
  module.exports = supplierInvoicesController;

  function supplierInvoicesController($scope, $rootScope, $auth, supplierInvoicesFactory, $state, $filter) {

    supplierInvoicesFactory.getSupplierInvoices().then(function(supplierInvoices) {
      $scope.supplierInvoices = supplierInvoices;
      for(var i = 0; i < $scope.supplierInvoices.length; i++){
          $scope.supplierInvoices[i].id = parseInt($scope.supplierInvoices[i].id);
          $scope.supplierInvoices[i].date = new Date($scope.supplierInvoices[i].date);
      }
    });

    $scope.search = {
        paid: '',
        supplier: {
            company_name: ''
        }
    };

    $scope.lastDate = null;
    $scope.newLastDate = function(date){
        $scope.lastDate = date;
        return true;
    };

    $scope.orderByKey = "date";
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
