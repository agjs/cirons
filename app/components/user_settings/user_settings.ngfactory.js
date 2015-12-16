(function() {
  'use strict';
  module.exports = userSettingsFactory;

  function userSettingsFactory($http, $q) {

    return {

      edit: function(user) {
        return $http({
          url: 'http://janalex.beta.cirons.com/api/v1/users',
          method: 'PUT',
          data: user
        });
      }
    };
  }

  userSettingsFactory.$inject = ['$http', '$q'];

})();
