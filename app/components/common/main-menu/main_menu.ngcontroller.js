(function() {
  'use strict';
  module.exports = mainMenuController;

  function mainMenuController($scope) {
    $scope.logoUrl = 'assets/images/logo.png';
    $scope.menu = [{
      title: 'Dashboard',
      state: 'dashboard',
      separateAfter: true,
      icon: 'fa fa-line-chart'
    }, {
      title: 'Calendar',
      state: 'calendar',
      separateAfter: true,
      icon: 'fa fa-calendar'
    }, {
      title: 'Sales',
      state: 'sales',
      separateAfter: false,
      icon: 'fa fa-file-text-o'
    }, {
      title: 'Expenses',
      state: 'expenses',
      separateAfter: false,
      icon: 'fa fa-minus-square-o'
    }, {
      title: 'Stock',
      state: 'stock',
      separateAfter: false,
      icon: 'fa fa-cubes'
    }, {
      title: 'Purchasing',
      state: 'purchasing',
      separateAfter: false,
      icon: 'fa fa-cart-plus'
    }, {
      title: 'HR',
      state: 'hr',
      separateAfter: true,
      icon: 'fa fa-users'
    }, {
      title: 'Accounting',
      state: 'accounting',
      separateAfter: true,
      icon: 'fa fa-book'
    }, {
      title: 'System Admin',
      state: 'system_admin',
      separateAfter: false,
      icon: 'fa fa-cogs'
    }];

  }

  mainMenuController.$inject = ['$scope'];

})();
