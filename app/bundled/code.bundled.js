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
    'ui.calendar'
    
  ]);




})();

},{}],2:[function(require,module,exports){
(function() {
  "use strict";

  module.exports = ngConfig;

  function ngConfig($httpProvider, $urlRouterProvider, $locationProvider, $authProvider, $breadcrumbProvider, cfpLoadingBarProvider) {



    $httpProvider.interceptors.push('authenticationInterceptor');
    $urlRouterProvider.otherwise('/dashboard/finance');
    $locationProvider.html5Mode(false);

    $authProvider.loginUrl = 'http://janalex.beta.cirons.com/api/v1/auth';
    $breadcrumbProvider.setOptions({
      template: 'bootstrap3'
    });


    // Custom template for angular loading bar
    // cfpLoadingBarProvider.spinnerTemplate = '<div><span class="fa fa-spinner">Loading...</div>';


  }

  ngConfig.$inject = ['$httpProvider', '$urlRouterProvider', '$locationProvider', '$authProvider', '$breadcrumbProvider', 'cfpLoadingBarProvider'];

})();

},{}],3:[function(require,module,exports){
(function() {
  "use strict";


  module.exports = ngRun;

  function ngRun($rootScope, $location, $state, meFactory, editableOptions, editableThemes, $auth) {

    editableOptions.theme = 'default';

    $rootScope.$on('$stateChangeSuccess',
      function(event, toState, toParams, fromState, fromParams) {
        $rootScope.currentState = toState.name;
      }
    )

    editableThemes['default'].submitTpl = '<button type="submit">ok</button>';

    $rootScope.$on('$stateChangeSuccess', function(event, next) {
      if (!$auth.isAuthenticated()) {
        event.preventDefault();
        $location.path('/login');
      }
    });
  }
  ngRun.$inject = ['$rootScope', '$location', '$state', 'meFactory', 'editableOptions', 'editableThemes', '$auth'];
})();

},{}],4:[function(require,module,exports){
(function () {
    'use strict';
    require('../main.ngcomponent');
    require('../components/common/common.ngcomponent')
    require('../components/authentication/authentication.ngcomponent');
    require('../components/dashboard/dashboard.ngcomponent');
    require('../components/accounting/accounting.ngcomponent');
    require('../components/expenses/suppliers/suppliers.ngcomponent');
    require('../components/expenses/receipts/receipts.ngcomponent');

    require('../components/sales/orders/orders.ngcomponent');
    require('../components/sales/invoices/invoices.ngcomponent');
    require('../components/sales/products/products.ngcomponent');
    require('../components/sales/contacts/contacts.ngcomponent');

    require('../components/calendar/calendar.ngcomponent');
    require('../components/hr/hr.ngcomponent');
    require('../components/purchasing/purchasing.ngcomponent');
    require('../components/sales/sales.ngcomponent');
    require('../components/stock/stock.ngcomponent');
    require('../components/system_admin/system_admin.ngcomponent');
    require('../components/user_settings/user_settings.ngcomponent');
    require('../components/directives/directives.ngcomponent');
})();

},{"../components/accounting/accounting.ngcomponent":5,"../components/authentication/authentication.ngcomponent":10,"../components/calendar/calendar.ngcomponent":15,"../components/common/common.ngcomponent":19,"../components/dashboard/dashboard.ngcomponent":24,"../components/directives/directives.ngcomponent":34,"../components/expenses/receipts/receipts.ngcomponent":36,"../components/expenses/suppliers/suppliers.ngcomponent":42,"../components/hr/hr.ngcomponent":49,"../components/purchasing/purchasing.ngcomponent":53,"../components/sales/contacts/contacts.ngcomponent":57,"../components/sales/invoices/invoices.ngcomponent":63,"../components/sales/orders/orders.ngcomponent":69,"../components/sales/products/products.ngcomponent":75,"../components/sales/sales.ngcomponent":81,"../components/stock/stock.ngcomponent":85,"../components/system_admin/system_admin.ngcomponent":89,"../components/user_settings/user_settings.ngcomponent":93,"../main.ngcomponent":97}],5:[function(require,module,exports){
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
  'use strict';
  module.exports = authenticateMe;

  function authenticateMe($http, $q) {

    return {
      async: function() {
        return $http.get('http://janalex.beta.cirons.com/api/v1/me')
      },
      promise: function() {
        return $http.get('http://janalex.beta.cirons.com/api/v1/me').then(function(user){
          return user.data;
        })
      }
    };

  }

  authenticateMe.$inject = ['$http', '$q'];

})();

},{}],10:[function(require,module,exports){
(function(){
"use strict";

angular.module('CIRONS-MAIN-APP')
    .controller('loginController', require('./login/login.ngcontroller'))
    .factory('meFactory', require('./authenticate_me.ngfactory'))
    .factory('authenticationInterceptor', require('./interceptor.ngfactory'))
    .factory('authenticationFactory', require('./authentication.ngfactory'))
    .config(require('./authentication.ngrouter'));

})();

},{"./authenticate_me.ngfactory":9,"./authentication.ngfactory":11,"./authentication.ngrouter":12,"./interceptor.ngfactory":13,"./login/login.ngcontroller":14}],11:[function(require,module,exports){
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

},{}],12:[function(require,module,exports){
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

},{}],13:[function(require,module,exports){
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

},{}],14:[function(require,module,exports){
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

},{}],15:[function(require,module,exports){
(function(){
"use strict";

angular.module('CIRONS-MAIN-APP')
    .controller('calendarController', require('./calendar.ngcontroller'))
    .factory('calendarFactory', require('./calendar.ngfactory'))
    .config(require('./calendar.ngrouter'));

})();

},{"./calendar.ngcontroller":16,"./calendar.ngfactory":17,"./calendar.ngrouter":18}],16:[function(require,module,exports){
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

},{}],17:[function(require,module,exports){
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

},{}],18:[function(require,module,exports){
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

},{}],19:[function(require,module,exports){
(function() {
  "use strict";

  angular.module('CIRONS-MAIN-APP')
    .controller('mainController', require('./main.ngcontroller'))
    .controller('mainMenuController', require('./main-menu/main_menu.ngcontroller'))
    .controller('rightSidebarController', require('./right-sidebar/right_sidebar.ngcontroller'))
    .controller('navigationController', require('./top-navigation/navigation.ngcontroller'))
})();

},{"./main-menu/main_menu.ngcontroller":20,"./main.ngcontroller":21,"./right-sidebar/right_sidebar.ngcontroller":22,"./top-navigation/navigation.ngcontroller":23}],20:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = mainMenuController;

  function mainMenuController($scope) {

      $scope.touchMenuOpen = false;
      $scope.toggleTouchMenu = function(){
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

  }

  mainMenuController.$inject = ['$scope'];

})();

},{}],21:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = mainController;

  function mainController($scope, $auth, $state) {
    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };

  }

  mainController.$inject = ['$scope', '$auth', '$state'];

})();

},{}],22:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = rightSidebarController;

  function rightSidebarController($scope) {


  }

  rightSidebarController.$inject = ['$scope'];

})();

},{}],23:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = navigationController;

  function navigationController($scope, $rootScope, $auth, $state, meFactory) {
    $scope.iconMenu = [

      {
        icon: 'fa fa-bullhorn',
        state: ''
      }, {
        icon: 'fa fa-bell',
        state: ''
      }, {
        icon: 'fa fa-exclamation-triangle',
        state: ''
      }

    ];

    meFactory.promise().then(function(user) {
      $scope.user = user;
    });


  }

  navigationController.$inject = ['$scope', '$rootScope', '$auth', '$state', 'meFactory'];

})();

},{}],24:[function(require,module,exports){
(function(){
"use strict";

angular.module('CIRONS-MAIN-APP')
    .controller('dashboardController', require('./dashboard.ngcontroller'))
    .controller('dashboardFinanceController', require('./finance/dashboard_finance.ngcontroller'))
    .factory('dashboardFactory', require('./dashboard.ngfactory'))
    .config(require('./dashboard.ngrouter'));

})();

},{"./dashboard.ngcontroller":25,"./dashboard.ngfactory":26,"./dashboard.ngrouter":27,"./finance/dashboard_finance.ngcontroller":28}],25:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = dashboardController;

  function dashboardController($scope, $filter, dashboardFactory, productsFactory) {

    //START PRODUCT STOCK
    $scope.input = {
        stock: ""
    };
    $scope.productStockItems = [];
    $scope.productStockItemsFilter = function(){
        console.log("filter products: " + $scope.input.stock);
        productsFactory.getProductStockFilters($scope.input.stock).then(function(data){
            $scope.productStockItems = data;
        });
    };
    productsFactory.getProductStockFilters("").then(function(data){
        $scope.productStockItems = data;
    });
    //END PRODUCT STOCK

    //START REGISTER EXPENSES CHART
    $scope.expenses_bar_currentData = [{
      "non": 0,
      "days1": 0,
      "days2": 0,
      "days3": 0
    }];
    $scope.expenses_bar_currentColumns = [{
      "id": "variable",
      "type": "bar",
      "name": "Variable",
      "color": "#F2C61F"
    }, {
      "id": "fixed",
      "type": "bar",
      "name": "Fixed",
      "color": "#FF8200"
    }, {
      "id": "receipts",
      "type": "bar",
      "name": "Receipts",
      "color": "#E07B53"
    }, {
      "id": "sales",
      "type": "bar",
      "name": "Sales",
      "color": "#66bb6a"
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
      color: "#2185d0"
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
      color: "#2185d0"
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
      color: "#66bb6a"
    }, {
      id: "out",
      type: "spline",
      name: "Earnings",
      color: "#E07B53"
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
      for(var i = 0; i < data.expenses_pie_breakdown.length; i++){
          var expense = data.expenses_pie_breakdown[i];
          $scope.expensesPieColumns.push({
              id: expense[0],
              name: expense[0],
              type: "pie"
          });

          expenses_data[expense[0]] = expense[1];
      }
      $scope.expensesPieData.push(expenses_data);
      //END EXPENSES PIE

      //START TOP SUPPLIERS PIE
      var suppliers_data = [];
      for(var i = 0; i < data.top_suppliers.length; i++){
          var supplier = data.top_suppliers[i];
          $scope.topSuppliersColumns.push({
              id: "supplier" + i,
              type: "pie",
              name: supplier.company_name
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
          name: product.product_name
        });
        product_data["product" + i] = product.sold;
      }
      $scope.topProductsData.push(product_data);
      //END TOP PRODUCT PIE

      //START TOP CUSTOMERS PIE
      var customer_data = {};
      for(var i = 0; i < data.top_customers.length; i++){
          var contact = data.top_customers[i];
          $scope.topCustomersColumns.push({
              id: "customer" + i,
              type: "pie",
              name: contact.name
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

  dashboardController.$inject = ['$scope', '$filter', 'dashboardFactory', 'productsFactory'];

})();

},{}],26:[function(require,module,exports){
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

},{}],27:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = dashboardRouter;

  function dashboardRouter($stateProvider) {
    $stateProvider
      .state('dashboard', {
        url: "/dashboard",
        abstract: true,
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
        views: {
          'dashboardContent': {
            templateUrl: "components/dashboard/sales/dashboard_sales.view.html",
          }
        }
      })
      .state('dashboard.taxes', {
        url: "/taxes",
        parent: 'dashboard',
        views: {
          'dashboardContent': {
            templateUrl: "components/dashboard/taxes/dashboard_taxes.view.html",
          }
        }
      })
      .state('dashboard.expenses', {
        url: "/expenses",
        parent: 'dashboard',
        views: {
          'dashboardContent': {
            templateUrl: "components/dashboard/expenses/dashboard_expenses.view.html",
          }
        }
      })

  }

  dashboardRouter.$inject = ['$stateProvider'];

})();

},{}],28:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = dashboardFinanceController;

  function dashboardFinanceController($scope, $filter, dashboardFactory) {

      

  }

  dashboardFinanceController.$inject = ['$scope', '$filter', 'dashboardFactory'];

})();

},{}],29:[function(require,module,exports){
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

},{}],30:[function(require,module,exports){
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

},{}],31:[function(require,module,exports){
(function() {
  "use strict";
  module.exports = cirons_list_card;

  function cirons_list_card() {

    return {
      restrict: 'EA',
      scope: {
        newitemstate: '@',
        singleitemstate: '@',
        data: '=',
        p1: '@',
        p2: '@',
        p3: '@',
        p4: '@'

      },
      templateUrl: 'components/directives/cirons-list-view/template.html',
      replace: false,
      link: function(scope, element, attrs) {

      }
    }

  }

  cirons_list_card.$inject = [];

})();

},{}],32:[function(require,module,exports){
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

},{}],33:[function(require,module,exports){
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

},{}],34:[function(require,module,exports){
(function(){
"use strict";

angular.module('CIRONS-MAIN-APP')

.directive('cironsCard', require('./cirons-card/cirons_card.ngdirective'))
.directive('cironsStatbox', require('./cirons-statbox/cirons_statbox.ngdirective'))
.directive('cironsList', require('./cirons-list-view/cirons_list_view.ngdirective'))
.directive('cironsModelSelector', require('./cirons-model-selector/cirons_model_selector.ngdirective'))
.directive('cironsDropzone', require('./cirons-dropzone/cirons_dropzone.ngdirective'));

})();

},{"./cirons-card/cirons_card.ngdirective":29,"./cirons-dropzone/cirons_dropzone.ngdirective":30,"./cirons-list-view/cirons_list_view.ngdirective":31,"./cirons-model-selector/cirons_model_selector.ngdirective":32,"./cirons-statbox/cirons_statbox.ngdirective":33}],35:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = expensesController;

  function expensesController($scope, suppliersFactory, receiptsFactory, $state) {

    suppliersFactory.countSuppliers().then(function(suppliers) {
      $scope.suppliersCount = suppliers;
    });

    receiptsFactory.countReceipts().then(function(receipts) {
      $scope.receiptsCount = receipts;
    });



  }

  expensesController.$inject = ['$scope', 'suppliersFactory', 'receiptsFactory', '$state'];

})();

},{}],36:[function(require,module,exports){
(function() {
  "use strict";

  angular.module('CIRONS-MAIN-APP')
    .controller('receiptsController', require('./receipts.ngcontroller'))
    .controller('receiptsCRUDController', require('./receipts_crud.ngcontroller'))
    .controller('receiptsSingleItemController', require('./receipts_item.ngcontroller'))
    .factory('receiptsFactory', require('./receipts.ngfactory'))
    .config(require('./receipts.ngrouter'));

})();

},{"./receipts.ngcontroller":37,"./receipts.ngfactory":38,"./receipts.ngrouter":39,"./receipts_crud.ngcontroller":40,"./receipts_item.ngcontroller":41}],37:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = receiptsController;

  function receiptsController($scope, $rootScope, $auth, receiptsFactory, $state) {

    receiptsFactory.getReceipts().then(function(receipts) {
      $scope.receipts = receipts;
      $scope.cardCounter = receipts.length;
    });



  }

  receiptsController.$inject = ['$scope', '$rootScope', '$auth', 'receiptsFactory', '$state'];

})();

},{}],38:[function(require,module,exports){
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

      addReceipt: function(supplier) {
        return $http({
          url: 'http://janalex.beta.cirons.com/api/v1/receipts',
          method: 'POST',
          data: {
            company_name: supplier
          }
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

      editReceipt: function(id, companyName) {
        return $http({
          url: 'http://janalex.beta.cirons.com/api/v1/receipts/' + id,
          method: 'PUT',
          data: {
            company_name: companyName
          }
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

},{}],39:[function(require,module,exports){
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
            templateUrl: 'components/expenses/receipts/receipts.view.html',
            controller: 'receiptsController'

          },
          'receiptsList@receipts': {
            templateUrl: 'components/expenses/receipts/receipts_list.view.html',
          }
        }
      })

    .state('receipts.create', {
      url: "/create",
      ncyBreadcrumb: {
        parent: 'receipts',
        label: 'Write a Receipt'
      },
      views: {
        '': {
          templateUrl: 'components/expenses/receipts/receipts.view.html'
        },
        'receiptsList@receipts': {
          templateUrl: 'components/expenses/receipts/receipts_list.view.html',

        },
        'receiptsContent@receipts': {
          templateUrl: 'components/expenses/receipts/receipts_create.view.html',
          controller: 'receiptsCRUDController'
        }
      }
    })

    .state('receipts.item', {
      url: "/:id",
      params: {
        supplier: undefined
      },
      ncyBreadcrumb: {
        parent: 'receipts',
        label: '{{id}}'
      },
      views: {
        '': {
          templateUrl: 'components/expenses/receipts/receipts.view.html'
        },
        'receiptsList@receipts': {
          templateUrl: 'components/expenses/receipts/receipts_list.view.html',

        },
        'receiptsContent@receipts': {
          templateUrl: 'components/expenses/receipts/receipts_content.view.html',
          controller: 'receiptsSingleItemController'
        }
      }
    });

  }

  receiptsRouter.$inject = ['$stateProvider'];

})();

},{}],40:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = receiptsCRUDController;

  function receiptsCRUDController($scope, $stateParams, receiptsFactory, lodash) {

    $scope.addReciept = function() {
      receiptsFactory.addReciept($scope.company_name).then(function(added) {
        $scope.expenses.push(added);
      });
    };

    $scope.removeReciept = function() {
      receiptsFactory.removeReciept($stateParams.id);
    };

    $scope.editReciept = function(companyName) {
      receiptsFactory.editReciept($stateParams.id, companyName).then(function(edited) {

        var findItem = lodash.find($scope.expenses, function(arg) {
          return arg.id === $stateParams.id;
        });

        if (findItem) {
          findItem.company_name = edited.company_name;
        }

      });
    };

  }

  receiptsCRUDController.$inject = ['$scope', '$stateParams', 'receiptsFactory', 'lodash'];

})();

},{}],41:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = receiptsSingleItemController;

  function receiptsSingleItemController($scope, $stateParams, receiptsFactory) {
    $scope.supplier = $stateParams.supplier;
    $scope.id = $stateParams.id;


    if (!$scope.receipt) {
      receiptsFactory.getReceipt($scope.id).then(function(item) {
        $scope.receipt = item;
      });
    }

  }

  receiptsSingleItemController.$inject = ['$scope', '$stateParams', 'receiptsFactory'];

})();

},{}],42:[function(require,module,exports){
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

},{"../expenses.ngcontroller":35,"./suppliers.ngcontroller":43,"./suppliers.ngfactory":44,"./suppliers.ngrouter":45,"./suppliers_crud.ngcontroller":46,"./suppliers_item.ngcontroller":47,"./suppliers_list.ngcontroller":48}],43:[function(require,module,exports){
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

},{}],44:[function(require,module,exports){
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

        countSuppliers: function() {
        return $http.get('http://janalex.beta.cirons.com/api/v1/suppliers?count').then(function(suppliers) {
          if (suppliers) {
            return suppliers.data;
          } else {
            throw new Error('Something went wrong');
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

      addSupplier: function(supplier) {
        return $http({
          url: 'http://janalex.beta.cirons.com/api/v1/suppliers',
          method: 'POST',
          data: {
            company_name: supplier
          }
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

      editSupplier: function(id, companyName) {
        return $http({
          url: 'http://janalex.beta.cirons.com/api/v1/suppliers/' + id,
          method: 'PUT',
          data: {
            company_name: companyName
          }
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

},{}],45:[function(require,module,exports){
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
    });

  }

  expensesRouter.$inject = ['$stateProvider'];

})();

},{}],46:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = suppliersCRUDController;

  function suppliersCRUDController($scope, $stateParams, suppliersFactory, lodash) {

    $scope.addSupplier = function() {
      suppliersFactory.addSupplier($scope.company_name).then(function(added) {
        $scope.expenses.push(added);
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

  suppliersCRUDController.$inject = ['$scope', '$stateParams', 'suppliersFactory', 'lodash'];

})();

},{}],47:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = suppliersSingleItemController;

  function suppliersSingleItemController($scope, $stateParams, suppliersFactory) {
    $scope.supplier = $stateParams.supplier;
    $scope.id = $stateParams.id;


    if (!$scope.supplier) {
      suppliersFactory.getSupplier($scope.id).then(function(item) {
        $scope.supplier = item;
      });
    }

  }

  suppliersSingleItemController.$inject = ['$scope', '$stateParams', 'suppliersFactory'];

})();

},{}],48:[function(require,module,exports){
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

},{}],49:[function(require,module,exports){
(function(){
"use strict";

angular.module('CIRONS-MAIN-APP')
    .controller('hrController', require('./hr.ngcontroller'))
    .factory('hrFactory', require('./hr.ngfactory'))
    .config(require('./hr.ngrouter'));

})();

},{"./hr.ngcontroller":50,"./hr.ngfactory":51,"./hr.ngrouter":52}],50:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = hrController;

  function hrController($scope) {


  }

  hrController.$inject = ['$scope'];

})();

},{}],51:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = hrFactory;

  function hrFactory($http, $q) {

    return {

    };

  }

  hrFactory.$inject = ['$http', '$q'];

})();

},{}],52:[function(require,module,exports){
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

},{}],53:[function(require,module,exports){
(function(){
"use strict";

angular.module('CIRONS-MAIN-APP')
    .controller('purchasingController', require('./purchasing.ngcontroller'))
    .factory('purchasingFactory', require('./purchasing.ngfactory'))
    .config(require('./purchasing.ngrouter'));

})();

},{"./purchasing.ngcontroller":54,"./purchasing.ngfactory":55,"./purchasing.ngrouter":56}],54:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = purchasingController;

  function purchasingController($scope) {


  }

  purchasingController.$inject = ['$scope'];

})();

},{}],55:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = purchasingFactory;

  function purchasingFactory($http, $q) {

    return {

    };

  }

  purchasingFactory.$inject = ['$http', '$q'];

})();

},{}],56:[function(require,module,exports){
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

},{}],57:[function(require,module,exports){
(function() {
  "use strict";

  angular.module('CIRONS-MAIN-APP')
    .controller('contactsController', require('./contacts.ngcontroller'))
    .controller('contactsCRUDController', require('./contacts_crud.ngcontroller'))
    .controller('contactsSingleItemController', require('./contacts_item.ngcontroller'))
    .factory('contactsFactory', require('./contacts.ngfactory'))
    .config(require('./contacts.ngrouter'));

})();

},{"./contacts.ngcontroller":58,"./contacts.ngfactory":59,"./contacts.ngrouter":60,"./contacts_crud.ngcontroller":61,"./contacts_item.ngcontroller":62}],58:[function(require,module,exports){
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

},{}],59:[function(require,module,exports){
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

},{}],60:[function(require,module,exports){
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

},{}],61:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = contactsCRUDController;

  function contactsCRUDController($scope, $stateParams, contactsFactory, lodash) {

    $scope.addContact = function() {
      contactsFactory.addContact($scope.contact).then(function(added) {
        $scope.contacts.push(added);
      });
    };

    $scope.removeContact = function() {
      contactsFactory.removeContact($stateParams.id);
    };

    $scope.editContact = function(data) {
      contactsFactory.editContact($stateParams.id, data).then(function(edited) {

        var findItem = lodash.find($scope.contacts, function(arg) {
          return arg.id === $stateParams.id;
        });

        if (findItem) {
          findItem = edited;
        }

      });
    };

  }

  contactsCRUDController.$inject = ['$scope', '$stateParams', 'contactsFactory', 'lodash'];

})();

},{}],62:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = contactsSingleItemController;

  function contactsSingleItemController($scope, $stateParams, contactsFactory) {
    $scope.contact = $stateParams.contact;
    $scope.id = $stateParams.id;


    if (!$scope.contact) {
      contactsFactory.getContact($scope.id).then(function(item) {
        $scope.contact = item;
      });
    }

  }

  contactsSingleItemController.$inject = ['$scope', '$stateParams', 'contactsFactory'];

})();

},{}],63:[function(require,module,exports){
(function() {
  "use strict";

  angular.module('CIRONS-MAIN-APP')
    .controller('invoicesController', require('./invoices.ngcontroller'))
    .controller('invoicesCRUDController', require('./invoices_crud.ngcontroller'))
    .controller('invoicesSingleItemController', require('./invoices_item.ngcontroller'))
    .factory('invoicesFactory', require('./invoices.ngfactory'))
    .config(require('./invoices.ngrouter'));

})();

},{"./invoices.ngcontroller":64,"./invoices.ngfactory":65,"./invoices.ngrouter":66,"./invoices_crud.ngcontroller":67,"./invoices_item.ngcontroller":68}],64:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = invoicesController;

  function invoicesController($scope, $rootScope, $auth, invoicesFactory, $state) {

    invoicesFactory.getInvoices().then(function(invoices) {
      $scope.invoices = invoices;
    });



  }

  invoicesController.$inject = ['$scope', '$rootScope', '$auth', 'invoicesFactory', '$state'];

})();

},{}],65:[function(require,module,exports){
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

      }
    }

  }

  invoicesFactory.$inject = ['$http', '$q'];

})();

},{}],66:[function(require,module,exports){
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
            templateUrl: 'components/sales/invoices/invoices.view.html',
            controller: 'invoicesController'

          },
          'invoicesList@invoices': {
            templateUrl: 'components/sales/invoices/invoices_list.view.html',
          }
        }
      })

    .state('invoices.create', {
      url: "/create",
      ncyBreadcrumb: {
        parent: 'invoices',
        label: 'Write a Invoice'
      },
      views: {
        '': {
          templateUrl: 'components/sales/invoices/invoices.view.html'
        },
        'invoicesList@invoices': {
          templateUrl: 'components/sales/invoices/invoices_list.view.html',

        },
        'invoicesContent@invoices': {
          templateUrl: 'components/sales/invoices/invoices_create.view.html',
          controller: 'invoicesCRUDController'
        }
      }
    })

    .state('invoices.item', {
      url: "/:id",
      params: {
        invoice: undefined
      },
      ncyBreadcrumb: {
        parent: 'invoices',
        label: '{{id}}'
      },
      views: {
        '': {
          templateUrl: 'components/sales/invoices/invoices.view.html'
        },
        'invoicesList@invoices': {
          templateUrl: 'components/sales/invoices/invoices_list.view.html',

        },
        'invoicesContent@invoices': {
          templateUrl: 'components/sales/invoices/invoices_content.view.html',
          controller: 'invoicesSingleItemController'
        }
      }
    });

  }

  invoicesRouter.$inject = ['$stateProvider'];

})();

},{}],67:[function(require,module,exports){
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

},{}],68:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = invoicesSingleItemController;

  function invoicesSingleItemController($scope, $stateParams, invoicesFactory) {
    $scope.invoice = $stateParams.invoice;
    $scope.id = $stateParams.id;


    if (!$scope.invoice) {
      invoicesFactory.getInvoice($scope.id).then(function(item) {
        $scope.invoice = item;
      });
    }

  }

  invoicesSingleItemController.$inject = ['$scope', '$stateParams', 'invoicesFactory'];

})();

},{}],69:[function(require,module,exports){
(function() {
  "use strict";

  angular.module('CIRONS-MAIN-APP')
    .controller('ordersController', require('./orders.ngcontroller'))
    .controller('ordersCRUDController', require('./orders_crud.ngcontroller'))
    .controller('ordersSingleItemController', require('./orders_item.ngcontroller'))
    .factory('ordersFactory', require('./orders.ngfactory'))
    .config(require('./orders.ngrouter'));

})();

},{"./orders.ngcontroller":70,"./orders.ngfactory":71,"./orders.ngrouter":72,"./orders_crud.ngcontroller":73,"./orders_item.ngcontroller":74}],70:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = ordersController;

  function ordersController($scope, $rootScope, $auth, ordersFactory, $state) {

    ordersFactory.getOrders().then(function(orders) {
      $scope.orders = orders;
    });



  }

  ordersController.$inject = ['$scope', '$rootScope', '$auth', 'ordersFactory', '$state'];

})();

},{}],71:[function(require,module,exports){
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

},{}],72:[function(require,module,exports){
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
            templateUrl: 'components/sales/orders/orders.view.html',
            controller: 'ordersController'

          },
          'ordersList@orders': {
            templateUrl: 'components/sales/orders/orders_list.view.html',
          }
        }
      })

    .state('orders.create', {
      url: "/create",
      ncyBreadcrumb: {
        parent: 'orders',
        label: 'Write a Order'
      },
      views: {
        '': {
          templateUrl: 'components/sales/orders/orders.view.html'
        },
        'ordersList@orders': {
          templateUrl: 'components/sales/orders/orders_list.view.html',

        },
        'ordersContent@orders': {
          templateUrl: 'components/sales/orders/orders_create.view.html',
          controller: 'ordersCRUDController'
        }
      }
    })

    .state('orders.item', {
      url: "/:id",
      params: {
        order: undefined
      },
      ncyBreadcrumb: {
        parent: 'orders',
        label: '{{id}}'
      },
      views: {
        '': {
          templateUrl: 'components/sales/orders/orders.view.html'
        },
        'ordersList@orders': {
          templateUrl: 'components/sales/orders/orders_list.view.html',

        },
        'ordersContent@orders': {
          templateUrl: 'components/sales/orders/orders_content.view.html',
          controller: 'ordersSingleItemController'
        }
      }
    });

  }

  ordersRouter.$inject = ['$stateProvider'];

})();

},{}],73:[function(require,module,exports){
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

},{}],74:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = ordersSingleItemController;

  function ordersSingleItemController($scope, $stateParams, ordersFactory) {
    $scope.order = $stateParams.order;
    $scope.id = $stateParams.id;


    if (!$scope.order) {
      ordersFactory.getOrder($scope.id).then(function(item) {
        $scope.order = item;
      });
    }

  }

  ordersSingleItemController.$inject = ['$scope', '$stateParams', 'ordersFactory'];

})();

},{}],75:[function(require,module,exports){
(function() {
  "use strict";

  angular.module('CIRONS-MAIN-APP')
    .controller('productsController', require('./products.ngcontroller'))
    .controller('productsCRUDController', require('./products_crud.ngcontroller'))
    .controller('productsSingleItemController', require('./products_item.ngcontroller'))
    .factory('productsFactory', require('./products.ngfactory'))
    .config(require('./products.ngrouter'));

})();

},{"./products.ngcontroller":76,"./products.ngfactory":77,"./products.ngrouter":78,"./products_crud.ngcontroller":79,"./products_item.ngcontroller":80}],76:[function(require,module,exports){
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

},{}],77:[function(require,module,exports){
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

},{}],78:[function(require,module,exports){
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

},{}],79:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = productsCRUDController;

  function productsCRUDController($scope, $stateParams, productsFactory, lodash) {

    $scope.addProduct = function() {
      productsFactory.addProduct($scope.product).then(function(added) {
        $scope.products.push(added);
      });
    };

    $scope.removeProduct = function() {
      productsFactory.removeProduct($stateParams.id);
    };

    $scope.editProduct = function(data) {
      productsFactory.editProduct($stateParams.id, data).then(function(edited) {

        var findItem = lodash.find($scope.products, function(arg) {
          return arg.id === $stateParams.id;
        });

        if (findItem) {
          findItem = edited;
        }

      });
    };

  }

  productsCRUDController.$inject = ['$scope', '$stateParams', 'productsFactory', 'lodash'];

})();

},{}],80:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = productsSingleItemController;

  function productsSingleItemController($scope, $stateParams, productsFactory) {
    $scope.product = $stateParams.product;
    $scope.id = $stateParams.id;


    if (!$scope.product) {
      productsFactory.getProduct($scope.id).then(function(item) {
        $scope.product = item;
      });
    }

  }

  productsSingleItemController.$inject = ['$scope', '$stateParams', 'productsFactory'];

})();

},{}],81:[function(require,module,exports){
(function(){
"use strict";

angular.module('CIRONS-MAIN-APP')
    .controller('salesController', require('./sales.ngcontroller'))
    .factory('salesFactory', require('./sales.ngfactory'))
    .config(require('./sales.ngrouter'));

})();

},{"./sales.ngcontroller":82,"./sales.ngfactory":83,"./sales.ngrouter":84}],82:[function(require,module,exports){
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

},{}],83:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = salesFactory;

  function salesFactory($http, $q) {

    return {

    };

  }

  salesFactory.$inject = ['$http', '$q'];

})();

},{}],84:[function(require,module,exports){
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

},{}],85:[function(require,module,exports){
(function(){
"use strict";

angular.module('CIRONS-MAIN-APP')
    .controller('stockController', require('./stock.ngcontroller'))
    .factory('stockFactory', require('./stock.ngfactory'))
    .config(require('./stock.ngrouter'));

})();

},{"./stock.ngcontroller":86,"./stock.ngfactory":87,"./stock.ngrouter":88}],86:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = stockController;

  function stockController($scope) {


  }

  stockController.$inject = ['$scope'];

})();

},{}],87:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = stockFactory;

  function stockFactory($http, $q) {

    return {

    };

  }

  stockFactory.$inject = ['$http', '$q'];

})();

},{}],88:[function(require,module,exports){
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

},{}],89:[function(require,module,exports){
(function(){
"use strict";

angular.module('CIRONS-MAIN-APP')
    .controller('systemAdminController', require('./system_admin.ngcontroller'))
    .factory('systemAdminFactory', require('./system_admin.ngfactory'))
    .config(require('./system_admin.ngrouter'));
})();

},{"./system_admin.ngcontroller":90,"./system_admin.ngfactory":91,"./system_admin.ngrouter":92}],90:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = systemAdminController;
  function systemAdminController($scope) {


  }

  systemAdminController.$inject = ['$scope'];
})();

},{}],91:[function(require,module,exports){
(function() {
  'use strict';
  module.exports = systemAdminFactory;

  function systemAdminFactory($http, $q) {

    return {

    };

  }

  systemAdminFactory.$inject = ['$http', '$q'];

})();

},{}],92:[function(require,module,exports){
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

},{}],93:[function(require,module,exports){
(function(){
"use strict";

angular.module('CIRONS-MAIN-APP')
    .controller('userSettingsController', require('./user_settings.ngcontroller'))
    .factory('userSettingsFactory', require('./user_settings.ngfactory'))
    .config(require('./user_settings.ngrouter'));
})();

},{"./user_settings.ngcontroller":94,"./user_settings.ngfactory":95,"./user_settings.ngrouter":96}],94:[function(require,module,exports){
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

},{}],95:[function(require,module,exports){
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

},{}],96:[function(require,module,exports){
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

},{}],97:[function(require,module,exports){
(function () {
  'use strict';
  require('./app')
  .run(require('./app.ngrun'))
  .config(require('./app.ngconfig'));
})();

},{"./app":1,"./app.ngconfig":2,"./app.ngrun":3}]},{},[4]);
