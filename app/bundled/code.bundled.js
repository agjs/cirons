(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function() {
  "use strict";

  module.exports = angular.module('CIRONS-MAIN-APP', [
    'ui.router',
    'ngAnimate',
    'ngRoute',
    'angular-loading-bar',
    'http-auth-interceptor',
    'ngCookies',
    'satellizer',
    'ncy-angular-breadcrumb',
    'xeditable',
    'ngLodash',
    'ui.bootstrap',
    'gridshore.c3js.chart',
    'ui.calendar',
    'pusher-angular',
    'angulartics',
    'angulartics.google.analytics'
  ]);

  window.pusherClient = new Pusher('3400e69279ea78f5b712', {
    encrypted: true
  });



})();

},{}],2:[function(require,module,exports){
(function() {
  "use strict";

  module.exports = ngConfig;

  function ngConfig($httpProvider, $urlRouterProvider, $locationProvider, $authProvider, $breadcrumbProvider, cfpLoadingBarProvider) {

    cfpLoadingBarProvider.includeSpinner = false;

    $httpProvider.interceptors.push('authenticationInterceptor');

    $httpProvider.interceptors.push(function($q) {
      return {
        response: function(response) {
           if(response.data && response.data.validation_error){
               for(var key in response.data.validation_error){
                   var errors = response.data.validation_error[key];
                   for(var ii = 0; ii < errors.length; ii++){
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

    $urlRouterProvider.otherwise('/dashboard/finance');

    $locationProvider.html5Mode(false);

    $authProvider.loginUrl = 'http://janalex.beta.cirons.com/api/v1/auth';
    $breadcrumbProvider.setOptions({
      template: 'bootstrap3'
    });


  }

  ngConfig.$inject = ['$httpProvider', '$urlRouterProvider', '$locationProvider', '$authProvider', '$breadcrumbProvider', 'cfpLoadingBarProvider'];

})();

},{}],3:[function(require,module,exports){
(function() {
    "use strict";


    module.exports = ngRun;

    function ngRun($rootScope, $location, $state, meFactory, editableOptions, editableThemes, $auth, settingsFactory) {

        editableOptions.theme = 'default';

        $rootScope.s = {
            options: [],
            cur: null,
            currency: null,
            modules: null,
            module_keys: null,
            currencies: null,
            price_lists: null,
            vat_rules: null,
            user: {},
            colors: [
                "#E4291E", // Fire Red
                "#C50F30", // Cerine
                "#F26C1C", // Flame Orange
                "#FF8F1A", // Orange
                "#FFB405"  // Yellow
            ],

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

        var bypass;
        $rootScope.$on('$stateChangeStart', function(event, toState, toParams) {

            if (bypass) return;

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

},{}],4:[function(require,module,exports){
(function() {
  'use strict';
  require('../main.ngcomponent');
  require('../components/common/common.ngcomponent');
  require('../components/authentication/authentication.ngcomponent');
  require('../components/dashboard/dashboard.ngcomponent');
  require('../components/accounting/accounting.ngcomponent');
  require('../components/expenses/suppliers/suppliers.ngcomponent');
  require('../components/expenses/supplier_invoices/supplier_invoices.ngcomponent');
  require('../components/expenses/receipts/receipts.ngcomponent');

  require('../components/sales/orders/orders.ngcomponent');
  require('../components/sales/invoices/invoices.ngcomponent');
  require('../components/sales/products/products.ngcomponent');
  require('../components/sales/contacts/contacts.ngcomponent');

  require('../components/stock/warehouses/warehouses.ngcomponent');

  require('../components/purchasing/purchase_orders/purchase_orders.ngcomponent');

  require('../components/hr/users/users.ngcomponent');

  require('../components/accounting/verifications/verifications.ngcomponent');

  require('../components/calendar/calendar.ngcomponent');
  require('../components/hr/hr.ngcomponent');
  require('../components/purchasing/purchasing.ngcomponent');
  require('../components/sales/sales.ngcomponent');
  require('../components/stock/stock.ngcomponent');
  require('../components/system_admin/system_admin.ngcomponent');
  require('../components/user_settings/user_settings.ngcomponent');
  require('../components/directives/directives.ngcomponent');
})();

},{"../components/accounting/accounting.ngcomponent":5,"../components/accounting/verifications/verifications.ngcomponent":9,"../components/authentication/authentication.ngcomponent":16,"../components/calendar/calendar.ngcomponent":21,"../components/common/common.ngcomponent":26,"../components/dashboard/dashboard.ngcomponent":34,"../components/directives/directives.ngcomponent":50,"../components/expenses/receipts/receipts.ngcomponent":54,"../components/expenses/supplier_invoices/supplier_invoices.ngcomponent":60,"../components/expenses/suppliers/suppliers.ngcomponent":66,"../components/hr/hr.ngcomponent":73,"../components/hr/users/users.ngcomponent":77,"../components/purchasing/purchase_orders/purchase_orders.ngcomponent":83,"../components/purchasing/purchasing.ngcomponent":89,"../components/sales/contacts/contacts.ngcomponent":93,"../components/sales/invoices/invoices.ngcomponent":99,"../components/sales/orders/orders.ngcomponent":108,"../components/sales/products/products.ngcomponent":115,"../components/sales/sales.ngcomponent":121,"../components/stock/stock.ngcomponent":125,"../components/stock/warehouses/warehouses.ngcomponent":130,"../components/system_admin/system_admin.ngcomponent":136,"../components/user_settings/user_settings.ngcomponent":140,"../main.ngcomponent":144}],5:[function(require,module,exports){
(function() {
  "use strict";

  angular.module('CIRONS-MAIN-APP')
    .controller('accountingController', require('./accounting.ngcontroller'))
    .factory('accountingFactory', require('./accounting.ngfactory'))
    .config(require('./accounting.ngrouter'));
})();

},{"./accounting.ngcontroller":6,"./accounting.ngfactory":7,"./accounting.ngrouter":8}],6:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = accountingController;

  function accountingController($scope) {


  }
  accountingController.$inject = ['$scope'];

})();

},{}],7:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = accountingFactory;

  function accountingFactory() {


  }

  accountingFactory.$inject = [];

})();

},{}],8:[function(require,module,exports){
/* global module  */
(function() {
  'use strict';
  module.exports = accountingRoutes;

  /*@ngInject*/
  function accountingRoutes($stateProvider) {
    $stateProvider
      .state('accounting', {
        url: "/accounting",
        controller: 'hrController',
        templateUrl: "components/accounting/accounting.view.html",
      })

  }

  accountingRoutes.$inject = ['$stateProvider'];

})();

},{}],9:[function(require,module,exports){
(function() {
  "use strict";

  angular.module('CIRONS-MAIN-APP')
    .controller('verificationsController', require('./verifications.ngcontroller'))
    .controller('verificationsCRUDController', require('./verifications_crud.ngcontroller'))
    .controller('verificationsSingleItemController', require('./verifications_item.ngcontroller'))
    .factory('verificationsFactory', require('./verifications.ngfactory'))
    .config(require('./verifications.ngrouter'));

})();

},{"./verifications.ngcontroller":10,"./verifications.ngfactory":11,"./verifications.ngrouter":12,"./verifications_crud.ngcontroller":13,"./verifications_item.ngcontroller":14}],10:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = verificationsController;

  function verificationsController($scope, $rootScope, $auth, verificationsFactory, $state) {

    verificationsFactory.getVerifications().then(function(verifications) {
      $scope.verifications = verifications;
    });

    

  }

  verificationsController.$inject = ['$scope', '$rootScope', '$auth', 'verificationsFactory', '$state'];

})();

},{}],11:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = verificationsFactory;

  function verificationsFactory($http, $q) {

    return {

      getVerifications: function() {
        return $http.get('http://janalex.beta.cirons.com/api/v1/verifications').then(function(verifications) {
          if (verifications) {
            return verifications.data;
          } else {
            throw new Error('No verifications found');
          }

        });
      },

      getVerification: function(id) {
        return $http.get('http://janalex.beta.cirons.com/api/v1/verifications' + '/' + id).then(function(item) {
          if (item) {
            return item.data;
          } else {
            throw new Error('No verifications found');
          }

        });
      },

      addVerification: function(data) {
        return $http({
          url: 'http://janalex.beta.cirons.com/api/v1/verifications',
          method: 'POST',
          data: data
        }).then(function(item) {
          if (item) {
            return item.data;
          } else {
            throw new Error('Verification could not be added!');
          }

        });

      },

      removeVerification: function(id) {
        return $http({
          url: 'http://janalex.beta.cirons.com/api/v1/verifications/' + id,
          method: 'DELETE'
        }).then(function(item) {
          if (item) {
            return item.data;
          } else {
            throw new Error('Verification could not be deleted!');
          }

        });

      },

      editVerification: function(id, data) {
        return $http({
          url: 'http://janalex.beta.cirons.com/api/v1/verifications/' + id,
          method: 'PUT',
          data: data
        }).then(function(item) {
          if (item) {
            return item.data;
          } else {
            throw new Error('Verification could not be edited!');
          }

        });

      }
    }

  }

  verificationsFactory.$inject = ['$http', '$q'];

})();

},{}],12:[function(require,module,exports){
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

},{}],13:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = verificationsCRUDController;

  function verificationsCRUDController($scope, $stateParams, verificationsFactory, lodash) {

    $scope.addVerification = function() {
      verificationsFactory.addVerification($scope.verification).then(function(added) {
        $scope.verifications.push(added);
      });
    };

    $scope.removeVerification = function() {
      verificationsFactory.removeVerification($stateParams.id);
    };

    $scope.editVerification = function(data) {
      verificationsFactory.editVerification($stateParams.id, data).then(function(edited) {

        var findItem = lodash.find($scope.verifications, function(arg) {
          return arg.id === $stateParams.id;
        });

        if (findItem) {
          findItem = edited;
        }

      });
    };

  }

  verificationsCRUDController.$inject = ['$scope', '$stateParams', 'verificationsFactory', 'lodash'];

})();

},{}],14:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = verificationsSingleItemController;

  function verificationsSingleItemController($scope, $stateParams, verificationsFactory) {
    $scope.verification = $stateParams.verification;
    $scope.id = $stateParams.id;


    if (!$scope.verification) {
      verificationsFactory.getVerification($scope.id).then(function(item) {
        $scope.verification = item;
      });
    }

  }

  verificationsSingleItemController.$inject = ['$scope', '$stateParams', 'verificationsFactory'];

})();

},{}],15:[function(require,module,exports){
(function() {
    'use strict';
    module.exports = authenticateMe;

    function authenticateMe($http, $q) {

        return {
            async: function() {
                console.log("async auth");
                return $http.get('http://janalex.beta.cirons.com/api/v1/me')
            },
            promise: function() {
                return $http.get('http://janalex.beta.cirons.com/api/v1/me').then(function(user) {
                    return user.data;
                })
            }
        };

    }

    authenticateMe.$inject = ['$http', '$q'];

})();

},{}],16:[function(require,module,exports){
(function(){
"use strict";

angular.module('CIRONS-MAIN-APP')
    .controller('loginController', require('./login/login.ngcontroller'))
    .factory('meFactory', require('./authenticate_me.ngfactory'))
    .factory('authenticationInterceptor', require('./interceptor.ngfactory'))
    .factory('authenticationFactory', require('./authentication.ngfactory'))
    .config(require('./authentication.ngrouter'));

})();

},{"./authenticate_me.ngfactory":15,"./authentication.ngfactory":17,"./authentication.ngrouter":18,"./interceptor.ngfactory":19,"./login/login.ngcontroller":20}],17:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = authenticationFactory;

  function authenticationFactory($location, $rootScope, $auth, $http, meFactory, $cookieStore, $q, $state) {

    var currentUser = {};

    var auth = {
      refresh: function() {
        if ($cookieStore.get('token')) {
          meFactory.async().then(function(user) {
            currentUser = user.data;
            $rootScope.user = user.data;
          });
          return currentUser;
        } else {
          var dfd = $q.defer();
          dfd.resolve(false);
          return dfd.promise;
        }
      },

      /**
       * Authenticate user and save token
       *
       * @param  {Object}   user     - login info
       * @param  {Function} callback - optional
       * @return {Promise}
       */
      login: function(user, callback) {
        var cb = callback || angular.noop;
        var deferred = $q.defer();

        $http.post('http://janalex.beta.cirons.com/api/v1/auth', {
          username: user.username,
          password: user.password
        }).
        success(function(data) {
          $cookieStore.put('token', data.token);
          $auth.setToken(data.token);

          meFactory.async().then(function(user) {
            currentUser = user.data;
          });
          
          deferred.resolve(data);
          $rootScope.$broadcast('loggedIn');
          return cb();
        }).
        error(function(err) {
          this.logout();
          deferred.reject(err);
          return cb(err);
        }.bind(this));

        return deferred.promise;
      },

      /**
       * Delete access token and user info
       *
       * @param  {Function}
       */
      logout: function() {
        $cookieStore.remove('token');
        currentUser = {};
      },

      /**
       * Gets all available info on authenticated user
       *
       * @return {Object} user
       */
      getCurrentUser: function() {
        return currentUser;
      },
    };

    auth.refresh();

    return auth;

  }

  authenticationFactory.$inject = ['$location', '$rootScope', '$auth', '$http', 'meFactory', '$cookieStore', '$q', '$state'];

})();

},{}],18:[function(require,module,exports){
/* global module  */
(function() {
  'use strict';
  module.exports = authenticationRoutes;

  /*@ngInject*/
  function authenticationRoutes($stateProvider) {
    $stateProvider
    .state('login', {
        url: "/login",
        controller: 'loginController',
        templateUrl: "components/authentication/login/login.view.html"
    })

  }

  authenticationRoutes.$inject = ['$stateProvider'];

})();

},{}],19:[function(require,module,exports){
(function() {
  'use strict';

  module.exports = authenticationInterceptor;

  function authenticationInterceptor($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function(config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },
      // Intercept 401s and redirect you to login
      responseError: function(response) {

        if (response.status === 401 || response.data.error === 'token_not_provided') {
          if (!$location.path().match(/\/signup/)) {
            $location.path('/login');
          }
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        } else {
          return $q.reject(response);
        }
      }
    };

  }

  authenticationInterceptor.$inject = ['$rootScope', '$q', '$cookieStore', '$location'];

})();

},{}],20:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = loginController;

  function loginController($scope, $auth, $state, $window, $location, authenticationFactory) {

    $scope.user = {};
    $scope.errors = {};

    $scope.login = function(form) {
      $scope.submitted = true;


      authenticationFactory.login({
          username: $scope.username,
          password: $scope.password
        })
        .then(function(data) {

          $location.path('/');
        })
        .catch(function(err) {
          $scope.errors.other = err.message;
        });

    };

    $scope.loginOauth = function(provider) {
      $window.location.href = '/auth/' + provider;
    };

  }

  loginController.$inject = ['$scope', '$auth', '$state', '$window', '$location', 'authenticationFactory'];

})();

},{}],21:[function(require,module,exports){
(function(){
"use strict";

angular.module('CIRONS-MAIN-APP')
    .controller('calendarController', require('./calendar.ngcontroller'))
    .factory('calendarFactory', require('./calendar.ngfactory'))
    .config(require('./calendar.ngrouter'));

})();

},{"./calendar.ngcontroller":22,"./calendar.ngfactory":23,"./calendar.ngrouter":24}],22:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = calendarController;

  // https://github.com/angular-ui/ui-calendar
  // http://fullcalendar.io/docs/

  function calendarController($scope, calendarFactory) {

    $scope.uiConfig = {
      calendar: {
        height: 550,
        editable: true,
        header: {
          right: 'month basicWeek basicDay agendaWeek agendaDay',
          center: 'title',
          left: 'today prev,next'
        },
        dayClick: $scope.alertEventOnClick,
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize
      }
    };


    calendarFactory.getCalendarData().then(function(data) {
      $scope.eventSources = data;
    })

  }

  calendarController.$inject = ['$scope', 'calendarFactory'];

})();

},{}],23:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = calendarFactory;

  function calendarFactory($http, $q) {

    return {

      getCalendarData: function() {
        return $http.get('http://janalex.beta.cirons.com/api/v1/calendar').then(function(calendar) {
          if (calendar) {
            return calendar.data;
          } else {
            throw new Error('Calendar data could not be retrieved!');
          }

        });
      }

    };

  }

  calendarFactory.$inject = ['$http', '$q'];

})();

},{}],24:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = calendarRouter;

  function calendarRouter($stateProvider) {
    $stateProvider
      .state('calendar', {
        url: "/calendar",
        controller: 'calendarController',
        templateUrl: "components/calendar/calendar.view.html",

      })

  }

  calendarRouter.$inject = ['$stateProvider'];

})();

},{}],25:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = commentsFactory;

  function commentsFactory($http, $q) {

    return {

      getComments: function(url) {
        return $http.get('http://janalex.beta.cirons.com/api/v1/comments/' + url).then(function(comments) {
          if (comments) {
            return comments.data;
          } else {
            throw new Error('No comments found');
          }

        });
      },

      getComment: function(id) {
        return $http.get('http://janalex.beta.cirons.com/api/v1/comments' + '/' + id).then(function(item) {
          if (item) {
            return item.data;
          } else {
            throw new Error('No comments found');
          }

        });
      },

      addComment: function(data) {
        return $http({
          url: 'http://janalex.beta.cirons.com/api/v1/comments',
          method: 'POST',
          data: data
        }).then(function(item) {
          if (item) {
            return item.data;
          } else {
            throw new Error('Comment could not be added!');
          }

        });

      },

      removeComment: function(id) {
        return $http({
          url: 'http://janalex.beta.cirons.com/api/v1/comments/' + id,
          method: 'DELETE'
        }).then(function(item) {
          if (item) {
            return item.data;
          } else {
            throw new Error('Comment could not be deleted!');
          }

        });

      },

      editComment: function(id, data) {
        return $http({
          url: 'http://janalex.beta.cirons.com/api/v1/comments/' + id,
          method: 'PUT',
          data: data
        }).then(function(item) {
          if (item) {
            return item.data;
          } else {
            throw new Error('Comment could not be edited!');
          }

        });

      }
    }

  }

  commentsFactory.$inject = ['$http', '$q'];

})();

},{}],26:[function(require,module,exports){
(function() {
  "use strict";

  angular.module('CIRONS-MAIN-APP')
    .controller('mainController', require('./main.ngcontroller'))
    .controller('mainMenuController', require('./main-menu/main_menu.ngcontroller'))
    .controller('rightSidebarController', require('./right-sidebar/right_sidebar.ngcontroller'))
    .controller('navigationController', require('./top-navigation/navigation.ngcontroller'))
    .factory("settingsFactory", require("../../settings.ngfactory.js"))
    .factory("infoFactory", require("./info.ngfactory.js"))
    .factory("commentsFactory", require("./comments.ngfactory.js"))
    .factory("notificationsFactory", require("./top-navigation/notifications.ngfactory.js"))
    .filter("dateRange", require("./filters/dateRange.ngfilter"))
})();

},{"../../settings.ngfactory.js":145,"./comments.ngfactory.js":25,"./filters/dateRange.ngfilter":27,"./info.ngfactory.js":28,"./main-menu/main_menu.ngcontroller":29,"./main.ngcontroller":30,"./right-sidebar/right_sidebar.ngcontroller":31,"./top-navigation/navigation.ngcontroller":32,"./top-navigation/notifications.ngfactory.js":33}],27:[function(require,module,exports){
(function() {
    'use strict';

    module.exports = dateRange;

    function dateRange(){

        return function(items, key, from, to) {
            if(!from){
                return items;
            }
            var df = new Date(from);
            if(to){
                var dt = new Date(to);
            } else {
                var dt = new Date();
            }
            var result = [];
            for (var i=0; i<items.length; i++){
                var tf = new Date(items[i][key]),
                    tt = new Date(items[i][key]);
                if (tf > df && tt < dt)  {
                    result.push(items[i]);
                }
            }
            return result;
        };
    }

    dateRange.$inject = [];

}());

},{}],28:[function(require,module,exports){
(function() {
    'use strict';
    module.exports = infoFactory;

    function infoFactory(){
        return {
            statuses: {
                "Invoice": {
                    draft: {
                        color: "yellow",
                        label: "Draft"
                    },
                    booked: {
                        color: "orange",
                        label: "Booked"
                    },
                    sent: {
                        color: "blue",
                        label: "Sent"
                    },
                    paid: {
                        color: "teal",
                        label: "Paid",
                        icon: "icon check"
                    }
                },
                "Order": {
                    pending: {
                        color: "yellow",
                        label: "Pending"
                    },
                    shipped: {
                        color: "violet",
                        label: "Shipped"
                    },
                    delivered: {
                        color: "teal",
                        label: "Delivered",
                        icon: "icon check"
                    },
                    cancelled: {
                        color: "black",
                        label: "Cancelled",
                        icon: "icon remove"
                    }
                }
            }
        };
    }

    infoFactory.$inject = [];
}());

},{}],29:[function(require,module,exports){
(function() {
    'use strict';
    module.exports = mainMenuController;

    function mainMenuController($scope) {

        $scope.touchMenuOpen = false;
        $scope.toggleTouchMenu = function() {
            $scope.touchMenuOpen = !$scope.touchMenuOpen;
        };

        $scope.logoUrl = 'assets/images/logo.png';
        $scope.menu = [{
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
            module: "accounting",
            icon: 'fa fa-book'
        }, {
            title: 'System Admin',
            state: 'system_admin',
            separateAfter: false,
            icon: 'fa fa-cogs'
        }];

    }

    mainMenuController.$inject = ['$scope'];

})();

},{}],30:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = mainController;

  function mainController($scope, $auth, $state, settingsFactory) {
    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };

    // $scope.settings = [];
    // settingsFactory.initSettings().then(function(settings) {
    //   $scope.settings = settings;
    // });
  }

  mainController.$inject = ['$scope', '$auth', '$state', 'settingsFactory'];

})();

},{}],31:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = rightSidebarController;

  function rightSidebarController($scope) {


  }

  rightSidebarController.$inject = ['$scope'];

})();

},{}],32:[function(require,module,exports){
(function() {
    'use strict';
    module.exports = navigationController;

    function navigationController($scope, $pusher, $auth, $state, meFactory, notificationsFactory, $rootScope) {


        $scope.logout = function() {
            $auth.logout();
            $state.go('login');
        }


        $scope.iconMenu = [

            {
                icon: 'fa fa-bullhorn',
                state: '',
                div_id: 'notifications_normal',
                button_id: 'normal'
            }, {
                icon: 'fa fa-bell',
                state: '',
                div_id: 'notifications_reminder',
                button_id: 'reminder'

            }, {
                icon: 'fa fa-exclamation-triangle',
                state: '',
                div_id: 'notifications_urgent',
                button_id: 'urgent'
            }

        ];

        $scope.isVisible = false;
        $scope.visible = function(arg) {
            if (arg === 'normal') {
                $scope.inlineStyle = 'top: 50px; right: 105px; left: auto; bottom: auto; display: block !important;';
                // notificationsFactory(csrf_token, 'normal');

            } else if (arg === 'reminder') {
                $scope.inlineStyle = 'top: 50px; right: 52.3125px; left: auto; bottom: auto; display: block !important;';
                // notificationsFactory(csrf_token, 'reminder');

            } else if (arg === 'urgent') {
                $scope.inlineStyle = 'top: 50px; right: -0.375px; left: auto; bottom: auto; display: block !important;';
                // notificationsFactory(csrf_token, 'urgent');
            }

            $scope.isVisible = !$scope.isVisible;

        }

        console.log("render top navigation");

        $scope.user = $rootScope.s.user;

        $scope.$watch(function() {
            return $rootScope.s.user;
        }, function() {
            $scope.user = $rootScope.s.user;
        }, true);

        // var pusher = $pusher(pusherClient);
        //
        // pusher.subscribe('maacann');
        // pusher.bind('user_' + user.id, function(data) {
        //     // var title;
        //     // switch (data.notification.type) {
        //     //   case "normal":
        //     //     title = "Notification";
        //     //     break;
        //     //   case "reminder":
        //     //     title = "Reminder";
        //     //   case "urgent":
        //     //     title = "Warning";
        //     // }
        //
        //     getNotificationButton(data.notification.type); // Where does this method comes from ?????
        //     spawnNotification(title, data.notification.text, data.notification.link); // Where does this method comes from
        // });



    }

    navigationController.$inject = ['$scope', '$pusher', '$auth', '$state', 'meFactory', 'notificationsFactory', '$rootScope'];

})();

},{}],33:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = notificationsFactory;

  function notificationsFactory($http, $q) {

    return function(token, type) {
      return $http({
        url: 'http://janalex.beta.cirons.com/api/v1/notifications/read/',
        method: 'POST',
        data: {
          _token: token,
          type: type
        }
      }).then(function(notifications) {
        if (notifications) {
          console.log(notifications);
          // return notifications.data;
        } else {
          throw new Error('Notifications cannot be retrieved');
        }

      });
    }

  }

  notificationsFactory.$inject = ['$http', '$q'];

})();

},{}],34:[function(require,module,exports){
(function(){
"use strict";

angular.module('CIRONS-MAIN-APP')
    .controller('dashboardController', require('./dashboard.ngcontroller'))
    .controller('dashboardFinanceController', require('./finance/dashboard_finance.ngcontroller'))
    .factory('dashboardFactory', require('./dashboard.ngfactory'))
    .config(require('./dashboard.ngrouter'));

})();

},{"./dashboard.ngcontroller":35,"./dashboard.ngfactory":36,"./dashboard.ngrouter":37,"./finance/dashboard_finance.ngcontroller":38}],35:[function(require,module,exports){
(function() {
    'use strict';
    module.exports = dashboardController;

    function dashboardController($rootScope, $scope, $filter, dashboardFactory, productsFactory) {

        //START PRODUCT STOCK
        $scope.input = {
            stock: ""
        };
        $scope.productStockItems = [];
        $scope.productStockItemsFilter = function() {
            console.log("filter products: " + $scope.input.stock);
            productsFactory.getProductStockFilters($scope.input.stock).then(function(data) {
                $scope.productStockItems = data;
            });
        };
        productsFactory.getProductStockFilters("").then(function(data) {
            $scope.productStockItems = data;
        });

        $scope.daysUntil = function(date) {
            var date = new Date(date);
            var today = new Date();

            var m = moment(date);
            var mt = moment(today);
            var diff = m.diff(mt, 'days');

            return diff;
        };
        //END PRODUCT STOCK

        //START REGISTER EXPENSES CHART
        $scope.expenses_bar_currentData = [];
        $scope.expenses_bar_currentColumns = [{
            "id": "variable",
            "type": "bar",
            "name": "Variable",
            "color": "#ff9600"
        }, {
            "id": "fixed",
            "type": "bar",
            "name": "Fixed",
            "color": "#FF8200"
        }, {
            "id": "receipts",
            "type": "bar",
            "name": "Receipts",
            "color": "#ff5e3a"
        }, {
            "id": "sales",
            "type": "bar",
            "name": "Sales",
            "color": "#ffcd02"
        }];
        $scope.expenses_bar_currentX = {
            "id": "x"
        };
        //END REGISTER EXPENSES CHART

        //START REGISTER EXPENSES PIE
        $scope.expensesPieData = [];
        $scope.expensesPieColumns = [];
        //END REGISTER EXPENSES PIE

        //START REGISTER ACCOUNTS PAYABLE CHART
        $scope.accountsPayableData = [];
        $scope.accounts_payableColumns = [{
            id: "non",
            type: "pie",
            name: "Non-overdue",
            color: "#ffab13"
        }, {
            id: "days1",
            type: "pie",
            name: "Overdue > 10 days",
            color: "#fbbd08"
        }, {
            id: "days2",
            type: "pie",
            name: "Overdue 10 - 60 days",
            color: "#f2711c"
        }, {
            id: "days3",
            type: "pie",
            name: "Overdue 60+ days",
            color: "#db2828"
        }];
        //END REGISTER ACCOUNTS PAYABLE CHART


        //START REGISTER ACCOUNTS RECEIVABLE CHART
        $scope.accountsReceivableData = [];
        $scope.accounts_receivableColumns = [{
            id: "non",
            type: "pie",
            name: "Non-overdue",
            color: "#ffab13"
        }, {
            id: "days1",
            type: "pie",
            name: "Overdue > 10 days",
            color: "#fbbd08"
        }, {
            id: "days2",
            type: "pie",
            name: "Overdue 10 - 60 days",
            color: "#f2711c"
        }, {
            id: "days3",
            type: "pie",
            name: "Overdue 60+ days",
            color: "#db2828"
        }];
        //END REGISTER ACCOUNTS RECEIVABLE CHART


        //START REGISTER SALES OVERVIEW CHART
        $scope.salesOverviewData = [];
        $scope.salesOverviewColumns = [{
            id: "in",
            type: "area-spline",
            name: "Sales",
            color: "#FFB405"
        }, {
            id: "out",
            type: "spline",
            name: "Earnings",
            color: "#E4291E"
        }];
        $scope.salesOverviewX = {
            id: "x"
        };
        //END REGISTER SALES OVERVIEW CHART


        //START REGISTER TOP PRODUCTS PIE
        $scope.topProductsData = [];
        $scope.topProductsColumns = [];
        //END REGISTER TOP PRODUCTS PIE

        //START REGISTER TOP CUSTOMERS PIE
        $scope.topCustomersData = [];
        $scope.topCustomersColumns = [];
        //END REGISTER TOP CUSTOMERS PIE

        //START SUPPLIERS TOP CUSTOMERS PIE
        $scope.topSuppliersData = [];
        $scope.topSuppliersColumns = [];
        //END SUPPLIERS TOP CUSTOMERS PIE


        /*
        GET DASHBOARD DATA.
        Returns: Object of data
        */
        dashboardFactory.getDashboardData().then(function(data) {
            $scope.dashboardData = data;
            $scope.dashboardData.due_invoices_mini.total = $filter('currency')(data.due_invoices_mini.total, '', 0);
            $scope.dashboardData.turnover_this_month_mini.total = $filter('currency')(data.turnover_this_month_mini.total, '', 0);
            $scope.dashboardData.growth_mini = $filter('number')(data.growth_mini, 0) + '%';

            for (var i = 0; i < data.expenses_bar_current.months.length; i++) {
                var month = data.expenses_bar_current.months[i];
                var fixed = parseFloat(data.expenses_bar_current.fixed[i]);
                var receipts = parseFloat(data.expenses_bar_current.rec[i]);
                var sales = parseFloat(data.expenses_bar_current.sales[i]);
                var variable = parseFloat(data.expenses_bar_current.supp[i]);

                $scope.expenses_bar_currentData.push({
                    "x": month,
                    "variable": variable,
                    "fixed": fixed,
                    "receipts": receipts,
                    "sales": sales
                });
            }
            $scope.isActive = false;
            $scope.activeButton = function() {
                    $scope.isActive = !$scope.isActive;
                }
                //SALES OVERVIEW
            for (var i = 0; i < data.sales_overview.x.length; i++) {
                var x = data.sales_overview.x[i];
                var in_data = data.sales_overview.in[i];
                var out = data.sales_overview.out[i];

                $scope.salesOverviewData.push({
                    "x": x,
                    "in": in_data,
                    "out": out
                });
            }

            //END SALES OVERVIEW

            //START EXPENSES PIE
            var expenses_data = [];
            for (var i = 0; i < data.expenses_pie_breakdown.length; i++) {
                var expense = data.expenses_pie_breakdown[i];
                var col = {
                    id: expense[0],
                    name: expense[0],
                    type: "pie"
                };
                if($rootScope.s.colors[i]){
                    col.color = $rootScope.s.colors[i];
                }

                $scope.expensesPieColumns.push(col);


                expenses_data[expense[0]] = expense[1];
            }
            $scope.expensesPieData.push(expenses_data);
            //END EXPENSES PIE

            //START TOP SUPPLIERS PIE
            var suppliers_data = [];
            for (var i = 0; i < data.top_suppliers.length; i++) {
                var supplier = data.top_suppliers[i];
                $scope.topSuppliersColumns.push({
                    id: "supplier" + i,
                    type: "pie",
                    name: supplier.company_name,
                    color: $rootScope.s.colors[i]
                });
                suppliers_data["supplier" + i] = supplier.total;
            }
            $scope.topSuppliersData.push(suppliers_data);
            //END TOP SUPPLIERS PIE

            //START TOP PRODUCT PIE
            var product_data = {};
            for (var i = 0; i < data.top_products.length; i++) {
                var product = data.top_products[i];
                $scope.topProductsColumns.push({
                    id: "product" + i,
                    type: "pie",
                    name: product.product_name,
                    color: $rootScope.s.colors[i]
                });
                product_data["product" + i] = product.sold;
            }
            $scope.topProductsData.push(product_data);
            //END TOP PRODUCT PIE
            //START TOP CUSTOMERS PIE
            var customer_data = {};
            for (var i = 0; i < data.top_customers.length; i++) {
                var contact = data.top_customers[i];
                $scope.topCustomersColumns.push({
                    id: "customer" + i,
                    type: "pie",
                    name: contact.name,
                    color: $rootScope.s.colors[i]
                });
                customer_data["customer" + i] = contact.invoiced;
            }
            $scope.topCustomersData.push(customer_data);
            //END TOP CUSTOMERS PIE


            $scope.accountsPayableData = [{
                "non": data.accounts_payable.array.non,
                "days1": data.accounts_payable.array.days1,
                "days2": data.accounts_payable.array.days2,
                "days3": data.accounts_payable.array.days3
            }];

            $scope.accountsPayableEntries = data.accounts_payable.array.non + data.accounts_payable.array.days1 + data.accounts_payable.array.days2 + data.accounts_payable.array.days3;

            $scope.accountsPayableNumbers = {
                non: [
                    data.accounts_payable.array.non,
                    Math.round(data.accounts_payable.array.non / $scope.accountsPayableEntries * 100 * 10) / 10
                ],
                days1: [
                    data.accounts_payable.array.days1,
                    Math.round(data.accounts_payable.array.days1 / $scope.accountsPayableEntries * 100 * 10) / 10
                ],
                days2: [
                    data.accounts_payable.array.days2,
                    Math.round(data.accounts_payable.array.days2 / $scope.accountsPayableEntries * 100 * 10) / 10
                ],
                days3: [
                    data.accounts_payable.array.days3,
                    Math.round(data.accounts_payable.array.days3 / $scope.accountsPayableEntries * 100 * 10) / 10
                ]
            };

            $scope.accountsReceivableData = [{
                "non": data.accounts_receivable.array.non,
                "days1": data.accounts_receivable.array.days1,
                "days2": data.accounts_receivable.array.days2,
                "days3": data.accounts_receivable.array.days3
            }];

            $scope.accountsReceivableEntries = data.accounts_receivable.array.non + data.accounts_receivable.array.days1 + data.accounts_receivable.array.days2 + data.accounts_receivable.array.days3;

            $scope.accountsReceivableNumbers = {
                non: [
                    data.accounts_receivable.array.non,
                    Math.round(data.accounts_receivable.array.non / $scope.accountsReceivableEntries * 100 * 10) / 10
                ],
                days1: [
                    data.accounts_receivable.array.days1,
                    Math.round(data.accounts_receivable.array.days1 / $scope.accountsReceivableEntries * 100 * 10) / 10
                ],
                days2: [
                    data.accounts_receivable.array.days2,
                    Math.round(data.accounts_receivable.array.days2 / $scope.accountsReceivableEntries * 100 * 10) / 10
                ],
                days3: [
                    data.accounts_receivable.array.days3,
                    Math.round(data.accounts_receivable.array.days3 / $scope.accountsReceivableEntries * 100 * 10) / 10
                ]
            };

            $(window).trigger('resize');

        });
    }

    dashboardController.$inject = ['$rootScope', '$scope', '$filter', 'dashboardFactory', 'productsFactory'];

})();

},{}],36:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = dashboardFactory;

  function dashboardFactory($http, $q) {

    return {

      getDashboardData: function() {
        return $http.get('http://janalex.beta.cirons.com/api/v1/dashboard').then(function(dashboard) {
          if (dashboard) {
            return dashboard.data;
          } else {
            throw new Error('Dashboard data could not be retrieved!');
          }

        });
      },

    };

  }

  dashboardFactory.$inject = ['$http', '$q'];

})();

},{}],37:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = dashboardRouter;

  function dashboardRouter($stateProvider) {
    $stateProvider
      .state('dashboard', {
        url: "/dashboard",
        abstract: true,
        ncyBreadcrumb: {
          label: 'Dashboard',
          parent: ''
        },
        views: {
          '': {
            templateUrl: "components/dashboard/dashboard.view.html",
            controller: 'dashboardController'
          }
        }

      })

    .state('dashboard.finance', {
        parent: 'dashboard',
        url: "/finance",
        ncyBreadcrumb: {
          parent: 'dashboard',
          label: 'Dashboard - Finance'
        },
        controller: 'dashboardFinanceController',
        views: {
          'dashboardContent': {
            templateUrl: "components/dashboard/finance/dashboard_finance.view.html",
          }
        }
      })
      .state('dashboard.sales', {
        url: "/sales",
        parent: 'dashboard',
        ncyBreadcrumb: {
          parent: 'dashboard',
          label: 'Dashboard - Sales'
        },
        views: {
          'dashboardContent': {
            templateUrl: "components/dashboard/sales/dashboard_sales.view.html",
          }
        }
      })
      .state('dashboard.taxes', {
        url: "/taxes",
        parent: 'dashboard',
        ncyBreadcrumb: {
          parent: 'dashboard',
          label: 'Dashboard - Taxes'
        },
        views: {
          'dashboardContent': {
            templateUrl: "components/dashboard/taxes/dashboard_taxes.view.html",
          }
        }
      })
      .state('dashboard.expenses', {
        url: "/expenses",
        parent: 'dashboard',
        ncyBreadcrumb: {
          parent: 'dashboard',
          label: 'Dashboard - Expenses'
        },
        views: {
          'dashboardContent': {
            templateUrl: "components/dashboard/expenses/dashboard_expenses.view.html",
          }
        }
      })

  }

  dashboardRouter.$inject = ['$stateProvider'];

})();

},{}],38:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = dashboardFinanceController;

  function dashboardFinanceController($scope, $filter, dashboardFactory) {

      

  }

  dashboardFinanceController.$inject = ['$scope', '$filter', 'dashboardFactory'];

})();

},{}],39:[function(require,module,exports){
(function() {
  "use strict";
  module.exports = cirons_address_selector;

  function cirons_address_selector() {

    return {
      restrict: 'EA',
      scope: {
          address: '=',
          onchange: '&'
      },
      templateUrl: 'components/directives/cirons-address-selector/template.html',
      replace: true,
      link: function(scope, element, attrs) {
          
      }
    }

  }

  cirons_address_selector.$inject = [];

})();

},{}],40:[function(require,module,exports){
(function() {
  "use strict";
  module.exports = cirons_attachments;

  function cirons_attachments($auth, $timeout) {

    var _token = "Bearer" + " " + $auth.getToken();

    return {
      restrict: 'EA',
      scope: {
          objectType: '@',
          objectId: '=',
          attachments: '=',
          onchange: '&'
      },
      transclude: true,
      templateUrl: 'components/directives/cirons-attachments/template.html',
      replace: true,
      link: function(scope, element, attrs) {

          var previewTemplate="";
            previewTemplate += "<li id=\"preview_template\">";
            previewTemplate += "            Uploading <span data-dz-name><\/span>...";
            previewTemplate += "            <div class=\"ui active blue progress\">";
            previewTemplate += "              <div class=\"bar\" data-dz-uploadprogress>";
            previewTemplate += "                <div class=\"progress\"><\/div>";
            previewTemplate += "              <\/div>";
            previewTemplate += "            <\/div>";
            previewTemplate += "        <\/li>";


          element.find(".drop").first().dropzone({
              url: 'http://janalex.beta.cirons.com/api/v1/attachments',
              multiple: true,
              uploadMultiple: false,
              headers: {
                  "Authorization": _token
              },
              init: function(){
                  this.on("success", function (file) {
                      this.removeAllFiles();
                  });
              },
              success: function(file, response){
                  $timeout(function () {
                      scope.attachments.push(response);
                  },0);
              },
              sending: function(file, xhr, data){
                  data.append("object_id", scope.objectId);
                  data.append("object_type", attrs.objectType);
              },
              previewTemplate: previewTemplate,
              previewsContainer: document.getElementById('preview_list')
          });
      }
    }

  }

  cirons_attachments.$inject = ['$auth', '$timeout'];

})();

},{}],41:[function(require,module,exports){
(function() {
  "use strict";
  module.exports = cironsCard;

  function cironsCard() {
    return {

      restrict: 'EA',
      scope: {
        cardType: '@ctype',
        cardDescription: '@cdesc',
        cardColor: '@ccolor',
        cardIcon: '@cicon',
        cardCounterDesc: '@ccounterdesc',
        cardCounter: '=',
        cardCounterSecondary: '=csecondary',
        cstate: '@',
        ccontroller: '='
      },
      replace: true,
      templateUrl: 'components/directives/cirons-card/template.html',

    }

  }

  cironsCard.$inject = ['suppliersFactory', 'receiptsFactory'];

})();

},{}],42:[function(require,module,exports){
(function() {
  "use strict";
  module.exports = cirons_checkbox;

  function cirons_checkbox() {

    return {
      restrict: 'EA',
      scope: {
          model: '=',
          label: '@',
          change: '&'
      },
      templateUrl: 'components/directives/cirons-checkbox/template.html',
      replace: true,
      link: function(scope, element, attrs) {
          element.checkbox({
              onChange: function(){
                  scope.change();
                  if(element.checkbox('is checked')){
                      scope.model = 1;
                  } else {
                      scope.model = 0;
                  }
              }
          });
      }
    }

  }

  cirons_checkbox.$inject = [];

})();

},{}],43:[function(require,module,exports){
(function() {
  "use strict";
  module.exports = cirons_comments;

  function cirons_comments() {

    return {
      restrict: 'EA',
      scope: {
      },
      templateUrl: 'components/directives/cirons-comments/template.html',
      controller: function($scope, $rootScope, $state, $http, commentsFactory, $timeout){
          $scope.active = false;
          $scope.url = $state.href();
          $scope.comment_text = "";
          $scope.comments = [];
          $scope.parsedURL = null;

          $rootScope.$on('$stateChangeStart',
          function(event, toState, toParams, fromState, fromParams){
              $scope.active = false;
              $scope.comments = [];
          });

          $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
              $scope.comments = [];
              $scope.parsedURL = "";
              $timeout(function(){
                  var url = $state.current.ncyBreadcrumbLink;
                  $scope.parsedURL = $scope.parseUrl(url);
                  $scope.getComments();
              }, 100);
          });

          $scope.postComment = function(){
              if($scope.comment_text == false || $scope.comment_text == "" || $scope.parsedURL == ""){
                  return;
              }

              var text = $scope.comment_text;
              $scope.comment_text = "";

              commentsFactory.addComment({
                  text: text,
                  url: $scope.parsedURL
              }).then(function(comment){
                  $scope.comments.push(comment);
              });
          };

          $scope.parseUrl = function(url_to_parse){
              url_to_parse = url_to_parse.replace(/general|addresses|address|payments|accounting|profit|/gi, "");
              url_to_parse = url_to_parse.replace(/\//g, ".");
              url_to_parse = url_to_parse.replace(/\.\./g, ".");
              url_to_parse = url_to_parse.replace(/#\./g, "");

              return url_to_parse;
          };

          $scope.getComments = function(){
              commentsFactory.getComments($scope.parsedURL).then(function(comments){
                  $scope.comments = comments;
              });
          };

          $scope.open = function(){
              $scope.active = !$scope.active;
              if($scope.active){

              }
          };
      },
      replace: true,
      link: function(scope, element, attrs) {

      }
    }

  }

  cirons_comments.$inject = [];

})();

},{}],44:[function(require,module,exports){
(function() {
  "use strict";
  module.exports = cirons_dropzone;

  function cirons_dropzone() {

    return {
      restrict: 'C',
      link: function(scope, element, attrs) {

        var config = {
          url: 'http://localhost:8080/upload',
          maxFilesize: 100,
          paramName: "uploadfile",
          maxThumbnailFilesize: 10,
          parallelUploads: 1,
          autoProcessQueue: false
        };

        var eventHandlers = {
          addedfile: function(file) {
            scope.file = file;
            if (this.files[1] != null) {
              this.removeFile(this.files[0]);
            }
            scope.$apply(function() {
              scope.fileAdded = true;
            });
          },

          success: function(file, response) {}

        };

        dropzone = new Dropzone(element[0], config);

        angular.forEach(eventHandlers, function(handler, event) {
          dropzone.on(event, handler);
        });

        scope.processDropzone = function() {
          dropzone.processQueue();
        };

        scope.resetDropzone = function() {
          dropzone.removeAllFiles();
        }
      }
    }
  }

  cirons_dropzone.$inject = [];

})();

},{}],45:[function(require,module,exports){
(function() {
  "use strict";
  module.exports = cirons_list_card;

  function cirons_list_card($complie) {

    return {
      restrict: 'EA',
      scope: {
        newitemstate: '@',
        singleitemstate: '@',
        data: '=',
        p1: '@',
        p2: '@',
        p3: '@',
        p4: '@',
        step: '@',
        secRightType: '@'
      },
      templateUrl: 'components/directives/cirons-list-view/template.html',
      replace: false,
      link: function(scope, element, attrs) {

      }
    }

  }

  cirons_list_card.$inject = ['$compile'];

})();

},{}],46:[function(require,module,exports){
(function() {
  "use strict";
  module.exports = cironsModelSelector;

  function cironsModelSelector() {

    return {
      restrict: 'EA',
      scope: {
        name: '=name',
        model: '@model',
        modelTitle: '@modelTitle',
        modelReturn: '@modelReturn',
        selected: '=selected'
      },
      templateUrl: 'components/directives/cirons-model-selector/template.html',
      replace: true,
      controller: function($scope, $http, $element, $attrs) {
          console.log($attrs.selected);
        $scope.model = $attrs.model;
        $scope.items = [];
        $http.get('http://janalex.beta.cirons.com/api/v1/' + $scope.model).then(function(items) {
            if (items.data) {
                var array = [];
                for(var i = 0; i < items.data.length; i++){
                    var item = items.data[i];
                    item.typeaheadTitle = item[$attrs.modelTitle];
                    array.push(item);
                }
                $scope.items = array;
                console.log($scope.items);
            }
        });
        $scope.selectItem = function($item, $model, $label){
            console.log("item selected");

        };
      }
    }

  }

  cironsModelSelector.$inject = [];

})();

},{}],47:[function(require,module,exports){
(function() {
  "use strict";
  module.exports = cirons_order_download;

  function cirons_order_download() {

    return {
      restrict: 'EA',
      scope: {
          order: '='
      },
      templateUrl: 'components/directives/cirons-order-download/template.html',
      replace: true,
      link: function(scope, element, attrs) {
          element.dropdown();
      }
    }

  }

  cirons_order_download.$inject = [];

})();

},{}],48:[function(require,module,exports){
(function() {
    "use strict";
    module.exports = cironsStatbox;

    function cironsStatbox() {

      return {
        restrict: 'EA',
        scope: {
            color: '@color',
            text: '@text',
            icon: '@icon'
        },
        templateUrl: 'components/directives/cirons-statbox/template.html',
        replace: true,
        controller: function($scope, $attrs, $element){

        }
      }

    }

    cironsStatbox.$inject = [];

})();

},{}],49:[function(require,module,exports){
(function() {
  "use strict";
  module.exports = cirons_status_badge;

  function cirons_status_badge(infoFactory) {
    return {
      restrict: 'EA',
      scope: {
          model: '@',
          step: '@'
      },
      templateUrl: 'components/directives/cirons-status-badge/template.html',
      replace: true,
      link: function(scope, element, attrs) {

          var info = infoFactory.statuses;

          var status = info[attrs.model][attrs.step];

          scope.color = status.color;
          scope.label = status.label;

          if(status.icon){
              scope.icon = status.icon;
          } else {
              scope.icon = null;
          }

      }
    }

  }

  cirons_status_badge.$inject = ['infoFactory'];

})();

},{}],50:[function(require,module,exports){
(function(){
"use strict";

angular.module('CIRONS-MAIN-APP')

.directive('cironsCard', require('./cirons-card/cirons_card.ngdirective'))
.directive('cironsStatbox', require('./cirons-statbox/cirons_statbox.ngdirective'))
.directive('cironsList', require('./cirons-list-view/cirons_list_view.ngdirective'))
.directive('cironsModelSelector', require('./cirons-model-selector/cirons_model_selector.ngdirective'))
.directive('cironsDropzone', require('./cirons-dropzone/cirons_dropzone.ngdirective'))
.directive('cironsOrderDownload', require('./cirons-order-download/cirons_order_download.ngdirective'))
.directive('cironsCheckbox', require('./cirons-checkbox/cirons_checkbox.ngdirective'))
.directive('cironsAttachments', require('./cirons-attachments/cirons_attachments.ngdirective'))
.directive('cironsComments', require('./cirons-comments/cirons_comments.ngdirective'))
.directive('ngEnter', require('./ng-enter/ng_enter.ngdirective'))
.directive('suiDropdown', require('./sui-dropdown/sui_dropdown.ngdirective'))
.directive('cironsStatusBadge', require('./cirons-status-badge/cirons_status_badge.ngdirective'))
.directive('cironsAddressSelector', require('./cirons-address-selector/cirons_address_selector.ngdirective'));

})();

},{"./cirons-address-selector/cirons_address_selector.ngdirective":39,"./cirons-attachments/cirons_attachments.ngdirective":40,"./cirons-card/cirons_card.ngdirective":41,"./cirons-checkbox/cirons_checkbox.ngdirective":42,"./cirons-comments/cirons_comments.ngdirective":43,"./cirons-dropzone/cirons_dropzone.ngdirective":44,"./cirons-list-view/cirons_list_view.ngdirective":45,"./cirons-model-selector/cirons_model_selector.ngdirective":46,"./cirons-order-download/cirons_order_download.ngdirective":47,"./cirons-statbox/cirons_statbox.ngdirective":48,"./cirons-status-badge/cirons_status_badge.ngdirective":49,"./ng-enter/ng_enter.ngdirective":51,"./sui-dropdown/sui_dropdown.ngdirective":52}],51:[function(require,module,exports){
(function() {
  "use strict";
  module.exports = ng_enter;

  function ng_enter() {
    return {
      restrict: 'A',
      link: function (scope, elements, attrs) {
              elements.bind('keydown keypress', function (event) {
                  if (event.which === 13) {
                      scope.$apply(function () {
                          scope.$eval(attrs.ngEnter);
                      });
                      console.log("ENTER!!!");
                      event.preventDefault();
                  }
              });
           }
    }

  }

  ng_enter.$inject = [];

})();

},{}],52:[function(require,module,exports){
(function() {
  "use strict";
  module.exports = sui_dropdown;

  function sui_dropdown() {
    return {
      restrict: 'A',
      link: function (scope, elements, attrs) {

          var options = {

          };

          if(attrs.suiAction){
              options.action = attrs.suiAction;
          }

          elements.dropdown(options);

      }
    }
  }

  sui_dropdown.$inject = [];

})();

},{}],53:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = expensesController;

  function expensesController($scope, suppliersFactory, receiptsFactory, $state, supplierInvoicesFactory) {

    suppliersFactory.getSuppliers().then(function(suppliers) {
      $scope.suppliersCount = suppliers.length;
    });

    receiptsFactory.countReceipts().then(function(receipts) {
      $scope.receiptsCount = receipts;
    });

    supplierInvoicesFactory.getSupplierInvoices().then(function(si){
        $scope.supplierInvoicesCount = si.length;
    });

  }

  expensesController.$inject = ['$scope', 'suppliersFactory', 'receiptsFactory', '$state', 'supplierInvoicesFactory'];

})();

},{}],54:[function(require,module,exports){
(function() {
  "use strict";

  angular.module('CIRONS-MAIN-APP')
    .controller('receiptsController', require('./receipts.ngcontroller'))
    .controller('receiptsCRUDController', require('./receipts_crud.ngcontroller'))
    .controller('receiptsSingleItemController', require('./receipts_item.ngcontroller'))
    .factory('receiptsFactory', require('./receipts.ngfactory'))
    .config(require('./receipts.ngrouter'));

})();

},{"./receipts.ngcontroller":55,"./receipts.ngfactory":56,"./receipts.ngrouter":57,"./receipts_crud.ngcontroller":58,"./receipts_item.ngcontroller":59}],55:[function(require,module,exports){
(function() {
    'use strict';
    module.exports = receiptsController;

    function receiptsController($scope, $rootScope, $auth, receiptsFactory, $state) {

        var payment = ["Cash", "CC Company", "CC Private"];
        $scope.paymentMethods = payment;

        receiptsFactory.getReceipts().then(function(receipts) {
            $scope.receipts = receipts;
            $scope.cardCounter = receipts.length;

            for (var i = 0; i < $scope.receipts.length; i++) {
                $scope.receipts[i].id = parseInt($scope.receipts[i].id);
                $scope.receipts[i].date = new Date($scope.receipts[i].date);
                $scope.receipts[i].payment = payment[parseInt($scope.receipts[i].payment)];
            }
        });

        $scope.search = {
            
        };

        $scope.lastDate = null;
        $scope.newLastDate = function(date) {
            $scope.lastDate = date;
            return true;
        };

        $scope.orderByKey = "id";
        $scope.orderByReverse = true;

        $scope.filtered = function() {
            var items = $scope.receipts;

            if ($scope.dateStart) {
                items = $filter('dateRange')(items, 'date', $scope.dateStart, $scope.dateEnd);
            }
            return items;
        };

    }

    receiptsController.$inject = ['$scope', '$rootScope', '$auth', 'receiptsFactory', '$state'];

})();

},{}],56:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = receiptsFactory;

  function receiptsFactory($http, $q) {

    return {

      getReceipts: function() {
        return $http.get('http://janalex.beta.cirons.com/api/v1/receipts').then(function(receipts) {
          if (receipts) {
            return receipts.data;
          } else {
            throw new Error('No receipts found');
          }

        });
      },

      countReceipts: function() {
        return $http.get('http://janalex.beta.cirons.com/api/v1/receipts?count').then(function(receipts) {
          if (receipts) {
            return receipts.data;
          } else {
            throw new Error('No receipts found');
          }

        });
      },

      getReceipt: function(id) {
        return $http.get('http://janalex.beta.cirons.com/api/v1/receipts' + '/' + id).then(function(item) {
          if (item) {
            return item.data;
          } else {
            throw new Error('No receipts found');
          }

        });
      },

      addReceipt: function(id, data) {
        return $http({
          url: 'http://janalex.beta.cirons.com/api/v1/receipts',
          method: 'POST',
          data: data
        }).then(function(item) {
          if (item) {
            return item.data;
          } else {
            throw new Error('Receipt could not be added!');
          }

        });

      },

      removeReceipt: function(id) {
        return $http({
          url: 'http://janalex.beta.cirons.com/api/v1/receipts/' + id,
          method: 'DELETE'
        }).then(function(item) {
          if (item) {
            return item.data;
          } else {
            throw new Error('Receipt could not be deleted!');
          }

        });

      },

      editReceipt: function(id, data) {
        return $http({
          url: 'http://janalex.beta.cirons.com/api/v1/receipts/' + id,
          method: 'PUT',
          data: data
        }).then(function(item) {
          if (item) {
            return item.data;
          } else {
            throw new Error('Receipt could not be edited!');
          }

        });

      }
    }

  }

  receiptsFactory.$inject = ['$http', '$q'];

})();

},{}],57:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = receiptsRouter;

  function receiptsRouter($stateProvider) {
    $stateProvider
      .state('receipts', {
        url: "/expenses/receipts",

        ncyBreadcrumb: {
          label: 'Receipts',
          parent: 'expenses',
        },
        views: {
          '': {
            templateUrl: 'components/expenses/receipts/receipts_table.view.html',
            controller: 'receiptsController'

          }
        //   ,
        //   'receiptsList@receipts': {
        //     templateUrl: 'components/expenses/receipts/receipts_list.view.html',
        //   }
        }
      })

    .state('receipts.create', {
      url: "/create",
      ncyBreadcrumb: {
        parent: 'receipts',
        label: 'Write a Receipt'
      },
      views: {
        '@': {
          templateUrl: 'components/expenses/receipts/receipts.view.html'
        },
        'receiptsList@receipts.create': {
          templateUrl: 'components/expenses/receipts/receipts_list.view.html',
          controller: 'receiptsController'
        },
        'receiptsContent@receipts.create': {
          templateUrl: 'components/expenses/receipts/receipts_create.view.html',
          controller: 'receiptsCRUDController'
        }
      }
    })

    .state('receipts.item', {
      url: "/:id",
      params: {
        receipt: undefined
      },
      ncyBreadcrumb: {
        parent: 'receipts',
        label: '{{id}}'
      },
      views: {
        '@': {
          templateUrl: 'components/expenses/receipts/receipts.view.html'
        },
        'receiptsList@receipts.item': {
          templateUrl: 'components/expenses/receipts/receipts_list.view.html',
          controller: 'receiptsController'
        },
        'receiptsContent@receipts.item': {
          templateUrl: 'components/expenses/receipts/receipts_content.view.html',
          controller: 'receiptsSingleItemController'
        }
      }
    });

  }

  receiptsRouter.$inject = ['$stateProvider'];

})();

},{}],58:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = receiptsCRUDController;

  function receiptsCRUDController($scope, $stateParams, receiptsFactory, lodash, suppliersFactory, $state, settingsFactory) {

    $scope.receipt = {
        supplier: null,
        date: new Date(),
        attachments: []
    };

    $scope.changeSupplier = false;
    $scope.checkSupplier = function(){
        if(!$scope.receipt){
            return;
        }
        if($scope.receipt.supplier){
            $scope.changeSupplier = false;
        } else {
            $scope.changeSupplier = true;
        }
    };

    $scope.settings = settingsFactory.getSettings();
    if(!$scope.settings.length){
        settingsFactory.initSettings().then(function(data){
            $scope.settings = data;
        });
    } else {

    }

    $scope.checkSupplier();
    $scope.suppliers = [];
    $scope.getSuppliers = function(){
        suppliersFactory.getSuppliers().then(function(suppliers){
            $scope.suppliers = suppliers;
        });
    };
    $scope.getSuppliers();

    $scope.addReceipt = function() {
      var newReceipt = $scope.receipt;
      newReceipt.supplier_id = newReceipt.supplier.id;
      delete newReceipt.supplier;

      receiptsFactory.addReceipt(newReceipt).then(function(added) {
        //$scope.receipts.unshift(added);
        $state.go('receipts.item', {id: added.id, receipt: added});
      });
    };



  }

  receiptsCRUDController.$inject = ['$scope', '$stateParams', 'receiptsFactory', 'lodash', 'suppliersFactory', '$state', 'settingsFactory'];

})();

},{}],59:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = receiptsSingleItemController;

  function receiptsSingleItemController($scope, $stateParams, receiptsFactory, suppliersFactory, lodash, settingsFactory) {
    $scope.supplier = $stateParams.supplier;
    $scope.id = $stateParams.id;

    var payment = ["Cash", "CC Company", "CC Private"];
    $scope.paymentMethods = payment;

    if (!$scope.receipt) {
      receiptsFactory.getReceipt($scope.id).then(function(item) {
        $scope.receipt = item;
        $scope.formatDates();
        $scope.checkSupplier();
      });
    }

    $scope.settings = settingsFactory.getSettings();
    if(!$scope.settings.length){
        settingsFactory.initSettings().then(function(data){
            $scope.settings = data;
        });
    } else {

    }

    $scope.save = function(){
        if($scope.receipt && $scope.receipt.supplier){
            $scope.saving = $scope.receipt;
            $scope.saving.supplier_id = $scope.saving.supplier.id;
            delete $scope.saving.supplier;

            receiptsFactory.editReceipt($scope.id, $scope.saving).then(function(edited){
                $scope.receipt = edited;
            });
        }
    };

    $scope.paid_date = null;

    $scope.formatDates = function(){
        $scope.paid_date = new Date();
        if($scope.receipt){
            console.log("format dates");
            $scope.receipt.date = new Date($scope.receipt.date);
        }
    };
    $scope.formatDates();

    $scope.onSupplierSelect = function($item, $model, $label){
        if($scope.newSupplier.id){
            receiptsFactory.editReceipt($scope.id, {
                supplier_id: $scope.newSupplier.id
            }).then(function(edited){
                $scope.receipt.supplier = $scope.newSupplier;
                $scope.newSupplier = null;
                $scope.changeSupplier = false;

                var findItem = lodash.find($scope.contacts, function(arg) {
                  return arg.id === $stateParams.id;
                });
                if (findItem) {
                  findItem = edited;
                }
            });
        }
    };

    $scope.changeSupplier = false;
    $scope.checkSupplier = function(){
        if(!$scope.receipt){
            $scope.changeSupplier = true;
            return;
        }
        if($scope.receipt.supplier){
            $scope.changeSupplier = false;
        } else {
            $scope.changeSupplier = true;
        }
    };
    $scope.checkSupplier();
    $scope.suppliers = [];
    $scope.getSuppliers = function(){
        suppliersFactory.getSuppliers().then(function(suppliers){
            $scope.suppliers = suppliers;
        });
    };
    $scope.getSuppliers();

  }

  receiptsSingleItemController.$inject = ['$scope', '$stateParams', 'receiptsFactory', 'suppliersFactory', 'lodash', 'settingsFactory'];

})();

},{}],60:[function(require,module,exports){
(function() {
  "use strict";

  angular.module('CIRONS-MAIN-APP')
    .controller('supplierInvoicesController', require('./supplier_invoices.ngcontroller'))
    .controller('supplierInvoicesCRUDController',require('./supplier_invoices_crud.ngcontroller'))
    .controller('supplierInvoicesSingleItemController', require('./supplier_invoices_item.ngcontroller'))
    .factory('supplierInvoicesFactory', require('./supplier_invoices.ngfactory'))
    .config(require('./supplier_invoices.ngrouter'));

})();

},{"./supplier_invoices.ngcontroller":61,"./supplier_invoices.ngfactory":62,"./supplier_invoices.ngrouter":63,"./supplier_invoices_crud.ngcontroller":64,"./supplier_invoices_item.ngcontroller":65}],61:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = supplierInvoicesController;

  function supplierInvoicesController($scope, $rootScope, $auth, supplierInvoicesFactory, $state, $filter) {

    supplierInvoicesFactory.getSupplierInvoices().then(function(supplierInvoices) {
      $scope.supplierInvoices = supplierInvoices;
      for(var i = 0; i < $scope.supplierInvoices.length; i++){
          $scope.supplierInvoices[i].id = parseInt($scope.supplierInvoices[i].id);
          $scope.supplierInvoices[i].date = new Date($scope.supplierInvoices[i].date);
      }
    });

    $scope.search = {
        paid: '',
        supplier: {
            company_name: ''
        }
    };

    $scope.lastDate = null;
    $scope.newLastDate = function(date){
        $scope.lastDate = date;
        return true;
    };

    $scope.orderByKey = "id";
    $scope.orderByReverse = true;

    $scope.filtered = function(){
        var items = $scope.supplierInvoices;

        if($scope.dateStart){
            items = $filter('dateRange')(items, 'date', $scope.dateStart, $scope.dateEnd);
        }
        return items;
    };

  }

  supplierInvoicesController.$inject = ['$scope', '$rootScope', '$auth', 'supplierInvoicesFactory', '$state', '$filter'];

})();

},{}],62:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = supplierInvoicesFactory;

  function supplierInvoicesFactory($http, $q) {

    return {

      getSupplierInvoices: function() {
        return $http.get('http://janalex.beta.cirons.com/api/v1/supplier_invoices').then(function(supplier_invoices) {
          if (supplier_invoices) {
            return supplier_invoices.data;
          } else {
            throw new Error('No supplier_invoices found');
          }

        });
      },

      getSupplierInvoice: function(id) {
        return $http.get('http://janalex.beta.cirons.com/api/v1/supplier_invoices' + '/' + id).then(function(item) {
          if (item) {
            return item.data;
          } else {
            throw new Error('No supplier_invoices found');
          }

        });
      },

      addSupplierInvoice: function(data) {
        return $http({
          url: 'http://janalex.beta.cirons.com/api/v1/supplier_invoices',
          method: 'POST',
          data: data
        }).then(function(item) {
          if (item) {
            return item.data;
          } else {
            throw new Error('SupplierInvoice could not be added!');
          }

        });

      },

      removeSupplierInvoice: function(id) {
        return $http({
          url: 'http://janalex.beta.cirons.com/api/v1/supplier_invoices/' + id,
          method: 'DELETE'
        }).then(function(item) {
          if (item) {
            return item.data;
          } else {
            throw new Error('SupplierInvoice could not be deleted!');
          }

        });

      },

      editSupplierInvoice: function(id, data) {
        return $http({
          url: 'http://janalex.beta.cirons.com/api/v1/supplier_invoices/' + id,
          method: 'PUT',
          data: data
        }).then(function(item) {
          if (item) {
            return item.data;
          } else {
            throw new Error('SupplierInvoice could not be edited!');
          }

        });

      }
    }

  }

  supplierInvoicesFactory.$inject = ['$http', '$q'];

})();

},{}],63:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = supplierInvoicesRouter;

  function supplierInvoicesRouter($stateProvider) {
    $stateProvider
      .state('supplier_invoices', {
        url: "/expenses/supplier_invoices",

        ncyBreadcrumb: {
          label: 'SupplierInvoices',
          parent: 'expenses',
        },
        views: {
          '': {
            templateUrl: 'components/expenses/supplier_invoices/supplier_invoices_table.view.html',
            controller: 'supplierInvoicesController'
          },
          'supplierInvoicesList@supplier_invoices': {
            templateUrl: 'components/expenses/supplier_invoices/supplier_invoices_list.view.html',
          }
        }
      })

    .state('supplier_invoices.create', {
      url: "/create",
      ncyBreadcrumb: {
        parent: 'supplier_invoices',
        label: 'Write a Supplier Invoice'
      },
      views: {
        '@': {
          templateUrl: 'components/expenses/supplier_invoices/supplier_invoices.view.html'
        },
        'supplierInvoicesList@supplier_invoices.create': {
          templateUrl: 'components/expenses/supplier_invoices/supplier_invoices_list.view.html',
          controller: 'supplierInvoicesController'
        },
        'supplierInvoicesContent@supplier_invoices.create': {
          templateUrl: 'components/expenses/supplier_invoices/supplier_invoices_create.view.html',
          controller: 'supplierInvoicesCRUDController'
        }
      }
    })

    .state('supplier_invoices.item', {
      url: "/:id",
      params: {
        supplierInvoice: undefined
      },
      ncyBreadcrumb: {
        parent: 'supplier_invoices',
        label: '{{id}}'
      },
      views: {
        '@': {
          templateUrl: 'components/expenses/supplier_invoices/supplier_invoices.view.html'
        },
        'supplierInvoicesList@supplier_invoices.item': {
          templateUrl: 'components/expenses/supplier_invoices/supplier_invoices_list.view.html',
          controller: 'supplierInvoicesController'
        },
        'supplierInvoicesContent@supplier_invoices.item': {
          templateUrl: 'components/expenses/supplier_invoices/supplier_invoices_content.view.html',
          controller: 'supplierInvoicesSingleItemController'
        }
      }
    });

  }

  supplierInvoicesRouter.$inject = ['$stateProvider'];

})();

},{}],64:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = supplierInvoicesCRUDController;

  function supplierInvoicesCRUDController($scope, $stateParams, supplierInvoicesFactory, lodash, suppliersFactory, $state, settingsFactory) {

    $scope.supplierInvoice = {
        supplier: null,
        date: new Date(),
        duedate: new Date(),
        paid: "0000-00-00",
        attachments: []
    };

    $scope.changeSupplier = false;
    $scope.checkSupplier = function(){
        if(!$scope.supplierInvoice){
            return;
        }
        if($scope.supplierInvoice.supplier){
            $scope.changeSupplier = false;
        } else {
            $scope.changeSupplier = true;
        }
    };

    $scope.settings = settingsFactory.getSettings();
    if(!$scope.settings.length){
        settingsFactory.initSettings().then(function(data){
            $scope.settings = data;
        });
    } else {

    }

    $scope.checkSupplier();
    $scope.suppliers = [];
    $scope.getSuppliers = function(){
        suppliersFactory.getSuppliers().then(function(suppliers){
            $scope.suppliers = suppliers;
        });
    };
    $scope.getSuppliers();

    $scope.addSupplierInvoice = function() {
      var newInvoice = $scope.supplierInvoice;
      newInvoice.supplier_id = newInvoice.supplier.id;
      delete newInvoice.supplier;

      supplierInvoicesFactory.addSupplierInvoice(newInvoice).then(function(added) {
        //$scope.supplierInvoices.unshift(added);
        $state.go('supplier_invoices.item', {id: added.id, supplierInvoice: added});
      });
    };

    $scope.onSupplierSelect = function($item, $model, $label){
        if($scope.supplierInvoice.supplier.id){
            supplierInvoicesFactory.editSupplierInvoice($scope.id, {
                supplier_id: $scope.supplierInvoice.supplier.id
            }).then(function(edited){
                $scope.changeSupplier = false;
            });
        }
    };



  }

  supplierInvoicesCRUDController.$inject = ['$scope', '$stateParams', 'supplierInvoicesFactory', 'lodash', 'suppliersFactory', '$state', 'settingsFactory'];

})();

},{}],65:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = supplierInvoicesSingleItemController;

  function supplierInvoicesSingleItemController($scope, $stateParams, supplierInvoicesFactory, suppliersFactory, lodash, settingsFactory) {
    $scope.supplierInvoice = $stateParams.supplierInvoice;
    $scope.id = $stateParams.id;


    if (!$scope.supplierInvoice) {
      supplierInvoicesFactory.getSupplierInvoice($scope.id).then(function(item) {
        $scope.supplierInvoice = item;
        $scope.checkSupplier();
        $scope.formatDates();
      });
    }

    $scope.settings = settingsFactory.getSettings();
    if(!$scope.settings.length){
        settingsFactory.initSettings().then(function(data){
            $scope.settings = data;
        });
    } else {

    }

    $scope.save = function(){
        if($scope.supplierInvoice && $scope.supplierInvoice.supplier){
            $scope.saving = $scope.supplierInvoice;
            $scope.saving.supplier_id = $scope.saving.supplier.id;
            delete $scope.saving.supplier;

            supplierInvoicesFactory.editSupplierInvoice($scope.id, $scope.saving).then(function(edited){
                $scope.supplierInvoice = edited;
            });
        }
    };

    $scope.paid_date = null;

    $scope.formatDates = function(){
        $scope.paid_date = new Date();
        if($scope.supplierInvoice){
            console.log("format dates");
            $scope.supplierInvoice.date = new Date($scope.supplierInvoice.date);
            $scope.supplierInvoice.duedate = new Date($scope.supplierInvoice.duedate);

            if($scope.supplierInvoice.paid != "0000-00-00"){
                $scope.paid_date = new Date($scope.supplierInvoice.paid);
            }
            console.log($scope.supplierInvoice.paid);
        }
        $scope.paid_date = ($scope.paid_date.getFullYear() + '-' + ('0' + ($scope.paid_date.getMonth() + 1)).slice(-2) + '-' + ('0' + ($scope.paid_date.getDate())).slice(-2));
    };
    $scope.formatDates();

    $scope.onSupplierSelect = function($item, $model, $label){
        if($scope.newSupplier.id){
            supplierInvoicesFactory.editSupplierInvoice($scope.id, {
                supplier_id: $scope.newSupplier.id
            }).then(function(edited){
                $scope.supplierInvoice.supplier = $scope.newSupplier;
                $scope.newSupplier = null;
                $scope.changeSupplier = false;

                var findItem = lodash.find($scope.contacts, function(arg) {
                  return arg.id === $stateParams.id;
                });
                if (findItem) {
                  findItem = edited;
                }
            });
        }
    };

    $scope.changeSupplier = false;
    $scope.checkSupplier = function(){
        if(!$scope.supplierInvoice){
            return;
        }
        if($scope.supplierInvoice.supplier){
            $scope.changeSupplier = false;
        } else {
            $scope.changeSupplier = true;
        }
    };
    $scope.checkSupplier();
    $scope.suppliers = [];
    $scope.getSuppliers = function(){
        suppliersFactory.getSuppliers().then(function(suppliers){
            $scope.suppliers = suppliers;
        });
    };
    $scope.getSuppliers();

  }

  supplierInvoicesSingleItemController.$inject = ['$scope', '$stateParams', 'supplierInvoicesFactory', 'suppliersFactory', 'lodash', 'settingsFactory'];

})();

},{}],66:[function(require,module,exports){
(function(){
"use strict";

angular.module('CIRONS-MAIN-APP')
    .controller('expensesController', require('../expenses.ngcontroller'))
    .controller('suppliersController', require('./suppliers.ngcontroller'))
    .controller('suppliersCRUDController', require('./suppliers_crud.ngcontroller'))
    .controller('suppliersSingleItemController', require('./suppliers_item.ngcontroller'))
    .controller('suppliersListController', require('./suppliers_list.ngcontroller'))
    .factory('suppliersFactory', require('./suppliers.ngfactory'))
    .config(require('./suppliers.ngrouter'));

})();

},{"../expenses.ngcontroller":53,"./suppliers.ngcontroller":67,"./suppliers.ngfactory":68,"./suppliers.ngrouter":69,"./suppliers_crud.ngcontroller":70,"./suppliers_item.ngcontroller":71,"./suppliers_list.ngcontroller":72}],67:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = suppliersController;

  function suppliersController($scope, $rootScope, $auth, suppliersFactory, $state) {
    suppliersFactory.getSuppliers().then(function(expenses) {
      $scope.expenses = expenses;
    });
  }

  suppliersController.$inject = ['$scope', '$rootScope', '$auth', 'suppliersFactory', '$state'];

})();

},{}],68:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = suppliersFactory;

  function suppliersFactory($http, $q) {

    return {

      getSuppliers: function() {
        return $http.get('http://janalex.beta.cirons.com/api/v1/suppliers').then(function(suppliers) {
          if (suppliers) {
            return suppliers.data;
          } else {
            throw new Error('No suppliers found');
          }

        });
      },

      getSupplier: function(id) {
        return $http.get('http://janalex.beta.cirons.com/api/v1/suppliers' + '/' + id).then(function(item) {
          if (item) {
            return item.data;
          } else {
            throw new Error('No suppliers found');
          }

        });
      },

      addSupplier: function(data) {
        return $http({
          url: 'http://janalex.beta.cirons.com/api/v1/suppliers',
          method: 'POST',
          data: data
        }).then(function(item) {
          if (item) {
            return item.data;
          } else {
            throw new Error('Supplier could not be added!');
          }

        });

      },

      removeSupplier: function(id) {
        return $http({
          url: 'http://janalex.beta.cirons.com/api/v1/suppliers/' + id,
          method: 'DELETE'
        }).then(function(item) {
          if (item) {
            return item.data;
          } else {
            throw new Error('Supplier could not be deleted!');
          }

        });

      },

      editSupplier: function(id, data) {
        return $http({
          url: 'http://janalex.beta.cirons.com/api/v1/suppliers/' + id,
          method: 'PUT',
          data: data
        }).then(function(item) {
          if (item) {
            return item.data;
          } else {
            throw new Error('Supplier could not be edited!');
          }

        });

      }
    }

  }

  suppliersFactory.$inject = ['$http', '$q'];

})();

},{}],69:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = expensesRouter;

  function expensesRouter($stateProvider) {
    $stateProvider
    $stateProvider
      .state('expenses', {
        url: "/expenses",
        templateUrl: "components/expenses/expenses.view.html",
        ncyBreadcrumb: {
          label: 'Expenses'
        },
      })
      .state('suppliers', {
        url: "/expenses/suppliers",
        ncyBreadcrumb: {
          parent: 'expenses',
          label: 'Suppliers'
        },
        views: {
          '': {
            templateUrl: 'components/expenses/suppliers/suppliers.view.html',
            controller: 'suppliersController'

          },
          'suppliersList@suppliers': {
            templateUrl: 'components/expenses/suppliers/suppliers_list.view.html',
            controller: 'suppliersListController'
          }


        }
      })

    .state('suppliers.create', {
      url: "/create",
      ncyBreadcrumb: {
        parent: 'suppliers',
        label: 'Add New Supplier'
      },
      views: {
        '': {
          templateUrl: 'components/expenses/suppliers/suppliers.view.html'
        },
        'suppliersList@suppliers': {
          templateUrl: 'components/expenses/suppliers/suppliers_list.view.html',
          controller: 'suppliersListController'
        },
        'suppliersContent@suppliers': {
          templateUrl: 'components/expenses/suppliers/suppliers_create.view.html',
          controller: 'suppliersCRUDController'
        }
      }
    })

    .state('suppliers.item', {
      url: "/:id",
      abstract: true,
      params: {
        supplier: undefined
      },
      ncyBreadcrumb: {
        parent: 'suppliers',
        label: '{{id}}'
      },
      views: {
        '': {
          templateUrl: 'components/expenses/suppliers/suppliers.view.html'
        },
        'suppliersList@suppliers': {
          templateUrl: 'components/expenses/suppliers/suppliers_list.view.html',
          controller: 'suppliersListController'
        },
        'suppliersContent@suppliers': {
          templateUrl: 'components/expenses/suppliers/suppliers_content.view.html',
          controller: 'suppliersSingleItemController'
        }
      }
    })

    .state("suppliers.item.general", {
        url: "/general",
        parent: 'suppliers.item',
        params: {
          supplier: undefined
        },
        ncyBreadcrumb: {
          parent: 'suppliers.item',
          label: 'General'
        },
        views: {
            "tabContent@suppliers.item": {
                templateUrl: 'components/expenses/suppliers/tabs/general.view.html'
            }
        }
    })

    .state("suppliers.item.address", {
        url: "/address",
        parent: 'suppliers.item',
        params: {
          supplier: undefined
        },
        ncyBreadcrumb: {
          parent: 'suppliers.item',
          label: 'Address'
        },
        views: {
            "tabContent@suppliers.item": {
                templateUrl: 'components/expenses/suppliers/tabs/address.view.html'
            }
        }
    });

  }

  expensesRouter.$inject = ['$stateProvider'];

})();

},{}],70:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = suppliersCRUDController;

  function suppliersCRUDController($scope, $stateParams, suppliersFactory, lodash, $state) {

    $scope.addSupplier = function() {
      suppliersFactory.addSupplier($scope.supplier).then(function(added) {
        $scope.expenses.unshift(added);
        $state.go("suppliers.item.general", {id: added.id, supplier: added});
      });
    };

    $scope.removeSupplier = function() {
      suppliersFactory.removeSupplier($stateParams.id);
    };

    $scope.editSupplier = function(companyName) {
      suppliersFactory.editSupplier($stateParams.id, companyName).then(function(edited) {

        var findItem = lodash.find($scope.expenses, function(arg) {
          return arg.id === $stateParams.id;
        });

        if (findItem) {
          findItem.company_name = edited.company_name;
        }

      });
    };

  }

  suppliersCRUDController.$inject = ['$scope', '$stateParams', 'suppliersFactory', 'lodash', '$state'];

})();

},{}],71:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = suppliersSingleItemController;

  function suppliersSingleItemController($scope, $stateParams, suppliersFactory, lodash) {
    $scope.supplier = $stateParams.supplier;
    $scope.id = $stateParams.id;


    if (!$scope.supplier) {
      suppliersFactory.getSupplier($scope.id).then(function(item) {
        $scope.supplier = item;
      });
    }

    $scope.editName = function(name){
        suppliersFactory.editSupplier($scope.id, {
            company_name: name
        }).then(function(edited){
            var findItem = lodash.find($scope.expenses, function(arg) {
              return arg.id === $stateParams.id;
            });

            if (findItem) {
              findItem.company_name = edited.company_name;
            }
        });
    };

    $scope.save = function(){
        suppliersFactory.editSupplier($scope.id, $scope.supplier).then(function(edited){
            var findItem = lodash.find($scope.expenses, function(arg) {
              return arg.id === $stateParams.id;
            });

            if (findItem) {
              findItem.company_name = edited.company_name;
            }
        });
    };

  }

  suppliersSingleItemController.$inject = ['$scope', '$stateParams', 'suppliersFactory', 'lodash'];

})();

},{}],72:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = suppliersListController;

  function suppliersListController($scope, $state) {

    $scope.currentState = function() {
      return $state.current.name;
    };

  }

  suppliersListController.$inject = ['$scope', '$state'];

})();

},{}],73:[function(require,module,exports){
(function(){
"use strict";

angular.module('CIRONS-MAIN-APP')
    .controller('hrController', require('./hr.ngcontroller'))
    .factory('hrFactory', require('./hr.ngfactory'))
    .config(require('./hr.ngrouter'));

})();

},{"./hr.ngcontroller":74,"./hr.ngfactory":75,"./hr.ngrouter":76}],74:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = hrController;

  function hrController($scope, usersFactory) {
      $scope.usersCount = 0;

      usersFactory.getUsers().then(function(users){
          $scope.usersCount = users.length;
      });

  }

  hrController.$inject = ['$scope', 'usersFactory'];

})();

},{}],75:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = hrFactory;

  function hrFactory($http, $q) {

    return {

    };

  }

  hrFactory.$inject = ['$http', '$q'];

})();

},{}],76:[function(require,module,exports){
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

},{}],77:[function(require,module,exports){
(function() {
  "use strict";

  angular.module('CIRONS-MAIN-APP')
    .controller('usersController', require('./users.ngcontroller'))
    .controller('usersCRUDController', require('./users_crud.ngcontroller'))
    .controller('usersSingleItemController', require('./users_item.ngcontroller'))
    .factory('usersFactory', require('./users.ngfactory'))
    .config(require('./users.ngrouter'));

})();

},{"./users.ngcontroller":78,"./users.ngfactory":79,"./users.ngrouter":80,"./users_crud.ngcontroller":81,"./users_item.ngcontroller":82}],78:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = usersController;

  function usersController($scope, $rootScope, $auth, usersFactory, $state) {

    usersFactory.getUsers().then(function(users) {
      $scope.users = users;
    });



  }

  usersController.$inject = ['$scope', '$rootScope', '$auth', 'usersFactory', '$state'];

})();

},{}],79:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = usersFactory;

  function usersFactory($http, $q) {

    return {

      getUsers: function() {
        return $http.get('http://janalex.beta.cirons.com/api/v1/users').then(function(users) {
          if (users) {
            return users.data;
          } else {
            throw new Error('No users found');
          }

        });
      },

      getUser: function(id) {
        return $http.get('http://janalex.beta.cirons.com/api/v1/users' + '/' + id).then(function(item) {
          if (item) {
            return item.data;
          } else {
            throw new Error('No users found');
          }

        });
      },

      addUser: function(data) {
        return $http({
          url: 'http://janalex.beta.cirons.com/api/v1/users',
          method: 'POST',
          data: data
        }).then(function(item) {
          if (item) {
            return item.data;
          } else {
            throw new Error('User could not be added!');
          }

        });

      },

      removeUser: function(id) {
        return $http({
          url: 'http://janalex.beta.cirons.com/api/v1/users/' + id,
          method: 'DELETE'
        }).then(function(item) {
          if (item) {
            return item.data;
          } else {
            throw new Error('User could not be deleted!');
          }

        });

      },

      editUser: function(id, data) {
        return $http({
          url: 'http://janalex.beta.cirons.com/api/v1/users/' + id,
          method: 'PUT',
          data: data
        }).then(function(item) {
          if (item) {
            return item.data;
          } else {
            throw new Error('User could not be edited!');
          }

        });

    },

      changePassword: function(id, data){
          return $http({
            url: 'http://janalex.beta.cirons.com/api/v1/users/' + id + "/password",
            method: 'PUT',
            data: data
          }).then(function(item) {
            if (item) {
              return item.data;
            } else {
              throw new Error('User password could not be edited!');
            }
          });
      }
    }

  }

  usersFactory.$inject = ['$http', '$q'];

})();

},{}],80:[function(require,module,exports){
(function() {
    'use strict';
    module.exports = usersRouter;

    function usersRouter($stateProvider) {
        $stateProvider
            .state('users', {
                url: "/hr/users",

                ncyBreadcrumb: {
                    label: 'Users',
                    parent: 'hr',
                },
                views: {
                    '': {
                        templateUrl: 'components/hr/users/users.view.html',
                        controller: 'usersController'

                    },
                    'usersList@users': {
                        templateUrl: 'components/hr/users/users_list.view.html',
                    }
                }
            })

        .state('users.create', {
            url: "/create",
            ncyBreadcrumb: {
                parent: 'users',
                label: 'Write a User'
            },
            views: {
                '': {
                    templateUrl: 'components/hr/users/users.view.html'
                },
                'usersList@users': {
                    templateUrl: 'components/hr/users/users_list.view.html',

                },
                'usersContent@users': {
                    templateUrl: 'components/hr/users/users_create.view.html',
                    controller: 'usersCRUDController'
                }
            }
        })

        .state('users.item', {
            url: "/:id",
            params: {
                user: undefined
            },
            ncyBreadcrumb: {
                parent: 'users',
                label: '{{id}}'
            },
            views: {
                '': {
                    templateUrl: 'components/hr/users/users.view.html'
                },
                'usersList@users': {
                    templateUrl: 'components/hr/users/users_list.view.html',

                },
                'usersContent@users': {
                    templateUrl: 'components/hr/users/users_content.view.html',
                    controller: 'usersSingleItemController'
                }
            }
        });

    }

    usersRouter.$inject = ['$stateProvider'];

})();

},{}],81:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = usersCRUDController;

  function usersCRUDController($scope, $stateParams, usersFactory, lodash, $state) {

    $scope.alerts = [];
    $scope.user = {};

    $scope.addUser = function() {
      usersFactory.addUser($scope.user).then(function(added) {
        $scope.users.unshift(added);
        $state.go('users.item', {id: added.id, user: added});
      });
    };

    

  }

  usersCRUDController.$inject = ['$scope', '$stateParams', 'usersFactory', 'lodash', '$state'];

})();

},{}],82:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = usersSingleItemController;

  function usersSingleItemController($scope, $stateParams, usersFactory, lodash, $rootScope) {
    $scope.user = $stateParams.user;
    $scope.id = $stateParams.id;

    $scope.alerts = [];

    if (!$scope.user) {
      usersFactory.getUser($scope.id).then(function(item) {
        $scope.user = item;
      });
    }

    $scope.saveUser = function(){
        var saveuser = $scope.user;
        delete saveuser.username;
        usersFactory.editUser($scope.user.id, $scope.user).then(function(user){
            $scope.user = user;

            if($rootScope.s.user.id == user.id){
                // if edited is current user then update rootScope user info
                $rootScope.s.user = user;
            }

            var findItem = lodash.find($scope.users, function(arg) {
              return arg.id === $stateParams.id;
            });
            if (findItem) {
              findItem = user;
            }
        });
    };

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };

    $scope.savePassword = function(){
        if($scope.password && $scope.password != ""){

            if($scope.password.length < 8){
                $scope.alerts.push({
                    type: 'danger',
                    msg: 'Password must be at least 8 characters!'
                });
                return;
            }

            if($scope.password_confirmation && $scope.password_confirmation == ""){
                $scope.alerts.push({
                    type: 'danger',
                    msg: 'You need to confirm the password!'
                });
                return;
            }
            if($scope.password != $scope.password_confirmation){
                $scope.alerts.push({
                    type: 'danger',
                    msg: 'The password must match the confirmation!'
                });
                return;
            }

            usersFactory.changePassword($scope.id, {
                password: $scope.password,
                password_confirmation: $scope.password_confirmation
            }).then(function(user){
                $scope.alerts.push({
                    type: 'success',
                    msg: 'Password is now changed'
                });
            });
            return;
        }
        $scope.alerts.push({
            type: 'danger',
            msg: 'You need to first type in a new password and confirmation!'
        });
        return;
    };

  }

  usersSingleItemController.$inject = ['$scope', '$stateParams', 'usersFactory', 'lodash', '$rootScope'];

})();

},{}],83:[function(require,module,exports){
(function() {
  "use strict";

  angular.module('CIRONS-MAIN-APP')
    .controller('purchaseOrdersController', require('./purchase_orders.ngcontroller'))
    .controller('purchaseOrdersCRUDController', require('./purchase_orders_crud.ngcontroller'))
    .controller('purchaseOrdersSingleItemController', require('./purchase_orders_item.ngcontroller'))
    .factory('purchaseOrdersFactory', require('./purchase_orders.ngfactory'))
    .config(require('./purchase_orders.ngrouter'));

})();

},{"./purchase_orders.ngcontroller":84,"./purchase_orders.ngfactory":85,"./purchase_orders.ngrouter":86,"./purchase_orders_crud.ngcontroller":87,"./purchase_orders_item.ngcontroller":88}],84:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = purchaseOrdersController;

  function purchaseOrdersController($scope, $rootScope, $auth, purchaseOrdersFactory, $state) {

    purchaseOrdersFactory.getPurchaseOrders().then(function(purchaseOrders) {
      $scope.purchaseOrders = purchaseOrders;
    });



  }

  purchaseOrdersController.$inject = ['$scope', '$rootScope', '$auth', 'purchaseOrdersFactory', '$state'];

})();

},{}],85:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = purchaseOrdersFactory;

  function purchaseOrdersFactory($http, $q) {

    return {

      getPurchaseOrders: function() {
        return $http.get('http://janalex.beta.cirons.com/api/v1/purchase_orders').then(function(purchase_orders) {
          if (purchase_orders) {
            return purchase_orders.data;
          } else {
            throw new Error('No purchase_orders found');
          }

        });
      },

      getPurchaseOrder: function(id) {
        return $http.get('http://janalex.beta.cirons.com/api/v1/purchase_orders' + '/' + id).then(function(item) {
          if (item) {
            return item.data;
          } else {
            throw new Error('No purchase_orders found');
          }

        });
      },

      addPurchaseOrder: function(data) {
        return $http({
          url: 'http://janalex.beta.cirons.com/api/v1/purchase_orders',
          method: 'POST',
          data: data
        }).then(function(item) {
          if (item) {
            return item.data;
          } else {
            throw new Error('PurchaseOrder could not be added!');
          }

        });

      },

      removePurchaseOrder: function(id) {
        return $http({
          url: 'http://janalex.beta.cirons.com/api/v1/purchase_orders/' + id,
          method: 'DELETE'
        }).then(function(item) {
          if (item) {
            return item.data;
          } else {
            throw new Error('PurchaseOrder could not be deleted!');
          }

        });

      },

      editPurchaseOrder: function(id, data) {
        return $http({
          url: 'http://janalex.beta.cirons.com/api/v1/purchase_orders/' + id,
          method: 'PUT',
          data: data
        }).then(function(item) {
          if (item) {
            return item.data;
          } else {
            throw new Error('PurchaseOrder could not be edited!');
          }

        });

      }
    }

  }

  purchaseOrdersFactory.$inject = ['$http', '$q'];

})();

},{}],86:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = purchaseOrdersRouter;

  function purchaseOrdersRouter($stateProvider) {
    $stateProvider
      .state('purchase_orders', {
        url: "/purchasing/purchase_orders",

        ncyBreadcrumb: {
          label: 'Purchase Orders',
          parent: 'purchasing',
        },
        views: {
          '': {
            templateUrl: 'components/purchasing/purchase_orders/purchase_orders.view.html',
            controller: 'purchaseOrdersController'

          },
          'purchaseOrdersList@purchase_orders': {
            templateUrl: 'components/purchasing/purchase_orders/purchase_orders_list.view.html',
          }
        }
      })

    .state('purchase_orders.create', {
      url: "/create",
      ncyBreadcrumb: {
        parent: 'purchase_orders',
        label: 'Write a PO'
      },
      views: {
        '': {
          templateUrl: 'components/purchasing/purchase_orders/purchase_orders.view.html'
        },
        'purchaseOrdersList@purchase_orders': {
          templateUrl: 'components/purchasing/purchase_orders/purchase_orders_list.view.html',

        },
        'purchaseOrdersContent@purchase_orders': {
          templateUrl: 'components/purchasing/purchase_orders/purchase_orders_create.view.html',
          controller: 'purchaseOrdersCRUDController'
        }
      }
    })

    .state('purchase_orders.item', {
      url: "/:id",
      params: {
        purchaseOrder: undefined
      },
      ncyBreadcrumb: {
        parent: 'purchase_orders',
        label: '{{id}}'
      },
      views: {
        '': {
          templateUrl: 'components/purchasing/purchase_orders/purchase_orders.view.html'
        },
        'purchaseOrdersList@purchase_orders': {
          templateUrl: 'components/purchasing/purchase_orders/purchase_orders_list.view.html',

        },
        'purchaseOrdersContent@purchase_orders': {
          templateUrl: 'components/purchasing/purchase_orders/purchase_orders_content.view.html',
          controller: 'purchaseOrdersSingleItemController'
        }
      }
    });

  }

  purchaseOrdersRouter.$inject = ['$stateProvider'];

})();

},{}],87:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = purchaseOrdersCRUDController;

  function purchaseOrdersCRUDController($scope, $stateParams, purchaseOrdersFactory, lodash, suppliersFactory, settingsFactory, orderRowsFactory, productsFactory, $state) {

    $scope.addPurchaseOrder = function() {
        if(!$scope.purchaseOrder.supplier){
            alert("You need to select a supplier!");
            return;
        }
      $scope.purchaseOrder.supplier_id = $scope.purchaseOrder.supplier.id;
      purchaseOrdersFactory.addPurchaseOrder($scope.purchaseOrder).then(function(added) {
        $scope.purchaseOrders.unshift(added);
        $state.go('purchase_orders.item', {id: added.id, purchaseOrder: added});
      });
    };
    $scope.purchaseOrder = {
        date: new Date(),
        supplier: null,
        delivery_address: {}
    };
    $scope.purchaseOrder.order_rows = [];

    $scope.suppliers = [];
    $scope.getSuppliers = function(){
        suppliersFactory.getSuppliers().then(function(suppliers){
            $scope.suppliers = suppliers;
        });
    };
    $scope.getSuppliers();

    $scope.newrow = {
        ordered: 0,
        q: 0,
        q_type: "0",
        vat_id: 0,
        price: 0,
        product: null,
        object_type: "PurchaseOrder"
    };

    $scope.addOrderRow = function(){
        var row = $scope.newrow;

        row.object_id = $scope.id;
        row.product_id = row.product.id;
        delete row.product;

        orderRowsFactory.addOrderRow(row).then(function(orderrow){
            console.log(orderrow);
            $scope.purchaseOrder.order_rows.push(orderrow);
            $scope.getTotals();

            $scope.newrow = {
                ordered: 0,
                q: 0,
                q_type: "0",
                vat_id: $scope.settings.vat_rules[0].id.toString(),
                price: 0,
                product: null,
                object_type: "PurchaseOrder"
            };
        })
    };

    $scope.updateRow = function(row){
        orderRowsFactory.editOrderRow(row.id, row).then(function(row){
            console.log("row updated");
        });
        $scope.getTotals();
    };

    $scope.settings = settingsFactory.getSettings();
    if(!$scope.settings.length){
        settingsFactory.initSettings().then(function(data){
            $scope.settings = data;
            $scope.newrow.vat_id = $scope.settings.vat_rules[0].id;
        });
    } else {

    }

    $scope.settings = settingsFactory.getSettings();
    if(!$scope.settings.length){
        settingsFactory.initSettings().then(function(data){
            $scope.settings = data;
            $scope.newrow.vat_id = $scope.settings.vat_rules[0].id;
        });
    } else {

    }

    $scope.getTotals = function(){
        if(!$scope.purchaseOrder){
            return;
        }
        console.log("calc totals");
        $scope.subTotal = 0;
        $scope.grandTotal = 0;
        $scope.totalVAT = 0;

        for(var i = 0; i < $scope.purchaseOrder.order_rows.length; i++){
            var row = $scope.purchaseOrder.order_rows[i];
            console.log(row);
            $scope.subTotal += row.q * row.price;
            $scope.totalVAT += (row.q * row.price) * ( row.vat / 100 );
        }
        $scope.grandTotal = $scope.subTotal + $scope.totalVAT;
        console.log($scope.subTotal, $scope.totalVAT, $scope.grandTotal);
    };

    $scope.getTotals();

    $scope.products = [];

    productsFactory.getProducts().then(function(products){
        $scope.products = products;
    });

  }

  purchaseOrdersCRUDController.$inject = ['$scope', '$stateParams', 'purchaseOrdersFactory', 'lodash', 'suppliersFactory', 'settingsFactory', 'orderRowsFactory', 'productsFactory', '$state'];

})();

},{}],88:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = purchaseOrdersSingleItemController;

  function purchaseOrdersSingleItemController($scope, $stateParams, purchaseOrdersFactory, suppliersFactory, settingsFactory, lodash, orderRowsFactory, productsFactory) {
    $scope.purchaseOrder = $stateParams.purchaseOrder;
    $scope.id = $stateParams.id;


    $scope.changeSupplier = false;
    $scope.checkSupplier = function(){
        if(!$scope.purchaseOrder){
            return;
        }
        if($scope.purchaseOrder.supplier){
            $scope.changeSupplier = false;
        } else {
            $scope.changeSupplier = true;
        }
    };
    $scope.checkSupplier();

    if (!$scope.purchaseOrder) {
      purchaseOrdersFactory.getPurchaseOrder($scope.id).then(function(item) {
        $scope.purchaseOrder = item;
        $scope.checkSupplier();
        $scope.getSuppliers();
        $scope.getTotals();
      });
    }

    $scope.suppliers = [];
    $scope.getSuppliers = function(){
        suppliersFactory.getSuppliers().then(function(suppliers){
            $scope.suppliers = suppliers;
        });
    };
    $scope.getSuppliers();

    $scope.newrow = {
        ordered: 0,
        q: 0,
        q_type: "0",
        vat_id: 0,
        price: 0,
        product: null,
        object_type: "PurchaseOrder"
    };

    $scope.addOrderRow = function(){
        var row = $scope.newrow;

        row.object_id = $scope.id;
        row.product_id = row.product.id;
        delete row.product;

        orderRowsFactory.addOrderRow(row).then(function(orderrow){
            console.log(orderrow);
            $scope.purchaseOrder.order_rows.push(orderrow);
            $scope.getTotals();

            $scope.newrow = {
                ordered: 0,
                q: 0,
                q_type: "0",
                vat_id: $scope.settings.vat_rules[0].id.toString(),
                price: 0,
                product: null,
                object_type: "PurchaseOrder"
            };
        })
    };

    $scope.updateRow = function(row){
        orderRowsFactory.editOrderRow(row.id, row).then(function(row){
            console.log("row updated");
        });
        $scope.getTotals();
    };

    $scope.settings = settingsFactory.getSettings();
    if(!$scope.settings.length){
        settingsFactory.initSettings().then(function(data){
            $scope.settings = data;
            $scope.newrow.vat_id = $scope.settings.vat_rules[0].id;
        });
    } else {

    }

    $scope.getTotals = function(){
        if(!$scope.purchaseOrder){
            return;
        }
        console.log("calc totals");
        $scope.subTotal = 0;
        $scope.grandTotal = 0;
        $scope.totalVAT = 0;

        for(var i = 0; i < $scope.purchaseOrder.order_rows.length; i++){
            var row = $scope.purchaseOrder.order_rows[i];
            console.log(row);
            $scope.subTotal += row.q * row.price;
            $scope.totalVAT += (row.q * row.price) * ( row.vat / 100 );
        }
        $scope.grandTotal = $scope.subTotal + $scope.totalVAT;
        console.log($scope.subTotal, $scope.totalVAT, $scope.grandTotal);
    };

    $scope.getTotals();

    $scope.onSupplierSelect = function($item, $model, $label){
        if($scope.newSupplier.id){
            purchaseOrdersFactory.editPurchaseOrder($scope.id, {
                supplier_id: $scope.newSupplier.id
            }).then(function(edited){
                $scope.purchaseOrder.supplier = $scope.newSupplier;
                $scope.newSupplier = null;
                $scope.changeSupplier = false;

                var findItem = lodash.find($scope.contacts, function(arg) {
                  return arg.id === $stateParams.id;
                });
                if (findItem) {
                  findItem = edited;
                }
            });
        }
    };

    $scope.products = [];

    productsFactory.getProducts().then(function(products){
        $scope.products = products;
    });

    $scope.changeStep = function(step){
        purchaseOrdersFactory.editPurchaseOrder($scope.id, {
            step: step
        }).then(function(data){
            $scope.purchaseOrder.step = data.step;
            $scope.purchaseOrder.steps = data.steps;
        });
    };

    $scope.changeAddress = function(){
        purchaseOrdersFactory.editPurchaseOrder($scope.id, {
            delivery_address: $scope.purchaseOrder.address
        }).then(function(data){

        });
    };

    $scope.downloadRFQ = function(){
        console.log("download as pdf");
        $scope.changeStep('rfq');
        window.open('/purchase_orders/2/pdf/rfq', 'rfqpdf');
    };
    $scope.downloadPO = function(){
        console.log("download as pdf");
        window.open('/purchase_orders/2/pdf/po', 'popdf');
    };

    $scope.newSupplier = null;



  }

  purchaseOrdersSingleItemController.$inject = ['$scope', '$stateParams', 'purchaseOrdersFactory', 'suppliersFactory', 'settingsFactory', 'lodash', 'orderRowsFactory', 'productsFactory'];

})();

},{}],89:[function(require,module,exports){
(function(){
"use strict";

angular.module('CIRONS-MAIN-APP')
    .controller('purchasingController', require('./purchasing.ngcontroller'))
    .factory('purchasingFactory', require('./purchasing.ngfactory'))
    .config(require('./purchasing.ngrouter'));

})();

},{"./purchasing.ngcontroller":90,"./purchasing.ngfactory":91,"./purchasing.ngrouter":92}],90:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = purchasingController;

  function purchasingController($scope, purchaseOrdersFactory) {
      $scope.ordersCount = 0;

      purchaseOrdersFactory.getPurchaseOrders().then(function(orders){
          $scope.ordersCount = orders.length;
      });
  }

  purchasingController.$inject = ['$scope', 'purchaseOrdersFactory'];

})();

},{}],91:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = purchasingFactory;

  function purchasingFactory($http, $q) {

    return {

    };

  }

  purchasingFactory.$inject = ['$http', '$q'];

})();

},{}],92:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = purchasingRouter;

  function purchasingRouter($stateProvider) {
    $stateProvider
      .state('purchasing', {
        url: "/purchasing",
        controller: 'purchasingController',
        templateUrl: "components/purchasing/purchasing.view.html",

      })


  }

  purchasingRouter.$inject = ['$stateProvider'];

})();

},{}],93:[function(require,module,exports){
(function() {
  "use strict";

  angular.module('CIRONS-MAIN-APP')
    .controller('contactsController', require('./contacts.ngcontroller'))
    .controller('contactsCRUDController', require('./contacts_crud.ngcontroller'))
    .controller('contactsSingleItemController', require('./contacts_item.ngcontroller'))
    .factory('contactsFactory', require('./contacts.ngfactory'))
    .config(require('./contacts.ngrouter'));

})();

},{"./contacts.ngcontroller":94,"./contacts.ngfactory":95,"./contacts.ngrouter":96,"./contacts_crud.ngcontroller":97,"./contacts_item.ngcontroller":98}],94:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = contactsController;

  function contactsController($scope, $rootScope, $auth, contactsFactory, $state) {

    contactsFactory.getContacts().then(function(contacts) {
      $scope.contacts = contacts;
    });



  }

  contactsController.$inject = ['$scope', '$rootScope', '$auth', 'contactsFactory', '$state'];

})();

},{}],95:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = contactsFactory;

  function contactsFactory($http, $q) {

    return {

      getContacts: function() {
        return $http.get('http://janalex.beta.cirons.com/api/v1/contacts').then(function(contacts) {
          if (contacts) {
            return contacts.data;
          } else {
            throw new Error('No contacts found');
          }

        });
      },

      countContacts: function() {
        return $http.get('http://janalex.beta.cirons.com/api/v1/contacts?count').then(function(contacts) {
          if (contacts) {
            return contacts.data;
          } else {
            throw new Error('No contacts found');
          }

        });
      },

      getContact: function(id) {
        return $http.get('http://janalex.beta.cirons.com/api/v1/contacts' + '/' + id).then(function(item) {
          if (item) {
            return item.data;
          } else {
            throw new Error('No contacts found');
          }

        });
      },

      addContact: function(data) {
        return $http({
          url: 'http://janalex.beta.cirons.com/api/v1/contacts',
          method: 'POST',
          data: data
        }).then(function(item) {
          if (item) {
            return item.data;
          } else {
            throw new Error('Contact could not be added!');
          }

        });

      },

      removeContact: function(id) {
        return $http({
          url: 'http://janalex.beta.cirons.com/api/v1/contacts/' + id,
          method: 'DELETE'
        }).then(function(item) {
          if (item) {
            return item.data;
          } else {
            throw new Error('Contact could not be deleted!');
          }

        });

      },

      editContact: function(id, data) {
        return $http({
          url: 'http://janalex.beta.cirons.com/api/v1/contacts/' + id,
          method: 'PUT',
          data: data
        }).then(function(item) {
          if (item) {
            return item.data;
          } else {
            throw new Error('Contact could not be edited!');
          }

        });

      }
    }

  }

  contactsFactory.$inject = ['$http', '$q'];

})();

},{}],96:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = contactsRouter;

  function contactsRouter($stateProvider) {
    $stateProvider
      .state('contacts', {
        url: "/sales/contacts",

        ncyBreadcrumb: {
          label: 'Contacts',
          parent: 'sales',
        },
        views: {
          '': {
            templateUrl: 'components/sales/contacts/contacts.view.html',
            controller: 'contactsController'

          },
          'contactsList@contacts': {
            templateUrl: 'components/sales/contacts/contacts_list.view.html',
          }
        }
      })

    .state('contacts.create', {
      url: "/create",
      ncyBreadcrumb: {
        parent: 'contacts',
        label: 'Write a Contact'
      },
      views: {
        '': {
          templateUrl: 'components/sales/contacts/contacts.view.html'
        },
        'contactsList@contacts': {
          templateUrl: 'components/sales/contacts/contacts_list.view.html',

        },
        'contactsContent@contacts': {
          templateUrl: 'components/sales/contacts/contacts_create.view.html',
          controller: 'contactsCRUDController'
        }
      }
    })

    .state('contacts.item', {
      url: "/:id",
      params: {
        contact: undefined
      },
      ncyBreadcrumb: {
        parent: 'contacts',
        label: '{{id}}'
      },
      views: {
        '': {
          templateUrl: 'components/sales/contacts/contacts.view.html'
        },
        'contactsList@contacts': {
          templateUrl: 'components/sales/contacts/contacts_list.view.html',

        },
        'contactsContent@contacts': {
          templateUrl: 'components/sales/contacts/contacts_content.view.html',
          controller: 'contactsSingleItemController'
        }
      }
    });

  }

  contactsRouter.$inject = ['$stateProvider'];

})();

},{}],97:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = contactsCRUDController;

  function contactsCRUDController($scope, $stateParams, contactsFactory, lodash, $state) {

    $scope.contact = {};

    $scope.addContact = function() {
      contactsFactory.addContact($scope.contact).then(function(added) {
        $scope.contacts.unshift(added);
        $state.go("contacts.item", {id: added.id, contact: added});
      });
    };

    $scope.cancel = function(){
        $state.go("contacts");
    };

  }

  contactsCRUDController.$inject = ['$scope', '$stateParams', 'contactsFactory', 'lodash', '$state'];

})();

},{}],98:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = contactsSingleItemController;

  function contactsSingleItemController($scope, $stateParams, contactsFactory, lodash) {
    $scope.contact = $stateParams.contact;
    $scope.id = $stateParams.id;


    if (!$scope.contact) {
      contactsFactory.getContact($scope.id).then(function(item) {
        $scope.contact = item;
      });
    }

    $scope.saveContact = function(){
        contactsFactory.editContact($scope.id, $scope.contact).then(function(contact){
            var findItem = lodash.find($scope.contacts, function(arg) {
              return arg.id === $stateParams.id;
            });
            if (findItem) {
              findItem = contact;
            }
        });
    };

  }

  contactsSingleItemController.$inject = ['$scope', '$stateParams', 'contactsFactory', 'lodash'];

})();

},{}],99:[function(require,module,exports){
(function() {
  "use strict";

  angular.module('CIRONS-MAIN-APP')
    .controller('invoicesController', require('./invoices.ngcontroller'))
    .controller('invoicesCreateController', require('./invoices_create.ngcontroller'))
    .controller('invoicesCRUDController', require('./invoices_crud.ngcontroller'))
    .controller('invoicesSingleItemController', require('./invoices_item.ngcontroller'))
    .factory('invoicesFactory', require('./invoices.ngfactory'))
    .factory('paymentsFactory', require('./payments.ngfactory'))
    .config(require('./invoices.ngrouter'));

})();

},{"./invoices.ngcontroller":100,"./invoices.ngfactory":101,"./invoices.ngrouter":102,"./invoices_create.ngcontroller":103,"./invoices_crud.ngcontroller":104,"./invoices_item.ngcontroller":105,"./payments.ngfactory":106}],100:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = invoicesController;

  function invoicesController($scope, $rootScope, $auth, invoicesFactory, $state, infoFactory, $filter) {

    invoicesFactory.getInvoices().then(function(invoices) {
      $scope.invoices = invoices;
      for(var i = 0; i < $scope.invoices.length; i++){
          $scope.invoices[i].invoice_no = parseInt($scope.invoices[i].invoice_no);
          $scope.invoices[i].date = new Date($scope.invoices[i].date);
      }
    });

    $scope.search = {
        step: '',
        contact: {
            name: ''
        }
    };

    $scope.lastDate = null;
    $scope.newLastDate = function(date){
        $scope.lastDate = date;
        return true;
    };

    $scope.statuses = [];
    var statuses = infoFactory.statuses["Invoice"];
    for(var status in statuses){
        var s = statuses[status];
        s.step = status;
        $scope.statuses.push(s);
    }

    $scope.orderByKey = "invoice_no";
    $scope.orderByReverse = true;

    $scope.dateStart = null;
    $scope.dateEnd = null;

    $scope.filtered = function(){
        var items = $scope.invoices;

        if($scope.dateStart){
            items = $filter('dateRange')(items, 'date', $scope.dateStart, $scope.dateEnd);
        }

        return items;
    };

  }

  invoicesController.$inject = ['$scope', '$rootScope', '$auth', 'invoicesFactory', '$state', 'infoFactory', '$filter'];

})();

},{}],101:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = invoicesFactory;

  function invoicesFactory($http, $q) {

    return {

      getInvoices: function() {
        return $http.get('http://janalex.beta.cirons.com/api/v1/invoices').then(function(invoices) {
          if (invoices) {
            return invoices.data;
          } else {
            throw new Error('No invoices found');
          }

        });
      },

      countInvoices: function() {
        return $http.get('http://janalex.beta.cirons.com/api/v1/invoices?count').then(function(invoices) {
          if (invoices) {
            return invoices.data;
          } else {
            throw new Error('No invoices found');
          }

        });
      },

      getUnpaidInvoices: function() {
        return $http.get('http://janalex.beta.cirons.com/api/v1/invoices/not_step/paid').then(function(invoices) {
          if (invoices) {
            return invoices.data;
          } else {
            throw new Error('No invoices found');
          }

        });
      },

      getUnpaidInvoicesCount: function() {
        return $http.get('http://janalex.beta.cirons.com/api/v1/invoices/not_step/paid?count').then(function(invoices) {
          if (invoices) {
            return invoices.data;
          } else {
            throw new Error('No invoices found');
          }

        });
      },

      getUnpaidInvoicesSum: function() {
        return $http.get('http://janalex.beta.cirons.com/api/v1/invoices/unpaid/sum').then(function(invoices) {
          if (invoices) {
            return invoices.data;
          } else {
            throw new Error('No invoices found');
          }

        });
      },

      getInvoice: function(id) {
        return $http.get('http://janalex.beta.cirons.com/api/v1/invoices' + '/' + id).then(function(item) {
          if (item) {
            return item.data;
          } else {
            throw new Error('No invoices found');
          }

        });
      },

      addInvoice: function(data) {
        return $http({
          url: 'http://janalex.beta.cirons.com/api/v1/invoices',
          method: 'POST',
          data: data
        }).then(function(item) {
          if (item) {
            return item.data;
          } else {
            throw new Error('Invoice could not be added!');
          }

        });

      },

      removeInvoice: function(id) {
        return $http({
          url: 'http://janalex.beta.cirons.com/api/v1/invoices/' + id,
          method: 'DELETE'
        }).then(function(item) {
          if (item) {
            return item.data;
          } else {
            throw new Error('Invoice could not be deleted!');
          }

        });

      },

      editInvoice: function(id, data) {
        return $http({
          url: 'http://janalex.beta.cirons.com/api/v1/invoices/' + id,
          method: 'PUT',
          data: data
        }).then(function(item) {
          if (item) {
            return item.data;
          } else {
            throw new Error('Invoice could not be edited!');
          }

        });

        },

        bookInvoice: function(id) {
          return $http({
            url: 'http://janalex.beta.cirons.com/api/v1/invoices/' + id + '/book',
            method: 'PUT'
          }).then(function(item) {
            if (item) {
              return item.data;
            } else {
              throw new Error('Invoice could not be edited!');
            }

          });

        }


    }

  }

  invoicesFactory.$inject = ['$http', '$q'];

})();

},{}],102:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = invoicesRouter;

  function invoicesRouter($stateProvider) {
    $stateProvider
      .state('invoices', {
        url: "/sales/invoices",

        ncyBreadcrumb: {
          label: 'Invoices',
          parent: 'sales',
        },
        views: {
          '': {
            templateUrl: 'components/sales/invoices/invoices_table.view.html',
            controller: 'invoicesController'
          }
        //   ,
        //   'invoicesList@invoices': {
        //     templateUrl: 'components/sales/invoices/invoices_list.view.html',
        //   }
        }
      })

    .state('invoices.create', {
      url: "/create",
      ncyBreadcrumb: {
        parent: 'invoices',
        label: 'Create an Invoice'
      },
      views: {
        '@': {
          templateUrl: 'components/sales/invoices/invoices.view.html'
        },
        'invoicesList@invoices.create': {
          templateUrl: 'components/sales/invoices/invoices_list.view.html',
          controller: 'invoicesController'
        },
        'invoicesContent@invoices.create': {
          templateUrl: 'components/sales/invoices/invoices_create.view.html',
          controller: 'invoicesCreateController'
        }
      }
    })

    .state('invoices.item', {
      url: "/:id",
      abstract: true,
      params: {
        invoice: undefined
      },
      ncyBreadcrumb: {
        parent: 'invoices',
        label: '{{id}}'
      },
      views: {
        '@': {
          templateUrl: 'components/sales/invoices/invoices.view.html'
        },
        'invoicesList@invoices.item': {
          templateUrl: 'components/sales/invoices/invoices_list.view.html',
          controller: 'invoicesController'
        },
        'invoicesContent@invoices.item': {
          templateUrl: 'components/sales/invoices/invoices_content.view.html',
          controller: 'invoicesSingleItemController'
        }
      }
    })

    .state("invoices.item.general", {
        url: "/general",
        parent: 'invoices.item',
        params: {
          invoice: undefined
        },
        ncyBreadcrumb: {
          parent: 'invoices.item',
          label: 'General'
        },
        views: {
            "tabContent@invoices.item": {
                templateUrl: 'components/sales/invoices/tabs/general.view.html'
            }
        }
    })

    .state("invoices.item.addresses", {
        url: "/addresses",
        parent: 'invoices.item',
        params: {
          invoice: undefined
        },
        ncyBreadcrumb: {
          parent: 'invoices.item',
          label: 'Addresses'
        },
        views: {
            "tabContent@invoices.item": {
                templateUrl: 'components/sales/invoices/tabs/addresses.view.html'
            }
        }
    })

    .state("invoices.item.profit", {
        url: "/profit",
        parent: 'invoices.item',
        params: {
          invoice: undefined
        },
        ncyBreadcrumb: {
          parent: 'invoices.item',
          label: 'Profit'
        },
        views: {
            "tabContent@invoices.item": {
                templateUrl: 'components/sales/invoices/tabs/profit.view.html'
            }
        }
    })

    .state("invoices.item.payments", {
        url: "/payments",
        parent: 'invoices.item',
        params: {
          invoice: undefined
        },
        ncyBreadcrumb: {
          parent: 'invoices.item',
          label: 'Payments'
        },
        views: {
            "tabContent@invoices.item": {
                templateUrl: 'components/sales/invoices/tabs/payments.view.html'
            }
        }
    })

    .state("invoices.item.accounting", {
        url: "/accounting",
        parent: 'invoices.item',
        params: {
          invoice: undefined
        },
        ncyBreadcrumb: {
          parent: 'invoices.item',
          label: 'Accounting'
        },
        views: {
            "tabContent@invoices.item": {
                templateUrl: 'components/sales/invoices/tabs/accounting.view.html'
            }
        }
    });

  }

  invoicesRouter.$inject = ['$stateProvider'];

})();

},{}],103:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = invoicesCreateController;

  function invoicesCreateController($scope, $stateParams, invoicesFactory, contactsFactory, orderRowsFactory, productsFactory, settingsFactory, lodash, $state) {

      $scope.contacts = [];
      $scope.products = [];
      productsFactory.getProducts().then(function(products){
          $scope.products = products;
      });

      contactsFactory.getContacts().then(function(contacts){
          $scope.contacts = contacts;
      });

      $scope.invoice = {
          order_rows: [],
          currency: null,
          price_list_id: 0,
          contact_id: 0,
          shipping_address: {},
          billing_address: {},
          vat_no: "",
          date: new Date(),
          shipping_cost: 0,
          invoice_fee: 0,
          due_date: new Date(),
          duedays: 14
      };

      $scope.settings = settingsFactory.getSettings();
      if(!$scope.settings.length){
          settingsFactory.initSettings().then(function(data){
              $scope.settings = data;
              $scope.invoice.currency = $scope.settings.options.default_currency;
              console.log("default_currency: ", $scope.settings.options.default_currency);
              $scope.newrow.vat_id = $scope.settings.vat_rules[0].id;
          });
      } else {
          $scope.invoice.currency = $scope.settings.options.default_currency;
      }

      $scope.contact = null;
      $scope.shipping_address = {};
      $scope.contactSelected = false;
      $scope.shippingAddressEdit = false;
      $scope.billingAddressEdit = false;

      $scope.newrow = {
          ordered: 0,
          q: 0,
          q_type: "0",
          vat_id: ($scope.settings.length ? $scope.settings.vat_rules[0].id : 0),
          price: 0,
          product: null,
          object_type: "Invoice"
      };

      $scope.addOrderRow = function(){
          var row = $scope.newrow;

          row.product_id = row.product.id;

          $scope.invoice.order_rows.push(row);
          $scope.getTotals();

          $scope.newrow = {
              ordered: 0,
              q: 0,
              q_type: "0",
              vat_id: $scope.settings.vat_rules[0].id,
              price: 0,
              product: null,
              object_type: "Invoice"
          };
          return true;

          orderRowsFactory.addOrderRow(row).then(function(orderrow){
              console.log(orderrow);
              $scope.invoice.order_rows.push(orderrow);
              $scope.getTotals();

              $scope.newrow = {
                  ordered: 0,
                  q: 0,
                  q_type: "0",
                  vat_id: $scope.vat_rules[0].id.toString(),
                  price: 0,
                  product: null,
                  object_type: "Invoice"
              };
          })
      };

      $scope.saveInvoice = function(){

          if($scope.contact){
              $scope.invoice.contact_id = $scope.contact.id;
          }

          if($scope.shipping_address){
              $scope.invoice.shipping_address = $scope.shipping_address;
              $scope.invoice.billing_address = $scope.shipping_address;
              delete $scope.invoice.shipping_address.id;
              delete $scope.invoice.billing_address.id;
          }

          invoicesFactory.addInvoice($scope.invoice).then(function(data){
              console.log("invoice saved");
              console.log(data);
              //$scope.invoices.unshift(data);
              $state.go("invoices.item.general", {id: data.id, invoice: data});
          });

      };

      $scope.subTotal = 0;
      $scope.grandTotal = 0;
      $scope.totalVAT = 0;
      $scope.getTotals = function(){
          if(!$scope.invoice){
              return;
          }
          console.log("calc totals");
          $scope.subTotal = 0;
          $scope.grandTotal = 0;
          $scope.totalVAT = 0;

          for(var i = 0; i < $scope.invoice.order_rows.length; i++){
              var row = $scope.invoice.order_rows[i];
              console.log(row);
              $scope.subTotal += row.q * row.price;
              $scope.totalVAT += row.q * ( (row.vat / 100) + 1 );
          }
          $scope.grandTotal = $scope.subTotal + $scope.totalVAT;
          console.log($scope.subTotal, $scope.totalVAT, $scope.grandTotal);
      };
      $scope.getTotals();


      $scope.updateRow = function(row){
          orderRowsFactory.editOrderRow(row.id, row).then(function(row){
              console.log("row updated");
          });
          $scope.getTotals();
      };

      $scope.contactOnSelect = function($item, $model, $label){
          console.log($item, $model, $label);
          var billing = $item.address;
          $scope.contactSelected = true;
          $scope.shipping_address = billing;
          $scope.billing_address = $item.address;
          $scope.invoice.vat_no = $item.vat_no;
      };

  }

  invoicesCreateController.$inject = ['$scope', '$stateParams', 'invoicesFactory', 'contactsFactory', 'orderRowsFactory', 'productsFactory', 'settingsFactory', 'lodash', '$state'];

})();

},{}],104:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = invoicesCRUDController;

  function invoicesCRUDController($scope, $stateParams, invoicesFactory, lodash) {

    $scope.addInvoice = function() {
      invoicesFactory.addInvoice($scope.invoice).then(function(added) {
        $scope.invoices.push(added);
      });
    };

    $scope.removeInvoice = function() {
      invoicesFactory.removeInvoice($stateParams.id);
    };

    $scope.editInvoice = function(data) {
      invoicesFactory.editInvoice($stateParams.id, data).then(function(edited) {

        var findItem = lodash.find($scope.invoices, function(arg) {
          return arg.id === $stateParams.id;
        });

        if (findItem) {
          findItem = edited;
        }

      });
    };

  }

  invoicesCRUDController.$inject = ['$scope', '$stateParams', 'invoicesFactory', 'lodash'];

})();

},{}],105:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = invoicesSingleItemController;

  function invoicesSingleItemController($scope, $stateParams, invoicesFactory, contactsFactory, orderRowsFactory, productsFactory, $state, lodash, settingsFactory, paymentsFactory) {
    $scope.invoice = $stateParams.invoice;
    $scope.id = $stateParams.id;

    $scope.editContact = false;
    $scope.newContact = null;

    $scope.contacts = [];
    $scope.products = [];

    productsFactory.getProducts().then(function(products){
        $scope.products = products;
    });



    if (!$scope.invoice) {
      invoicesFactory.getInvoice($scope.id).then(function(item) {
        $scope.invoice = item;
        $scope.getTotals();
        $scope.formatInvoice();
      });
    }

    $scope.changeDates = function(){
        invoicesFactory.editInvoice($scope.id, {
            date: $scope.invoice.date,
            duedays: $scope.invoice.duedays
        }).then(function(edited){
            console.log("invoice date edited");
        })
    };

    $scope.formatInvoice = function(){
        if($scope.invoice){
            $scope.invoice.date = new Date($scope.invoice.date);
        }
    };

    $scope.getContacts = function(){
        if($scope.contacts.length){
            return;
        }
        contactsFactory.getContacts().then(function(contacts){
            $scope.contacts = contacts;
        });
    }

    $scope.newrow = {
        ordered: 0,
        q: 0,
        q_type: "0",
        vat_id: 0,
        vat: 0,
        price: 0,
        product: null,
        object_type: "Invoice"
    };

    $scope.settings = settingsFactory.getSettings();
    if(!$scope.settings.length){
        settingsFactory.initSettings().then(function(data){
            $scope.settings = data;
            $scope.newrow.vat_id = $scope.settings.vat_rules[0].id;
        });
    } else {

    }

    $scope.getTotals = function(){
        if(!$scope.invoice){
            return;
        }
        console.log("calc totals");
        $scope.subTotal = 0;
        $scope.grandTotal = 0;
        $scope.totalVAT = 0;

        for(var i = 0; i < $scope.invoice.order_rows.length; i++){
            var row = $scope.invoice.order_rows[i];
            console.log(row);
            $scope.subTotal += row.q * row.price;
            $scope.totalVAT += (row.q * row.price) * ( row.vat / 100 );
        }
        $scope.grandTotal = $scope.subTotal + $scope.totalVAT;
        $scope.getDebt();
        console.log($scope.subTotal, $scope.totalVAT, $scope.grandTotal);
    };

    $scope.savePayment = function(){
        var payment = $scope.newPayment;
        payment.object_type = "Invoice";
        payment.object_id = $scope.id;
        paymentsFactory.addPayment(payment).then(function(data){
            console.log("payment added");
            $scope.invoice.payments.push(data);
            $scope.cleanNewPayment();
            $scope.getDebt();
            $scope.addPayment = false;

            if($scope.totalDebt <= 10 && $scope.invoice != "paid"){
                $scope.changeStep("paid");
            }
        });
    };

    $scope.totalDebt = 0;
    $scope.getDebt = function(){
        if(!$scope.invoice.payments){
            return false;
        }
        console.log("getDebt");
        console.log($scope.invoice.payments);
        $scope.totalDebt = $scope.grandTotal;

        for(var i = 0; i < $scope.invoice.payments.length; i++){
            var payment = $scope.invoice.payments[i];
            $scope.totalDebt -= payment.amount;
        }
    };

    $scope.addPayment = false;
    $scope.newPayment = {};
    $scope.cleanNewPayment = function(){
        $scope.newPayment = {
            income_account_no: 0,
            date: new Date(),
            amount: 0
        };
    }
    $scope.cleanNewPayment();

    $scope.getTotals();

    $scope.addOrderRow = function(){
        var row = $scope.newrow;

        row.object_id = $scope.id;
        row.product_id = row.product.id;
        delete row.product;

        orderRowsFactory.addOrderRow(row).then(function(orderrow){
            console.log(orderrow);
            $scope.invoice.order_rows.push(orderrow);
            $scope.getTotals();

            $scope.newrow = {
                ordered: 0,
                q: 0,
                q_type: "0",
                vat_id: $scope.settings.vat_rules[0].id.toString(),
                price: 0,
                product: null,
                object_type: "Invoice"
            };
        })
    };

    $scope.updateRow = function(row){
        orderRowsFactory.editOrderRow(row.id, row).then(function(row){
            console.log("row updated");
        });
        $scope.getTotals();
    };

    $scope.changeShippingAddress = function(){
        console.log("change address");

        invoicesFactory.editInvoice($scope.id, {
            shipping_address: $scope.invoice.shipping_address
        }).then(function(invoice){
            $scope.invoice.shipping_address = invoice.shipping_address;
        });
    };

    $scope.changeBillingAddress = function(){
        console.log("change address");

        invoicesFactory.editInvoice($scope.id, {
            billing_address: $scope.invoice.billing_address
        }).then(function(invoice){
            $scope.invoice.billing_address = invoice.billing_address;
        });
    };

    $scope.saveContact = function(contact){
        console.log(contact);
        if(!contact.id){
            console.log("no new contact");
            return;
        }
        invoicesFactory.editInvoice($scope.id, {
            contact_id: contact.id
        }).then(function(order){
            $scope.invoice.contact = order.contact;
            console.log("contact saved");
            $scope.editContact = false;
            $scope.updateList(order);
        });
    },

    $scope.changeCurrency = function(){
        invoicesFactory.editInvoice($scope.id, {
            currency: $scope.invoice.currency
        }).then(function(data){
            console.log("currency changed");
        });
    };

    $scope.changeNotes = function(){
        invoicesFactory.editInvoice($scope.id, {
            notes: $scope.invoice.notes
        }).then(function(data){
            console.log("notes changed");
        });
    };

    $scope.changePriceList = function(){
        invoicesFactory.editInvoice($scope.id, {
            price_list_id: $scope.invoice.price_list_id
        }).then(function(data){
            console.log("price list changed");
        });
    };

    $scope.changeStep = function(step){
        invoicesFactory.editInvoice($scope.id, {
            step: step
        }).then(function(data){
            $scope.invoice.step = data.step;
            $scope.invoice.steps = data.steps;
        });
    };

    $scope.bookInvoice = function(){
        invoicesFactory.bookInvoice($scope.id).then(function(invoice){
            $scope.invoice.step = invoice.step;
            $scope.invoice.steps = invoice.steps;
        });
    };

    $scope.createCreditNote = function(){
        //do something with state
    };

  }

  invoicesSingleItemController.$inject = ['$scope', '$stateParams', 'invoicesFactory', 'contactsFactory', 'orderRowsFactory', 'productsFactory', '$state', 'lodash', 'settingsFactory', 'paymentsFactory'];

})();

},{}],106:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = paymentsFactory;

  function paymentsFactory($http, $q) {

    return {

      getPayments: function() {
        return $http.get('http://janalex.beta.cirons.com/api/v1/payments').then(function(payments) {
          if (payments) {
            return payments.data;
          } else {
            throw new Error('No payments found');
          }

        });
      },

      getPayment: function(id) {
        return $http.get('http://janalex.beta.cirons.com/api/v1/payments' + '/' + id).then(function(item) {
          if (item) {
            return item.data;
          } else {
            throw new Error('No payments found');
          }

        });
      },

      addPayment: function(data) {
        return $http({
          url: 'http://janalex.beta.cirons.com/api/v1/payments',
          method: 'POST',
          data: data
        }).then(function(item) {
          if (item) {
            return item.data;
          } else {
            throw new Error('Payment could not be added!');
          }

        });

      },

      removePayment: function(id) {
        return $http({
          url: 'http://janalex.beta.cirons.com/api/v1/payments/' + id,
          method: 'DELETE'
        }).then(function(item) {
          if (item) {
            return item.data;
          } else {
            throw new Error('Payment could not be deleted!');
          }

        });

      },

      editPayment: function(id, data) {
        return $http({
          url: 'http://janalex.beta.cirons.com/api/v1/payments/' + id,
          method: 'PUT',
          data: data
        }).then(function(item) {
          if (item) {
            return item.data;
          } else {
            throw new Error('Payment could not be edited!');
          }

        });

      }
    }

  }

  paymentsFactory.$inject = ['$http', '$q'];

})();

},{}],107:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = orderRowsFactory;

  function orderRowsFactory($http, $q) {

    return {

      getOrderRows: function() {
        return $http.get('http://janalex.beta.cirons.com/api/v1/order_rows').then(function(orderrows) {
          if (orderrows) {
            return orderrows.data;
          } else {
            throw new Error('No orderrows found');
          }

        });
      },

      getOrderRow: function(id) {
        return $http.get('http://janalex.beta.cirons.com/api/v1/order_rows' + '/' + id).then(function(item) {
          if (item) {
            return item.data;
          } else {
            throw new Error('No orderrows found');
          }

        });
      },

      addOrderRow: function(data) {
        return $http({
          url: 'http://janalex.beta.cirons.com/api/v1/order_rows',
          method: 'POST',
          data: data
        }).then(function(item) {
          if (item) {
            return item.data;
          } else {
            throw new Error('OrderRow could not be added!');
          }

        });

      },

      removeOrderRow: function(id) {
        return $http({
          url: 'http://janalex.beta.cirons.com/api/v1/order_rows/' + id,
          method: 'DELETE'
        }).then(function(item) {
          if (item) {
            return item.data;
          } else {
            throw new Error('OrderRow could not be deleted!');
          }

        });

      },

      editOrderRow: function(id, data) {
        return $http({
          url: 'http://janalex.beta.cirons.com/api/v1/order_rows/' + id,
          method: 'PUT',
          data: data
        }).then(function(item) {
          if (item) {
            return item.data;
          } else {
            throw new Error('OrderRow could not be edited!');
          }

        });

      }
    }

  }

  orderRowsFactory.$inject = ['$http', '$q'];

})();

},{}],108:[function(require,module,exports){
(function() {
  "use strict";

  angular.module('CIRONS-MAIN-APP')
    .controller('ordersController', require('./orders.ngcontroller'))
    .controller('ordersCreateController', require('./orders_create.ngcontroller'))
    .controller('ordersCRUDController', require('./orders_crud.ngcontroller'))
    .controller('ordersSingleItemController', require('./orders_item.ngcontroller'))
    .factory('ordersFactory', require('./orders.ngfactory'))
    .factory('orderRowsFactory', require('./order_rows.ngfactory'))
    .config(require('./orders.ngrouter'));

})();

},{"./order_rows.ngfactory":107,"./orders.ngcontroller":109,"./orders.ngfactory":110,"./orders.ngrouter":111,"./orders_create.ngcontroller":112,"./orders_crud.ngcontroller":113,"./orders_item.ngcontroller":114}],109:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = ordersController;

  function ordersController($scope, $rootScope, $auth, ordersFactory, $state, infoFactory, $filter) {

    ordersFactory.getOrders().then(function(orders) {
      $scope.orders = orders;
      for(var i = 0; i < $scope.orders.length; i++){
          $scope.orders[i].id = parseInt($scope.orders[i].id);
          $scope.orders[i].date = new Date($scope.orders[i].date);
      }
    });

    $scope.search = {
        step: '',
        contact: {
            name: ''
        }
    };

    $scope.lastDate = null;
    $scope.newLastDate = function(date){
        $scope.lastDate = date;
        return true;
    };

    $scope.statuses = [];
    var statuses = infoFactory.statuses["Order"];
    for(var status in statuses){
        var s = statuses[status];
        s.step = status;
        $scope.statuses.push(s);
    }

    $scope.orderByKey = "id";
    $scope.orderByReverse = true;

    $scope.dateStart = null;
    $scope.dateEnd = null;

    $scope.filtered = function(){
        var items = $scope.orders;

        if($scope.dateStart){
            items = $filter('dateRange')(items, 'date', $scope.dateStart, $scope.dateEnd);
        }

        return items;
    };

  }

  ordersController.$inject = ['$scope', '$rootScope', '$auth', 'ordersFactory', '$state', 'infoFactory', '$filter'];

})();

},{}],110:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = ordersFactory;

  function ordersFactory($http, $q) {

    return {

      getOrders: function() {
        return $http.get('http://janalex.beta.cirons.com/api/v1/orders').then(function(orders) {
          if (orders) {
            return orders.data;
          } else {
            throw new Error('No orders found');
          }

        });
      },

      countOrders: function() {
        return $http.get('http://janalex.beta.cirons.com/api/v1/orders?count').then(function(orders) {
          if (orders) {
            return orders.data;
          } else {
            throw new Error('No orders found');
          }

        });
      },

      getPendingOrders: function() {
        return $http.get('http://janalex.beta.cirons.com/api/v1/orders/step/pending').then(function(orders) {
          if (orders) {
            return orders.data;
          } else {
            throw new Error('No orders found');
          }

        });
      },

      getPendingOrdersCount: function() {
        return $http.get('http://janalex.beta.cirons.com/api/v1/orders/step/pending?count').then(function(orders) {
          if (orders) {
            return orders.data;
          } else {
            throw new Error('No orders found');
          }

        });
      },

      getPendingOrdersSum: function() {
        return $http.get('http://janalex.beta.cirons.com/api/v1/orders/pending/sum').then(function(orders) {
          if (orders) {
            return orders.data;
          } else {
            throw new Error('No orders found');
          }

        });
      },

      getOrder: function(id) {
        return $http.get('http://janalex.beta.cirons.com/api/v1/orders' + '/' + id).then(function(item) {
          if (item) {
            return item.data;
          } else {
            throw new Error('No orders found');
          }

        });
      },

      addOrder: function(data) {
        return $http({
          url: 'http://janalex.beta.cirons.com/api/v1/orders',
          method: 'POST',
          data: data
        }).then(function(item) {
          if (item) {
            return item.data;
          } else {
            throw new Error('Order could not be added!');
          }

        });

      },

      generateInvoice: function(id){
          return $http({
              url: 'http://janalex.beta.cirons.com/api/v1/orders/' + id + '/generate/invoice/',
              method: 'POST'
          }).then(function(invoice){
              if(invoice){
                  return invoice.data;
              } else {
                  throw new Error('Invoice could not be generated');
              }
          });
      },

      removeOrder: function(id) {
        return $http({
          url: 'http://janalex.beta.cirons.com/api/v1/orders/' + id,
          method: 'DELETE'
        }).then(function(item) {
          if (item) {
            return item.data;
          } else {
            throw new Error('Order could not be deleted!');
          }

        });

      },

      editOrder: function(id, data) {
        return $http({
          url: 'http://janalex.beta.cirons.com/api/v1/orders/' + id,
          method: 'PUT',
          data: data
        }).then(function(item) {
          if (item) {
            return item.data;
          } else {
            throw new Error('Order could not be edited!');
          }

        });

      }
    }

  }

  ordersFactory.$inject = ['$http', '$q'];

})();

},{}],111:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = ordersRouter;

  function ordersRouter($stateProvider) {
    $stateProvider
      .state('orders', {
        url: "/sales/orders",

        ncyBreadcrumb: {
          label: 'Orders',
          parent: 'sales',
        },
        views: {
          '': {
            templateUrl: 'components/sales/orders/orders_table.view.html',
            controller: 'ordersController'

          }
        //   ,
        //   'ordersList@orders.item': {
        //     templateUrl: 'components/sales/orders/orders_list.view.html',
        //   }
        }
      })

    .state('orders.create', {
      url: "/create",
      ncyBreadcrumb: {
        parent: 'orders',
        label: 'Create an Order'
      },
      views: {
        '@': {
          templateUrl: 'components/sales/orders/orders.view.html'
        },
        'ordersList@orders.create': {
          templateUrl: 'components/sales/orders/orders_list.view.html',
          controller: 'ordersController'
        },
        'ordersContent@orders.create': {
          templateUrl: 'components/sales/orders/orders_create.view.html',
          controller: 'ordersCreateController'
        }
      }
    })

    .state('orders.item', {
      url: "/:id",
      abstract: true,
      params: {
        order: undefined
      },
      ncyBreadcrumb: {
        parent: 'orders',
        label: '{{id}}'
      },
      views: {
        '@': {
          templateUrl: 'components/sales/orders/orders.view.html'
        },
        'ordersList@orders.item': {
          templateUrl: 'components/sales/orders/orders_list.view.html',
          controller: 'ordersController'
        },
        'ordersContent@orders.item': {
          templateUrl: 'components/sales/orders/orders_content.view.html',
          controller: 'ordersSingleItemController'
        }
      }
    })

    .state("orders.item.general", {
        url: "/general",
        parent: 'orders.item',
        params: {
          order: undefined
        },
        ncyBreadcrumb: {
          parent: 'orders.item',
          label: 'General'
        },
        views: {
            "tabContent": {
                templateUrl: 'components/sales/orders/tabs/general.view.html'
            }
        }
    })

    .state("orders.item.addresses", {
        url: "/addresses",
        parent: 'orders.item',
        params: {
          order: undefined
        },
        ncyBreadcrumb: {
          parent: 'orders.item',
          label: 'Addresses'
        },
        views: {
            "tabContent": {
                templateUrl: 'components/sales/orders/tabs/addresses.view.html'
            }
        }
    })

    .state("orders.item.profit", {
        url: "/profit",
        parent: 'orders.item',
        params: {
          order: undefined
        },
        ncyBreadcrumb: {
          parent: 'orders.item',
          label: 'Profit'
        },
        views: {
            "tabContent": {
                templateUrl: 'components/sales/orders/tabs/profit.view.html'
            }
        }
    });

  }

  ordersRouter.$inject = ['$stateProvider'];

})();

},{}],112:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = ordersCreateController;

  function ordersCreateController($scope, $stateParams, ordersFactory, contactsFactory, orderRowsFactory, productsFactory, settingsFactory, lodash, $state) {

      $scope.contacts = [];
      $scope.products = [];
      productsFactory.getProducts().then(function(products){
          $scope.products = products;
      });

      $scope.settings = settingsFactory.getSettings();
      if(!$scope.settings.length){
          settingsFactory.initSettings().then(function(data){
              $scope.settings = data;
              $scope.order.currency = $scope.settings.options.default_currency;
              console.log("default_currency: ", $scope.settings.options.default_currency);
              $scope.newrow.vat_id = $scope.settings.vat_rules[0].id;
          });
      } else {
          $scope.order.currency = $scope.settings.options.default_currency;
      }

      $scope.contact = null;
      $scope.shipping_address = {};
      $scope.contactSelected = false;
      $scope.addressEdit = false;
      $scope.order = {
          order_rows: [],
          currency: null,
          price_list_id: 0,
          contact_id: 0,
          shipping_address: {}
      };

      $scope.newrow = {
          ordered: 0,
          q: 0,
          q_type: "0",
          vat_id: ($scope.settings.length ? $scope.settings.vat_rules[0].id : 0),
          price: 0,
          product: null,
          object_type: "Order"
      };

      $scope.saveOrder = function(){

          if($scope.contact){
              $scope.order.contact_id = $scope.contact.id;
          }

          if($scope.shipping_address){
              $scope.order.shipping_address = $scope.shipping_address;
              delete $scope.order.shipping_address.id;
          }

          ordersFactory.addOrder($scope.order).then(function(data){
              console.log("order saved");
              console.log(data);
              //$scope.orders.unshift(data);
              $state.go("orders.item.general", {id: data.id, order: data});
          });

      };

      $scope.addOrderRow = function(){
          var row = $scope.newrow;

          row.product_id = row.product.id;

          $scope.order.order_rows.push(row);
          $scope.getTotals();

          $scope.newrow = {
              ordered: 0,
              q: 0,
              q_type: "0",
              vat_id: $scope.settings.vat_rules[0].id,
              price: 0,
              product: null,
              object_type: "Order"
          };
          return true;

          orderRowsFactory.addOrderRow(row).then(function(orderrow){
              console.log(orderrow);
              $scope.order.order_rows.push(orderrow);
              $scope.getTotals();

              $scope.newrow = {
                  ordered: 0,
                  q: 0,
                  q_type: "0",
                  vat_id: $scope.vat_rules[0].id.toString(),
                  price: 0,
                  product: null,
                  object_type: "Order"
              };
          })
      };

      $scope.subTotal = 0;
      $scope.grandTotal = 0;
      $scope.totalVAT = 0;
      $scope.getTotals = function(){
          if(!$scope.order){
              return;
          }
          console.log("calc totals");
          $scope.subTotal = 0;
          $scope.grandTotal = 0;
          $scope.totalVAT = 0;

          for(var i = 0; i < $scope.order.order_rows.length; i++){
              var row = $scope.order.order_rows[i];
              console.log(row);
              $scope.subTotal += row.q * row.price;
              $scope.totalVAT += row.q * ( (row.vat / 100) + 1 );
          }
          $scope.grandTotal = $scope.subTotal + $scope.totalVAT;
          console.log($scope.subTotal, $scope.totalVAT, $scope.grandTotal);
      };
      $scope.getTotals();

      $scope.updateRow = function(row){
          orderRowsFactory.editOrderRow(row.id, row).then(function(row){
              console.log("row updated");
          });
          $scope.getTotals();
      };

      contactsFactory.getContacts().then(function(contacts){
          $scope.contacts = contacts;
      });

      $scope.contactOnSelect = function($item, $model, $label){
          console.log($item, $model, $label);
          $scope.contactSelected = true;
          $scope.shipping_address = $item.address;
      };

  }

  ordersCreateController.$inject = ['$scope', '$stateParams', 'ordersFactory', 'contactsFactory', 'orderRowsFactory', 'productsFactory', 'settingsFactory', 'lodash', '$state'];

})();

},{}],113:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = ordersCRUDController;

  function ordersCRUDController($scope, $stateParams, ordersFactory, lodash) {

    $scope.addOrder = function() {
      ordersFactory.addOrder($scope.order).then(function(added) {
        $scope.orders.push(added);
      });
    };

    $scope.removeOrder = function() {
      ordersFactory.removeOrder($stateParams.id);
    };

    $scope.editOrder = function(data) {
      ordersFactory.editOrder($stateParams.id, data).then(function(edited) {

        var findItem = lodash.find($scope.orders, function(arg) {
          return arg.id === $stateParams.id;
        });

        if (findItem) {
          findItem = edited;
        }

      });
    };

  }

  ordersCRUDController.$inject = ['$scope', '$stateParams', 'ordersFactory', 'lodash'];

})();

},{}],114:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = ordersSingleItemController;

  function ordersSingleItemController($scope, $stateParams, ordersFactory, contactsFactory, orderRowsFactory, productsFactory, $state, lodash, $watch) {
    $scope.order = $stateParams.order;
    $scope.id = $stateParams.id;

    $scope.editContact = false;
    $scope.newContact = null;

    if (!$scope.order) {
      ordersFactory.getOrder($scope.id).then(function(item) {
        $scope.order = item;
        $scope.getTotals();
        $scope.vat_rules = $scope.order.vat_rules;
        $scope.newrow.vat_id = $scope.vat_rules[0].id.toString();
      });
    }

    $scope.newrow = {
        ordered: 0,
        q: 0,
        q_type: "0",
        vat_id: 0,
        price: 0,
        product: null,
        object_type: "Order"
    };

    if($scope.order){
        $scope.vat_rules = $scope.order.vat_rules;
        $scope.newrow.vat_id = $scope.vat_rules[0].id.toString();
    }

    $scope.addOrderRow = function(){
        var row = $scope.newrow;

        row.object_id = $scope.id;
        row.product_id = row.product.id;
        delete row.product;

        orderRowsFactory.addOrderRow(row).then(function(orderrow){
            console.log(orderrow);
            $scope.order.order_rows.push(orderrow);
            $scope.getTotals();

            $scope.newrow = {
                ordered: 0,
                q: 0,
                q_type: "0",
                vat_id: $scope.vat_rules[0].id.toString(),
                price: 0,
                product: null,
                object_type: "Order"
            };
        })
    };

    $scope.contacts = [];
    $scope.products = [];

    productsFactory.getProducts().then(function(products){
        $scope.products = products;
    });

    $scope.subTotal = 0;
    $scope.grandTotal = 0;
    $scope.totalVAT = 0;

    $scope.changeShippingAddress = function(){
        console.log("change address");

        ordersFactory.editOrder($scope.id, {
            shipping_address: $scope.order.shipping_address
        }).then(function(order){
            console.log(order);
            $scope.order.shipping_address = order.shipping_address;
        });
    };

    $scope.getTotals = function(){
        if(!$scope.order){
            return;
        }
        console.log("calc totals");
        $scope.subTotal = 0;
        $scope.grandTotal = 0;
        $scope.totalVAT = 0;

        for(var i = 0; i < $scope.order.order_rows.length; i++){
            var row = $scope.order.order_rows[i];
            console.log(row);
            $scope.subTotal += row.q * row.price;
            $scope.totalVAT += (row.q * row.price) * ( row.vat / 100 );
        }
        $scope.grandTotal = $scope.subTotal + $scope.totalVAT;
        console.log($scope.subTotal, $scope.totalVAT, $scope.grandTotal);
    };

    $scope.getTotals();

    $scope.getContacts = function(){
        if($scope.contacts.length){
            return;
        }
        contactsFactory.getContacts().then(function(contacts){
            $scope.contacts = contacts;
        });
    }

    $scope.updateList = function(edited){
        var findItem = lodash.find($scope.orders, function(order) {
          return order.id === $stateParams.id;
        });

        if (findItem) {
          findItem = edited;
        }
    };

    $scope.updateRow = function(row){
        orderRowsFactory.editOrderRow(row.id, row).then(function(row){
            console.log("row updated");
        });
        $scope.getTotals();
    };

    $scope.saveContact = function(contact){
        console.log(contact);
        if(!contact.id){
            console.log("no new contact");
            return;
        }
        ordersFactory.editOrder($scope.id, {
            contact_id: contact.id
        }).then(function(order){
            $scope.order.contact = order.contact;
            console.log("contact saved");
            $scope.editContact = false;
            $scope.updateList(order);
        });
    },

    $scope.changeCurrency = function(){
        ordersFactory.editOrder($scope.id, {
            currency: $scope.order.currency
        }).then(function(data){
            console.log("currency changed");
        });
    };

    $scope.changeNotes = function(){
        ordersFactory.editOrder($scope.id, {
            notes: $scope.order.notes
        }).then(function(data){
            console.log("notes changed");
        });
    };

    $scope.changePriceList = function(){
        ordersFactory.editOrder($scope.id, {
            price_list_id: $scope.order.price_list_id
        }).then(function(data){
            console.log("price list changed");
        });
    };

    $scope.changeStep = function(step){
        ordersFactory.editOrder($scope.id, {
            step: step
        }).then(function(data){
            $scope.order.step = data.step;
            $scope.order.steps = data.steps;
        });
    };

    $scope.isGeneratingInvoice = false;
    $scope.generateInvoice = function(){
        $scope.isGeneratingInvoice = true;
        ordersFactory.generateInvoice($scope.id).then(function(invoice){
            $scope.isGeneratingInvoice = false;
            $state.go('invoices.item.general', {id: invoice.id, invoice: invoice});
        });
    };

  }

  ordersSingleItemController.$inject = ['$scope', '$stateParams', 'ordersFactory', 'contactsFactory', 'orderRowsFactory', 'productsFactory', '$state', 'lodash'];

})();

},{}],115:[function(require,module,exports){
(function() {
  "use strict";

  angular.module('CIRONS-MAIN-APP')
    .controller('productsController', require('./products.ngcontroller'))
    .controller('productsCRUDController', require('./products_crud.ngcontroller'))
    .controller('productsSingleItemController', require('./products_item.ngcontroller'))
    .factory('productsFactory', require('./products.ngfactory'))
    .config(require('./products.ngrouter'));

})();

},{"./products.ngcontroller":116,"./products.ngfactory":117,"./products.ngrouter":118,"./products_crud.ngcontroller":119,"./products_item.ngcontroller":120}],116:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = productsController;

  function productsController($scope, $rootScope, $auth, productsFactory, $state) {

    productsFactory.getProducts().then(function(products) {
      $scope.products = products;
    });



  }

  productsController.$inject = ['$scope', '$rootScope', '$auth', 'productsFactory', '$state'];

})();

},{}],117:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = productsFactory;

  function productsFactory($http, $q) {

    return {

      getProducts: function() {
        return $http.get('http://janalex.beta.cirons.com/api/v1/products').then(function(products) {
          if (products) {
            return products.data;
          } else {
            throw new Error('No products found');
          }

        });
      },

      getProductStockFilters: function(filters){
          return $http.get('http://janalex.beta.cirons.com/api/v1/stocks/filter/?filter=' + filters).then(function(products) {
            if (products) {
              return products.data;
            } else {
              throw new Error('No products found');
            }
          });
      },

      countProducts: function() {
        return $http.get('http://janalex.beta.cirons.com/api/v1/products?count').then(function(products) {
          if (products) {
            return products.data;
          } else {
            throw new Error('No products found');
          }

        });
      },

      getProduct: function(id) {
        return $http.get('http://janalex.beta.cirons.com/api/v1/products' + '/' + id).then(function(item) {
          if (item) {
            return item.data;
          } else {
            throw new Error('No products found');
          }

        });
      },

      addProduct: function(data) {
        return $http({
          url: 'http://janalex.beta.cirons.com/api/v1/products',
          method: 'POST',
          data: data
        }).then(function(item) {
          if (item) {
            return item.data;
          } else {
            throw new Error('Product could not be added!');
          }

        });

      },

      removeProduct: function(id) {
        return $http({
          url: 'http://janalex.beta.cirons.com/api/v1/products/' + id,
          method: 'DELETE'
        }).then(function(item) {
          if (item) {
            return item.data;
          } else {
            throw new Error('Product could not be deleted!');
          }

        });

      },

      editProduct: function(id, data) {
        return $http({
          url: 'http://janalex.beta.cirons.com/api/v1/products/' + id,
          method: 'PUT',
          data: data
        }).then(function(item) {
          if (item) {
            return item.data;
          } else {
            throw new Error('Product could not be edited!');
          }

        });

      }
    }

  }

  productsFactory.$inject = ['$http', '$q'];

})();

},{}],118:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = productsRouter;

  function productsRouter($stateProvider) {
    $stateProvider
      .state('products', {
        url: "/sales/products",

        ncyBreadcrumb: {
          label: 'Products',
          parent: 'sales',
        },
        views: {
          '': {
            templateUrl: 'components/sales/products/products.view.html',
            controller: 'productsController'

          },
          'productsList@products': {
            templateUrl: 'components/sales/products/products_list.view.html',
          }
        }
      })

    .state('products.create', {
      url: "/create",
      ncyBreadcrumb: {
        parent: 'products',
        label: 'Write a Product'
      },
      views: {
        '': {
          templateUrl: 'components/sales/products/products.view.html'
        },
        'productsList@products': {
          templateUrl: 'components/sales/products/products_list.view.html',

        },
        'productsContent@products': {
          templateUrl: 'components/sales/products/products_create.view.html',
          controller: 'productsCRUDController'
        }
      }
    })

    .state('products.item', {
      url: "/:id",
      params: {
        product: undefined
      },
      ncyBreadcrumb: {
        parent: 'products',
        label: '{{id}}'
      },
      views: {
        '': {
          templateUrl: 'components/sales/products/products.view.html'
        },
        'productsList@products': {
          templateUrl: 'components/sales/products/products_list.view.html',

        },
        'productsContent@products': {
          templateUrl: 'components/sales/products/products_content.view.html',
          controller: 'productsSingleItemController'
        }
      }
    });

  }

  productsRouter.$inject = ['$stateProvider'];

})();

},{}],119:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = productsCRUDController;

  function productsCRUDController($scope, $stateParams, productsFactory, lodash, $state, settingsFactory, suppliersFactory) {

    $scope.addProduct = function() {
      $scope.product.supplier_id = $scope.product.supplier.id;
      productsFactory.addProduct($scope.product).then(function(added) {
        $scope.products.unshift(added);
        $state.go('products.item', {id: added.id, product: added});
      });
    };

    $scope.product = {
        name: "",
        supplier: null
    };

    $scope.settings = settingsFactory.getSettings();
    if(!$scope.settings.length){
        settingsFactory.initSettings().then(function(data){
            $scope.settings = data;
        });
    } else {

    }

    $scope.suppliers = [];
    $scope.getSuppliers = function(){
        suppliersFactory.getSuppliers().then(function(suppliers){
            $scope.suppliers = suppliers;
        });
    };
    $scope.getSuppliers();

  }

  productsCRUDController.$inject = ['$scope', '$stateParams', 'productsFactory', 'lodash', '$state', 'settingsFactory', 'suppliersFactory'];

})();

},{}],120:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = productsSingleItemController;

  function productsSingleItemController($scope, $stateParams, productsFactory, lodash, suppliersFactory, settingsFactory) {
    $scope.product = $stateParams.product;
    $scope.id = $stateParams.id;


    if (!$scope.product) {
      productsFactory.getProduct($scope.id).then(function(item) {
        $scope.product = item;
        $scope.checkSupplier();
        $scope.getSuppliers();
      });
    }

    $scope.suppliers = [];
    $scope.getSuppliers = function(){
        suppliersFactory.getSuppliers().then(function(suppliers){
            $scope.suppliers = suppliers;
        });
    };
    $scope.getSuppliers();

    $scope.saveProduct = function(){
        console.log("saving...");

        productsFactory.editProduct($scope.id, $scope.product).then(function(edited){
            console.log("saved");
        });
    };

    $scope.onSupplierSelect = function($item, $model, $label){
        if($scope.newSupplier.id){
            productsFactory.editProduct($scope.id, {
                supplier_id: $scope.newSupplier.id
            }).then(function(edited){
                $scope.product.supplier = $scope.newSupplier;
                $scope.newSupplier = null;
                $scope.changeSupplier = false;
            });
        }
    };

    $scope.settings = settingsFactory.getSettings();
    if(!$scope.settings.length){
        settingsFactory.initSettings().then(function(data){
            $scope.settings = data;
        });
    } else {

    }

    $scope.newSupplier = null;

    $scope.changeSupplier = false;
    $scope.checkSupplier = function(){
        if(!$scope.product){
            return;
        }
        if($scope.product.supplier){
            $scope.changeSupplier = false;
        } else {
            $scope.changeSupplier = true;
        }
    };
    $scope.checkSupplier();

    $scope.editName = function(name){
        productsFactory.editProduct($scope.id, {
            name: name
        }).then(function(product){
            var findItem = lodash.find($scope.products, function(arg) {
              return arg.id === $stateParams.id;
            });

            if (findItem) {
              findItem.name = product.name;
            }
        });
    };

  }

  productsSingleItemController.$inject = ['$scope', '$stateParams', 'productsFactory', 'lodash', 'suppliersFactory', 'settingsFactory'];

})();

},{}],121:[function(require,module,exports){
(function(){
"use strict";

angular.module('CIRONS-MAIN-APP')
    .controller('salesController', require('./sales.ngcontroller'))
    .factory('salesFactory', require('./sales.ngfactory'))
    .config(require('./sales.ngrouter'));

})();

},{"./sales.ngcontroller":122,"./sales.ngfactory":123,"./sales.ngrouter":124}],122:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = salesController;

  function salesController($scope, $filter, contactsFactory, invoicesFactory, ordersFactory, productsFactory) {

    contactsFactory.countContacts().then(function(contacts) {
      $scope.contactsCount = contacts;
    });

    invoicesFactory.getUnpaidInvoicesCount().then(function(invoices) {
      $scope.invoicesCount = invoices;
    });

    // invoicesFactory.getUnpaidInvoices().then(function(invoices) {
    //   $scope.unpaid = invoices;
    // });

    invoicesFactory.getUnpaidInvoicesSum().then(function(data) {
      $scope.unpaid_sum = data;
      $scope.invoicesCardSecondary = $filter('currency')(data, "SEK ", 2);
    });


    ordersFactory.getPendingOrdersCount().then(function(orders) {
      $scope.ordersCount = orders;
    });

    ordersFactory.getPendingOrders().then(function(orders) {
      $scope.pending = orders;
      $scope.cardCounter = orders.length;
    });

    ordersFactory.getPendingOrdersSum().then(function(data) {
      $scope.pending_sum = data;
      $scope.ordersCardSecondary = $filter('currency')(data, "SEK ", 2);
    });

    productsFactory.countProducts().then(function(products) {
      $scope.productsCount = products;



    });

  }

  salesController.$inject = ['$scope', '$filter', 'contactsFactory', 'invoicesFactory', 'ordersFactory', 'productsFactory'];

})();

},{}],123:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = salesFactory;

  function salesFactory($http, $q) {

    return {

    };

  }

  salesFactory.$inject = ['$http', '$q'];

})();

},{}],124:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = salesRouter;

  function salesRouter($stateProvider) {
    $stateProvider
      .state('sales', {
        url: "/sales",
        controller: 'salesController',
        templateUrl: "components/sales/sales.view.html",

      })


  }

  salesRouter.$inject = ['$stateProvider'];

})();

},{}],125:[function(require,module,exports){
(function(){
"use strict";

angular.module('CIRONS-MAIN-APP')
    .controller('stockController', require('./stock.ngcontroller'))
    .factory('stockFactory', require('./stock.ngfactory'))
    .config(require('./stock.ngrouter'));

})();

},{"./stock.ngcontroller":126,"./stock.ngfactory":127,"./stock.ngrouter":128}],126:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = stockController;

  function stockController($scope, productsFactory, warehousesFactory) {

      productsFactory.countProducts().then(function(products) {
        $scope.productsCount = products;
      });

      warehousesFactory.countWarehouses().then(function(count) {
        $scope.warehousesCount = count;
      });

  }

  stockController.$inject = ['$scope', 'productsFactory', 'warehousesFactory'];

})();

},{}],127:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = stockFactory;

  function stockFactory($http, $q) {

    return {

    };

  }

  stockFactory.$inject = ['$http', '$q'];

})();

},{}],128:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = stockRouter;

  function stockRouter($stateProvider) {
    $stateProvider
      .state('stock', {
        url: "/stock",
        controller: 'stockController',
        templateUrl: "components/stock/stock.view.html",

      })


  }

  stockRouter.$inject = ['$stateProvider'];

})();

},{}],129:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = stocksFactory;

  function stocksFactory($http, $q) {

    return {
        getStockFromWarehouse: function(warehouse_id){
            return $http.get('http://janalex.beta.cirons.com/api/v1/warehouses/' + warehouse_id + '/stock/').then(function(stock){
                if(stock){
                    return stock.data;
                } else {
                    throw new Error('cant get stock from warehouse');
                }
            });
        },

        updateStock: function(id, data){
            return $http.put('http://janalex.beta.cirons.com/api/v1/stocks/' + id, data).then(function(stock){
                if(stock){
                    return stock.data;
                } else {
                    throw new Error('cant update stock');
                }
            });
        },

        addToWarehouse: function(warehouse_id, data){
            return $http.post('http://janalex.beta.cirons.com/api/v1/warehouses/' + warehouse_id + '/stock/', data).then(function(stock){
                if(stock){
                    return stock.data;
                } else {
                    throw new Error('cant add to stock');
                }
            })
        }
    }

  }

  stocksFactory.$inject = ['$http', '$q'];

})();

},{}],130:[function(require,module,exports){
(function() {
  "use strict";

  angular.module('CIRONS-MAIN-APP')
    .controller('warehousesController', require('./warehouses.ngcontroller'))
    .controller('warehousesCRUDController', require('./warehouses_crud.ngcontroller'))
    .controller('warehousesSingleItemController', require('./warehouses_item.ngcontroller'))
    .factory('warehousesFactory', require('./warehouses.ngfactory'))
    .factory('stocksFactory', require('./stocks.ngfactory'))
    .config(require('./warehouses.ngrouter'));

})();

},{"./stocks.ngfactory":129,"./warehouses.ngcontroller":131,"./warehouses.ngfactory":132,"./warehouses.ngrouter":133,"./warehouses_crud.ngcontroller":134,"./warehouses_item.ngcontroller":135}],131:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = warehousesController;

  function warehousesController($scope, $rootScope, $auth, warehousesFactory, $state) {

    warehousesFactory.getWarehouses().then(function(warehouses) {
      $scope.warehouses = warehouses;
    });



  }

  warehousesController.$inject = ['$scope', '$rootScope', '$auth', 'warehousesFactory', '$state'];

})();

},{}],132:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = warehousesFactory;

  function warehousesFactory($http, $q) {

    return {

      getWarehouses: function() {
        return $http.get('http://janalex.beta.cirons.com/api/v1/warehouses').then(function(warehouses) {
          if (warehouses) {
            return warehouses.data;
          } else {
            throw new Error('No warehouses found');
          }

        });
      },

      countWarehouses: function(){
          return $http.get('http://janalex.beta.cirons.com/api/v1/warehouses?count').then(function(warehouses) {
            if (warehouses) {
              return warehouses.data;
            } else {
              throw new Error('No warehouses found');
            }

          });
      },

      getWarehouse: function(id) {
        return $http.get('http://janalex.beta.cirons.com/api/v1/warehouses' + '/' + id).then(function(item) {
          if (item) {
            return item.data;
          } else {
            throw new Error('No warehouses found');
          }

        });
      },

      addWarehouse: function(data) {
        return $http({
          url: 'http://janalex.beta.cirons.com/api/v1/warehouses',
          method: 'POST',
          data: data
        }).then(function(item) {
          if (item) {
            return item.data;
          } else {
            throw new Error('Warehouse could not be added!');
          }

        });

      },

      removeWarehouse: function(id) {
        return $http({
          url: 'http://janalex.beta.cirons.com/api/v1/warehouses/' + id,
          method: 'DELETE'
        }).then(function(item) {
          if (item) {
            return item.data;
          } else {
            throw new Error('Warehouse could not be deleted!');
          }

        });

      },

      editWarehouse: function(id, data) {
        return $http({
          url: 'http://janalex.beta.cirons.com/api/v1/warehouses/' + id,
          method: 'PUT',
          data: data
        }).then(function(item) {
          if (item) {
            return item.data;
          } else {
            throw new Error('Warehouse could not be edited!');
          }

        });

      }
    }

  }

  warehousesFactory.$inject = ['$http', '$q'];

})();

},{}],133:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = warehousesRouter;

  function warehousesRouter($stateProvider) {
    $stateProvider
      .state('warehouses', {
        url: "/stock/warehouses",

        ncyBreadcrumb: {
          label: 'Warehouses',
          parent: 'stock',
        },
        views: {
          '': {
            templateUrl: 'components/stock/warehouses/warehouses.view.html',
            controller: 'warehousesController'

          },
          'warehousesList@warehouses': {
            templateUrl: 'components/stock/warehouses/warehouses_list.view.html',
          }
        }
      })

    .state('warehouses.create', {
      url: "/create",
      ncyBreadcrumb: {
        parent: 'warehouses',
        label: 'Add a Warehouse'
      },
      views: {
        '': {
          templateUrl: 'components/stock/warehouses/warehouses.view.html'
        },
        'warehousesList@warehouses': {
          templateUrl: 'components/stock/warehouses/warehouses_list.view.html',

        },
        'warehousesContent@warehouses': {
          templateUrl: 'components/stock/warehouses/warehouses_create.view.html',
          controller: 'warehousesCRUDController'
        }
      }
    })

    .state('warehouses.item', {
      url: "/:id",
      params: {
        warehouse: undefined
      },
      ncyBreadcrumb: {
        parent: 'warehouses',
        label: '{{id}}'
      },
      views: {
        '': {
          templateUrl: 'components/stock/warehouses/warehouses.view.html'
        },
        'warehousesList@warehouses': {
          templateUrl: 'components/stock/warehouses/warehouses_list.view.html',

        },
        'warehousesContent@warehouses': {
          templateUrl: 'components/stock/warehouses/warehouses_content.view.html',
          controller: 'warehousesSingleItemController'
        }
      }
    });

  }

  warehousesRouter.$inject = ['$stateProvider'];

})();

},{}],134:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = warehousesCRUDController;

  function warehousesCRUDController($scope, $stateParams, warehousesFactory, lodash, $state) {

    $scope.warehouse = {
        name: '',
        address: {}
    };

    $scope.addWarehouse = function() {
      warehousesFactory.addWarehouse($scope.warehouse).then(function(added) {
        $scope.warehouses.push(added);
        $state.go('warehouses.item', {id: added.id, warehouse: added});
      });
    };

    $scope.removeWarehouse = function() {
      warehousesFactory.removeWarehouse($stateParams.id);
    };

    $scope.editWarehouse = function(data) {
      warehousesFactory.editWarehouse($stateParams.id, data).then(function(edited) {

        var findItem = lodash.find($scope.warehouses, function(arg) {
          return arg.id === $stateParams.id;
        });

        if (findItem) {
          findItem = edited;
        }

      });
    };

  }

  warehousesCRUDController.$inject = ['$scope', '$stateParams', 'warehousesFactory', 'lodash', '$state'];

})();

},{}],135:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = warehousesSingleItemController;

  function warehousesSingleItemController($scope, $stateParams, warehousesFactory, lodash, stocksFactory, productsFactory) {
    $scope.warehouse = $stateParams.warehouse;
    $scope.id = $stateParams.id;


    if (!$scope.warehouse) {
      warehousesFactory.getWarehouse($scope.id).then(function(item) {
        $scope.warehouse = item;
        $scope.getStock();
        $scope.getProducts();
      });
    }

    $scope.products = [];
    $scope.getProducts = function(){
        productsFactory.getProducts().then(function(products){
            $scope.products = products;
        });
    };
    $scope.getProducts();

    $scope.addStock = false;
    $scope.newStockData = {
        product: null,
        quantity: 0,
        exp_date: new Date()
    };
    $scope.newStock = $scope.newStockData;

    $scope.stocks = [];

    $scope.addNewStock = function(){
        var data = $scope.newStock;
        if(data.product && data.product.id){
            data.product_id = data.product.id;
            stocksFactory.addToWarehouse($scope.id, data).then(function(stock){
                $scope.stocks.push(stock);
                $scope.newStock = $scope.newStockData;
            });
        } else {
            alert('You need to select a product');
        }
    };

    $scope.getStock = function(){
        stocksFactory.getStockFromWarehouse($scope.id).then(function(stock){
            $scope.stocks = stock;
        });
    };
    $scope.getStock();

    $scope.editStock = function(stock){
        stocksFactory.updateStock(stock.id, stock).then(function(stock){
            console.log("updated stock");
        });
    };

    $scope.editName = function(name){
        console.log("new name: " , name);
        warehousesFactory.editWarehouse($stateParams.id, {
            name: name
        }).then(function(edited) {

          var findItem = lodash.find($scope.warehouses, function(arg) {
            return arg.id === $stateParams.id;
          });

          if (findItem) {
            findItem.name = edited.name;
          }

        });
    };

  }

  warehousesSingleItemController.$inject = ['$scope', '$stateParams', 'warehousesFactory', 'lodash', 'stocksFactory', 'productsFactory'];

})();

},{}],136:[function(require,module,exports){
(function(){
"use strict";

angular.module('CIRONS-MAIN-APP')
    .controller('systemAdminController', require('./system_admin.ngcontroller'))
    .factory('systemAdminFactory', require('./system_admin.ngfactory'))
    .config(require('./system_admin.ngrouter'));
})();

},{"./system_admin.ngcontroller":137,"./system_admin.ngfactory":138,"./system_admin.ngrouter":139}],137:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = systemAdminController;
  function systemAdminController($scope) {


  }

  systemAdminController.$inject = ['$scope'];
})();

},{}],138:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = systemAdminFactory;

  function systemAdminFactory($http, $q) {

    return {

    };

  }

  systemAdminFactory.$inject = ['$http', '$q'];

})();

},{}],139:[function(require,module,exports){
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

},{}],140:[function(require,module,exports){
(function(){
"use strict";

angular.module('CIRONS-MAIN-APP')
    .controller('userSettingsController', require('./user_settings.ngcontroller'))
    .factory('userSettingsFactory', require('./user_settings.ngfactory'))
    .config(require('./user_settings.ngrouter'));
})();

},{"./user_settings.ngcontroller":141,"./user_settings.ngfactory":142,"./user_settings.ngrouter":143}],141:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = userSettingsController;

  function userSettingsController($scope, userSettingsFactory, meFactory) {

    meFactory.async().then(function(user) {
      $scope.user = user.data;
    });

    $scope.updateUser = function() {
      userSettingsFactory.edit($scope.user);
    }
  }
  userSettingsController.$inject = ['$scope', 'userSettingsFactory', 'meFactory'];
})();

},{}],142:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = userSettingsFactory;

  function userSettingsFactory($http, $q) {

    return {

      edit: function(user) {
        return $http({
          url: 'http://janalex.beta.cirons.com/api/v1/me',
          method: 'PUT',
          data: user
        }).success(function(done){
        //
        }).error(function(error){
          console.log(error);
        })
      }
    };
  }

  userSettingsFactory.$inject = ['$http', '$q'];

})();

},{}],143:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = userSettingsRouter;

  function userSettingsRouter($stateProvider) {
    $stateProvider
      .state('settings', {
        url: "/settings",
        controller: 'userSettingsController',
        templateUrl: "components/user_settings/user_settings.view.html",
      })
  }

  userSettingsRouter.$inject = ['$stateProvider'];

})();

},{}],144:[function(require,module,exports){
(function () {
  'use strict';
  require('./app')
  .run(require('./app.ngrun'))
  .config(require('./app.ngconfig'));
})();

},{"./app":1,"./app.ngconfig":2,"./app.ngrun":3}],145:[function(require,module,exports){
(function() {
    'use strict';
    module.exports = settingsFactory;

    function settingsFactory($http, $q, $rootScope) {
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

                    console.log($rootScope.s);

                    return data.data;
                });
            },
            getSettings: function() {
                return settings;
            }
        };

    }

    settingsFactory.$inject = ['$http', '$q', '$rootScope'];

})();

},{}]},{},[4]);
