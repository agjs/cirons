(function() {
    "use strict";

    module.exports = ngConfig;

    function ngConfig($httpProvider, $urlRouterProvider, $locationProvider, $authProvider, $breadcrumbProvider, cfpLoadingBarProvider) {

        function detectmob() {
            if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {
                return true;
            } else {
                return false;
            }
        }

        var client;
        var matcher = window.location.href.match(/http[s]?:\/\/app[a-z\-]*\.cirons\.com\/client\/([a-zA-Z]+)\/.*/);
        if(matcher && matcher.length && matcher[1]){
            client = matcher[1];
        }
        console.log("client: " + client);
        console.info("client: ", client, matcher);

        cfpLoadingBarProvider.includeSpinner = false;

        $httpProvider.interceptors.push('authenticationInterceptor');

        $httpProvider.interceptors.push(function($q){
            return {
                request: function(config){

                    if(config.url.substring(0,5) == "/api/" && client){
                        config.url = "https://system-migrate.cirons.com/" + client + config.url;
                    }

                    return config;
                }
            };
        });

        $httpProvider.interceptors.push(function($q) {
            return {
                response: function(response) {
                    if (response.data && response.data.validation_error) {
                        for (var key in response.data.validation_error) {
                            var errors = response.data.validation_error[key];
                            for (var ii = 0; ii < errors.length; ii++) {
                                var error = errors[ii];
                                alert(error);
                            }
                        }
                        return $q.reject(response);
                    }

                    return response;
                }
            };
        });

        console.log("is mobile:");
        console.log(detectmob());

        if (!detectmob()) {
            $urlRouterProvider.otherwise('/dashboard/finance');
        } else {
            $urlRouterProvider.otherwise('/touch');
        }

        $locationProvider.html5Mode(false);

        $authProvider.loginUrl = 'http://janalex.beta.cirons.com/api/v1/auth';
        $breadcrumbProvider.setOptions({
            template: 'bootstrap3'
        });


    }

    ngConfig.$inject = ['$httpProvider', '$urlRouterProvider', '$locationProvider', '$authProvider', '$breadcrumbProvider', 'cfpLoadingBarProvider'];

})();
