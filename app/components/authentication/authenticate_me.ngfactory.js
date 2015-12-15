(function() {
  "use strict";

  angular.module('CIRONS-MAIN-APP').factory('meFactory', function($http, $q) {

    return {
      async: function() {
        return $http.get('http://janalex.beta.cirons.com/api/v1/me');
      }
    };

  });

})();
