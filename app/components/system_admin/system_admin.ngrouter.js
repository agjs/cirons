(function() {
  'use strict';
  module.exports = stockRouter;

  function stockRouter($stateProvider) {
    $stateProvider
    .state('system_admin', {
        url: "/system_admin",
        controller: 'hrController',
        templateUrl: "components/system_admin/system_admin.view.html",

    })


  }

  stockRouter.$inject = ['$stateProvider'];

})();
