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
