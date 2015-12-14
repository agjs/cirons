(function() {
  "use strict";

  angular.module('CIRONS-MAIN-APP').factory('meFactory', function($http, $q) {

    return {
      get: function() {
        var defer = $q.defer();
        return $http.get('http://janalex.beta.cirons.com/api/v1/me').then(function(user) {
          if (typeof user === 'object') {
            return user.data;
          } else {
            $q.reject(user);
          }

        });
      }
    }
  });

})();
