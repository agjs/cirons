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
