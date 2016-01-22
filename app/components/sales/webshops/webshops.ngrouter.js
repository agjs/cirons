(function() {
    'use strict';
    module.exports = webshopsRouter;

    function webshopsRouter($stateProvider) {
        $stateProvider
            .state('webshops', {
                url: "/sales/webshops",

                ncyBreadcrumb: {
                    label: 'Webshops',
                    parent: 'sales',
                },
                views: {
                    '': {
                        templateUrl: 'components/sales/webshops/webshops.view.html',
                        controller: 'webshopsController'
                    }
                }
            })

    }

    webshopsRouter.$inject = ['$stateProvider'];

})();
