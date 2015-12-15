(function() {
  'use strict';
  module.exports = authenticateMe;

  function authenticateMe($http, $q) {

    return {
      async: function() {
        return $http.get('http://janalex.beta.cirons.com/api/v1/me');
      }
    };

  }

  authenticateMe.$inject = ['$http', '$q'];

})();
