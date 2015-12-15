(function() {
  'use strict';
  module.exports = hrRouter;

  function hrRouter($stateProvider) {
    $stateProvider
      .state('hr', {
        url: "/hr",
        controller: 'hrController',
        templateUrl: "components/hr/hr.view.html",

      })


  }

  hrRouter.$inject = ['$stateProvider'];

})();
