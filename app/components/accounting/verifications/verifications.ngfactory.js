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
