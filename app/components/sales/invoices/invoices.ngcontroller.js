(function() {
  'use strict';
  module.exports = invoicesController;

  function invoicesController($scope, $rootScope, $auth, invoicesFactory, $state, infoFactory, $filter) {

    invoicesFactory.getInvoices().then(function(invoices) {
      $scope.invoices = invoices;
      for(var i = 0; i < $scope.invoices.length; i++){
          $scope.invoices[i].invoice_no = parseInt($scope.invoices[i].invoice_no);
          $scope.invoices[i].date = new Date($scope.invoices[i].date);
      }
    });

    $scope.search = {
        step: '',
        contact: {
            name: ''
        }
    };

    $scope.statuses = [];
    var statuses = infoFactory.statuses["Invoice"];
    for(var status in statuses){
        var s = statuses[status];
        s.step = status;
        $scope.statuses.push(s);
    }

    $scope.orderByKey = "invoice_no";
    $scope.orderByReverse = true;

    $scope.dateStart = null;
    $scope.dateEnd = null;

    $scope.filtered = function(){
        var items = $scope.invoices;

        if($scope.dateStart){
            items = $filter('dateRange')(items, 'date', $scope.dateStart, $scope.dateEnd);
        }

        return items;
    };

  }

  invoicesController.$inject = ['$scope', '$rootScope', '$auth', 'invoicesFactory', '$state', 'infoFactory', '$filter'];

})();
