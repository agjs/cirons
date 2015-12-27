(function() {
  'use strict';
  module.exports = dashboardController;

  function dashboardController($scope, $filter, dashboardFactory) {

      $scope.expenses_bar_currentData = [];
      $scope.expenses_bar_currentColumns = [
          { "id": "variable", "type": "bar", "name": "Variable", "color": "#F2C61F" },
          { "id": "fixed", "type": "bar", "name": "Fixed", "color": "#FF8200" },
          { "id": "receipts", "type": "bar", "name": "Receipts", "color": "#E07B53" },
          { "id": "sales", "type": "bar", "name": "Sales", "color": "#66bb6a" }
      ];
      $scope.expenses_bar_currentX = {"id": "x"};

    dashboardFactory.getDashboardData().then(function(data) {
      $scope.dashboardData = data;
      $scope.dashboardData.due_invoices_mini.total = $filter('currency')(data.due_invoices_mini.total, '', 0);
      $scope.dashboardData.turnover_this_month_mini.total = $filter('currency')(data.turnover_this_month_mini.total, '', 0);
      $scope.dashboardData.growth_mini = $filter('number')(data.growth_mini, 0) + '%';

      for(var i = 0; i < data.expenses_bar_current.months.length; i++){
          var month = data.expenses_bar_current.months[i];
          var fixed = parseFloat(data.expenses_bar_current.fixed[i]);
          var receipts = parseFloat(data.expenses_bar_current.rec[i]);
          var sales = parseFloat(data.expenses_bar_current.sales[i]);
          var variable = parseFloat(data.expenses_bar_current.supp[i]);

          $scope.expenses_bar_currentData.push({
              "x": month,
              "variable": variable,
              "fixed": fixed,
              "receipts": receipts,
              "sales": sales
          });
      }
      console.log($scope.expenses_bar_currentData);
    });
  }

  dashboardController.$inject = ['$scope', '$filter', 'dashboardFactory'];

})();
