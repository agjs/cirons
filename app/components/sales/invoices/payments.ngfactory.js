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
