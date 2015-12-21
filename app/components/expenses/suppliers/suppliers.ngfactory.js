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
