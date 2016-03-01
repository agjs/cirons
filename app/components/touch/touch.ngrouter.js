(function() {
    'use strict';
    module.exports = touchRouter;

    function touchRouter($stateProvider) {
        $stateProvider
            .state('touch', {
                url: "/touch",
                views: {
                    '@': {
                        controller: 'touchController',
                        templateUrl: "components/touch/touch.view.html"
                    }
                }
            })
            .state('touch.upload', {
                url: "/upload",
                views: {
                    '@': {
                        controller: 'uploadController',
                        templateUrl: "components/touch/upload.view.html"
                    }
                }
            })

    }

    touchRouter.$inject = ['$stateProvider'];

})();
