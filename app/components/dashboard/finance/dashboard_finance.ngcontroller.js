(function() {
  'use strict';
  module.exports = dashboardFinanceController;

  function dashboardFinanceController($scope, $filter, dashboardFactory) {



    dashboardFactory.getDashboardData().then(function(data){
      console.log(data);
      $scope.dashboardData = data;
      $scope.dashboardData.due_invoices_mini.total = $filter('currency')(data.due_invoices_mini.total,  '', 0);
      $scope.dashboardData.turnover_this_month_mini.total = $filter('currency')(data.turnover_this_month_mini.total, '', 0);







    })

  }

  dashboardFinanceController.$inject = ['$scope', '$filter', 'dashboardFactory'];

})();
