(function() {
  'use strict';
  module.exports = supplierInvoicesFactory;

  function supplierInvoicesFactory($http, $q) {

    return {

      getSupplierInvoices: function() {
        return $http.get('http://janalex.beta.cirons.com/api/v1/supplier_invoices').then(function(supplier_invoices) {
          if (supplier_invoices) {
            return supplier_invoices.data;
          } else {
            throw new Error('No supplier_invoices found');
          }

        });
      },

      getSupplierInvoice: function(id) {
        return $http.get('http://janalex.beta.cirons.com/api/v1/supplier_invoices' + '/' + id).then(function(item) {
          if (item) {
            return item.data;
          } else {
            throw new Error('No supplier_invoices found');
          }

        });
      },

      addSupplierInvoice: function(data) {
        return $http({
          url: 'http://janalex.beta.cirons.com/api/v1/supplier_invoices',
          method: 'POST',
          data: data
        }).then(function(item) {
          if (item) {
            return item.data;
          } else {
            throw new Error('SupplierInvoice could not be added!');
          }

        });

      },

      removeSupplierInvoice: function(id) {
        return $http({
          url: 'http://janalex.beta.cirons.com/api/v1/supplier_invoices/' + id,
          method: 'DELETE'
        }).then(function(item) {
          if (item) {
            return item.data;
          } else {
            throw new Error('SupplierInvoice could not be deleted!');
          }

        });

      },

      editSupplierInvoice: function(id, data) {
        return $http({
          url: 'http://janalex.beta.cirons.com/api/v1/supplier_invoices/' + id,
          method: 'PUT',
          data: data
        }).then(function(item) {
          if (item) {
            return item.data;
          } else {
            throw new Error('SupplierInvoice could not be edited!');
          }

        });

      }
    }

  }

  supplierInvoicesFactory.$inject = ['$http', '$q'];

})();
