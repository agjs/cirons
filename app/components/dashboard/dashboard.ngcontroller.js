(function() {
  'use strict';
  module.exports = dashboardController;

  function dashboardController($scope, $filter, dashboardFactory, productsFactory) {

    //START PRODUCT STOCK
    $scope.input = {
      stock: ""
    };
    $scope.productStockItems = [];
    $scope.productStockItemsFilter = function() {
      console.log("filter products: " + $scope.input.stock);
      productsFactory.getProductStockFilters($scope.input.stock).then(function(data) {
        $scope.productStockItems = data;
      });
    };
    productsFactory.getProductStockFilters("").then(function(data) {
      $scope.productStockItems = data;
    });

    $scope.daysUntil = function(date){
        var date = new Date(date);
        var today = new Date();

        var m = moment(date);
        var mt = moment(today);
        var diff = m.diff(mt, 'days');

        return diff;
    };
    //END PRODUCT STOCK

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

    //START REGISTER EXPENSES PIE
    $scope.expensesPieData = [];
    $scope.expensesPieColumns = [];
    //END REGISTER EXPENSES PIE

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

    //START REGISTER TOP CUSTOMERS PIE
    $scope.topCustomersData = [];
    $scope.topCustomersColumns = [];
    //END REGISTER TOP CUSTOMERS PIE

    //START SUPPLIERS TOP CUSTOMERS PIE
    $scope.topSuppliersData = [];
    $scope.topSuppliersColumns = [];
    //END SUPPLIERS TOP CUSTOMERS PIE


    /*
    GET DASHBOARD DATA.
    Returns: Object of data
    */
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
      $scope.isActive = false;
      $scope.activeButton = function() {
          $scope.isActive = !$scope.isActive;
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

      //START EXPENSES PIE
      var expenses_data = [];
      for (var i = 0; i < data.expenses_pie_breakdown.length; i++) {
        var expense = data.expenses_pie_breakdown[i];
        $scope.expensesPieColumns.push({
          id: expense[0],
          name: expense[0],
          type: "pie"
        });

        expenses_data[expense[0]] = expense[1];
      }
      $scope.expensesPieData.push(expenses_data);
      //END EXPENSES PIE

      //START TOP SUPPLIERS PIE
      var suppliers_data = [];
      for (var i = 0; i < data.top_suppliers.length; i++) {
        var supplier = data.top_suppliers[i];
        $scope.topSuppliersColumns.push({
          id: "supplier" + i,
          type: "pie",
          name: supplier.company_name
        });
        suppliers_data["supplier" + i] = supplier.total;
      }
      $scope.topSuppliersData.push(suppliers_data);
      //END TOP SUPPLIERS PIE

      //START TOP PRODUCT PIE
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
      //START TOP CUSTOMERS PIE
      var customer_data = {};
      for (var i = 0; i < data.top_customers.length; i++) {
        var contact = data.top_customers[i];
        $scope.topCustomersColumns.push({
          id: "customer" + i,
          type: "pie",
          name: contact.name
        });
        customer_data["customer" + i] = contact.invoiced;
      }
      $scope.topCustomersData.push(customer_data);
      //END TOP CUSTOMERS PIE


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

      $(window).trigger('resize');

    });
  }

  dashboardController.$inject = ['$scope', '$filter', 'dashboardFactory', 'productsFactory'];

})();
