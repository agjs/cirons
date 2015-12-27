(function() {
  'use strict';
  module.exports = dashboardController;

  function dashboardController($scope, $filter, dashboardFactory) {

    //START REGISTER EXPENSES CHART
    $scope.expenses_bar_currentData = [{
      "non": 0,
      "days1": 0,
      "days2": 0,
      "days3": 0
    }];
    $scope.expenses_bar_currentColumns = [{
      "id": "variable",
      "type": "bar",
      "name": "Variable",
      "color": "#F2C61F"
    }, {
      "id": "fixed",
      "type": "bar",
      "name": "Fixed",
      "color": "#FF8200"
    }, {
      "id": "receipts",
      "type": "bar",
      "name": "Receipts",
      "color": "#E07B53"
    }, {
      "id": "sales",
      "type": "bar",
      "name": "Sales",
      "color": "#66bb6a"
    }];
    $scope.expenses_bar_currentX = {
      "id": "x"
    };
    //END REGISTER EXPENSES CHART


    //START REGISTER ACCOUNTS PAYABLE CHART
    $scope.accountsPayableData = [];
    $scope.accounts_payableColumns = [{
      id: "non",
      type: "pie",
      name: "Non-overdue",
      color: "#2185d0"
    }, {
      id: "days1",
      type: "pie",
      name: "Overdue > 10 days",
      color: "#fbbd08"
    }, {
      id: "days2",
      type: "pie",
      name: "Overdue 10 - 60 days",
      color: "#f2711c"
    }, {
      id: "days3",
      type: "pie",
      name: "Overdue 60+ days",
      color: "#db2828"
    }];
    //END REGISTER ACCOUNTS PAYABLE CHART


    //START REGISTER ACCOUNTS RECEIVABLE CHART
    $scope.accountsReceivableData = [];
    $scope.accounts_receivableColumns = [{
      id: "non",
      type: "pie",
      name: "Non-overdue",
      color: "#2185d0"
    }, {
      id: "days1",
      type: "pie",
      name: "Overdue > 10 days",
      color: "#fbbd08"
    }, {
      id: "days2",
      type: "pie",
      name: "Overdue 10 - 60 days",
      color: "#f2711c"
    }, {
      id: "days3",
      type: "pie",
      name: "Overdue 60+ days",
      color: "#db2828"
    }];
    //END REGISTER ACCOUNTS RECEIVABLE CHART


    //START REGISTER SALES OVERVIEW CHART
    $scope.salesOverviewData = [];
    $scope.salesOverviewColumns = [{
      id: "in",
      type: "area-spline",
      name: "Sales",
      color: "#66bb6a"
    }, {
      id: "out",
      type: "spline",
      name: "Earnings",
      color: "#E07B53"
    }];
    $scope.salesOverviewX = {
      id: "x"
    };
    //END REGISTER SALES OVERVIEW CHART


    //START REGISTER TOP PRODUCTS PIE
    $scope.topProductsData = [];
    $scope.topProductsColumns = [];
    //END REGISTER TOP PRODUCTS PIE


    //get dashboard data
    dashboardFactory.getDashboardData().then(function(data) {
      $scope.dashboardData = data;
      $scope.dashboardData.due_invoices_mini.total = $filter('currency')(data.due_invoices_mini.total, '', 0);
      $scope.dashboardData.turnover_this_month_mini.total = $filter('currency')(data.turnover_this_month_mini.total, '', 0);
      $scope.dashboardData.growth_mini = $filter('number')(data.growth_mini, 0) + '%';

      for (var i = 0; i < data.expenses_bar_current.months.length; i++) {
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

      //SALES OVERVIEW
      for (var i = 0; i < data.sales_overview.x.length; i++) {
        var x = data.sales_overview.x[i];
        var in_data = data.sales_overview.in[i];
        var out = data.sales_overview.out[i];

        $scope.salesOverviewData.push({
          "x": x,
          "in": in_data,
          "out": out
        });
      }

      //END SALES OVERVIEW


      //START TOP PRODUCT PIE
      //   $scope.topProductsData = [];
      //   $scope.topProductsColumns = [];
      var product_data = {};
      for (var i = 0; i < data.top_products.length; i++) {
        var product = data.top_products[i];
        $scope.topProductsColumns.push({
          id: "product" + i,
          type: "pie",
          name: product.product_name
        });
        product_data["product" + i] = product.sold;
      }
      $scope.topProductsData.push(product_data);
      //END TOP PRODUCT PIE


      $scope.accountsPayableData = [{
        "non": data.accounts_payable.array.non,
        "days1": data.accounts_payable.array.days1,
        "days2": data.accounts_payable.array.days2,
        "days3": data.accounts_payable.array.days3
      }];

      $scope.accountsPayableEntries = data.accounts_payable.array.non + data.accounts_payable.array.days1 + data.accounts_payable.array.days2 + data.accounts_payable.array.days3;

      $scope.accountsPayableNumbers = {
        non: [
          data.accounts_payable.array.non,
          Math.round(data.accounts_payable.array.non / $scope.accountsPayableEntries * 100 * 10) / 10
        ],
        days1: [
          data.accounts_payable.array.days1,
          Math.round(data.accounts_payable.array.days1 / $scope.accountsPayableEntries * 100 * 10) / 10
        ],
        days2: [
          data.accounts_payable.array.days2,
          Math.round(data.accounts_payable.array.days2 / $scope.accountsPayableEntries * 100 * 10) / 10
        ],
        days3: [
          data.accounts_payable.array.days3,
          Math.round(data.accounts_payable.array.days3 / $scope.accountsPayableEntries * 100 * 10) / 10
        ]
      };

      $scope.accountsReceivableData = [{
        "non": data.accounts_receivable.array.non,
        "days1": data.accounts_receivable.array.days1,
        "days2": data.accounts_receivable.array.days2,
        "days3": data.accounts_receivable.array.days3
      }];

      $scope.accountsReceivableEntries = data.accounts_receivable.array.non + data.accounts_receivable.array.days1 + data.accounts_receivable.array.days2 + data.accounts_receivable.array.days3;

      $scope.accountsReceivableNumbers = {
        non: [
          data.accounts_receivable.array.non,
          Math.round(data.accounts_receivable.array.non / $scope.accountsReceivableEntries * 100 * 10) / 10
        ],
        days1: [
          data.accounts_receivable.array.days1,
          Math.round(data.accounts_receivable.array.days1 / $scope.accountsReceivableEntries * 100 * 10) / 10
        ],
        days2: [
          data.accounts_receivable.array.days2,
          Math.round(data.accounts_receivable.array.days2 / $scope.accountsReceivableEntries * 100 * 10) / 10
        ],
        days3: [
          data.accounts_receivable.array.days3,
          Math.round(data.accounts_receivable.array.days3 / $scope.accountsReceivableEntries * 100 * 10) / 10
        ]
      };

      // window.onresize();

    });
  }

  dashboardController.$inject = ['$scope', '$filter', 'dashboardFactory'];

})();
