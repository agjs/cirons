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
