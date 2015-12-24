(function() {
  'use strict';
  module.exports = dashboardFinanceController;

  function dashboardFinanceController($scope, dashboardFactory) {



    dashboardFactory.getDashboardData().then(function(data){
      $scope.dashboardData = data;
    })

  }

  dashboardFinanceController.$inject = ['$scope', 'dashboardFactory'];

})();
