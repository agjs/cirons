(function() {
  'use strict';
  module.exports = dashboardFinanceController;

  function dashboardFinanceController($scope, dashboardFactory) {

    console.log('karina');

    dashboardFactory.getDashboardData().then(function(data){
      console.log(data);
    })

  }

  dashboardFinanceController.$inject = ['$scope', 'dashboardFactory'];

})();
