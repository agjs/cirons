(function() {
    'use strict';
    module.exports = settingsFactory;

    function settingsFactory($http, $q, $rootScope, $auth) {
        var settings = null;

        var modules = [];
        var cur, currency = null;

        return {

            initSettings: function() {
                return $http.get("http://janalex.beta.cirons.com/api/v1/settings").then(function(data) {
                    settings = data.data;
                    return data.data;
                });
            },
            startGetSettings: function() {
                return $http.get("http://janalex.beta.cirons.com/api/v1/settings").then(function(data) {
                    settings = data.data;

                    $rootScope.token = $auth.getToken();

                    if(!settings){
                        return false;
                    }

                    if(settings.default_currency){
                        cur, currency = settings.default_currency;
                    }

                    if(settings.modules){
                        modules = settings.modules;

                        var keys_array = {};
                        for(var i = 0; i < modules.length; i++){
                            var m = modules[i];
                            keys_array[m.key] = m;
                        }

                        $rootScope.s.module_keys = keys_array;

                    }

                    $rootScope.s.options = settings.options;
                    $rootScope.s.currencies = settings.currencies;
                    $rootScope.s.price_lists = settings.price_lists;
                    $rootScope.s.vat_rules = settings.vat_rules;
                    $rootScope.s.modules = settings.modules;
                    $rootScope.s.currency = currency;
                    $rootScope.s.cur = currency;
                    $rootScope.s.user = settings.user;
                    $rootScope.s.employees = settings.employees;
                    $rootScope.s.accounting = settings.accounting;
                    $rootScope.s.vat_periods = settings.vat_periods;

                    console.log($rootScope.s);

                    return data.data;
                });
            },
            getSettings: function() {
                return settings;
            }
        };

    }

    settingsFactory.$inject = ['$http', '$q', '$rootScope', '$auth'];

})();
