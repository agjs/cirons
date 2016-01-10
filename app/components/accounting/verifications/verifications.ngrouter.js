(function() {
  'use strict';
  module.exports = verificationsRouter;

  function verificationsRouter($stateProvider) {
    $stateProvider
      .state('verifications', {
        url: "/accounting/verifications",

        ncyBreadcrumb: {
          label: 'Verifications',
          parent: 'accounting',
        },
        views: {
          '': {
            templateUrl: 'components/accounting/verifications/verifications.view.html',
            controller: 'verificationsController'
          }
        }
      })

  }

  verificationsRouter.$inject = ['$stateProvider'];

})();
