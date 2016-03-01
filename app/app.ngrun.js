(function() {
    "use strict";


    module.exports = ngRun;

    function ngRun($rootScope, $location, $state, meFactory, editableOptions, editableThemes, $auth, settingsFactory) {

        editableOptions.theme = 'default';

        function detectmob() {
            if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)) {
                return true;
            } else {
                return false;
            }
        }

        var client;
        var matcher = window.location.href.match(/http[s]?:\/\/app\.cirons\.com\/client\/([a-zA-Z]+)\/.*/);
        if(matcher && matcher.length && matcher[1]){
            client = matcher[1];
        }
        $rootScope.client = client;

        $rootScope.menu = [{
            title: 'Dashboard',
            state: 'dashboard.finance',
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
            module: "stock",
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

        $rootScope.token = null;
        $rootScope.s = {
            options: [],
            cur: null,
            currency: null,
            modules: null,
            module_keys: null,
            currencies: null,
            price_lists: null,
            vat_rules: null,
            vat_periods: null,
            accounting: false,
            user: {},
            touch: detectmob(),
            colors: [
                "#E4291E", // Fire Red
                "#C50F30", // Cerine
                "#F26C1C", // Flame Orange
                "#FF8F1A", // Orange
                "#FFB405"  // Yellow
            ],
            employees: [],

            get: function(key){
                if(!this.options || !this.options[key]){
                    return null;
                }

                var value = this.options[key];

                if(value == "0"){
                    return false;
                }

                return value;
            },
            o: function(key){
                return this.get(key);
            },
            hasModule: function(key){
                if(key == "" || key == null){
                    return true;
                }
                if(this.module_keys && this.module_keys[key]){
                    return true;
                }
                return false;
            },
            hasMod: function(key){
                return this.hasModule(key);
            }
        };

        $rootScope.$on('$stateChangeSuccess',
            function(event, toState, toParams, fromState, fromParams) {
                $rootScope.currentState = toState.name;
            }
        )

        console.log("checking token: "+location.hash);
        if (!$auth.isAuthenticated()) {
            //send to Cirons Accounts
            var prefix = "#/token";
            if(location.hash.substring(0,prefix.length) == prefix){
                var token = location.hash.substring(prefix.length).trim();

                $auth.setToken(token);
            }
        }

        var bypass = false;
        var fetching = false;
        $rootScope.$on('$stateChangeStart', function(event, toState, toParams) {

            if (bypass) return;

            if(fetching){
                event.preventDefault();
                return false;
            }

            console.log("no bypass");

            if (toState.name == 'login') {
                return;
            }

            event.preventDefault(); // Halt state change from even starting

            if (!$auth.isAuthenticated()) {
                //$location.path('/login');
                $state.go("login", {});
                return;
            }
            fetching = true;
            settingsFactory.startGetSettings().then(function(data) {
                console.log("settings fetched, allowing bypass");
                bypass = true; // bypass next call
                $state.go(toState, toParams);
            });

            // if (meetsRequirement) {  // Continue with the update and state transition if logic allows
            //     bypass = true;  // bypass next call
            //     $state.go(toState, toParams); // Continue with the initial state change
            // }
        });

        editableThemes['default'].submitTpl = '<button type="submit">ok</button>';

        // $rootScope.$on('$stateChangeSuccess', function(event, next) {
        //   if (!$auth.isAuthenticated()) {
        //     event.preventDefault();
        //     $location.path('/login');
        //   }
        // });
    }
    ngRun.$inject = ['$rootScope', '$location', '$state', 'meFactory', 'editableOptions', 'editableThemes', '$auth', 'settingsFactory'];
})();
