(function() {
  'use strict';
  module.exports = invoicesFactory;

  function invoicesFactory($http, $q) {

    return {

      getInvoices: function() {
        return $http.get('http://janalex.beta.cirons.com/api/v1/invoices').then(function(invoices) {
          if (invoices) {
            return invoices.data;
          } else {
            throw new Error('No invoices found');
          }

        });
      },

      countInvoices: function() {
        return $http.get('http://janalex.beta.cirons.com/api/v1/invoices?count').then(function(invoices) {
          if (invoices) {
            return invoices.data;
          } else {
            throw new Error('No invoices found');
          }

        });
      },

      getUnpaidInvoices: function() {
        return $http.get('http://janalex.beta.cirons.com/api/v1/invoices/not_step/paid').then(function(invoices) {
          if (invoices) {
            return invoices.data;
          } else {
            throw new Error('No invoices found');
          }

        });
      },

      getUnpaidInvoicesCount: function() {
        return $http.get('http://janalex.beta.cirons.com/api/v1/invoices/not_step/paid?count').then(function(invoices) {
          if (invoices) {
            return invoices.data;
          } else {
            throw new Error('No invoices found');
          }

        });
      },

      getUnpaidInvoicesSum: function() {
        return $http.get('http://janalex.beta.cirons.com/api/v1/invoices/unpaid/sum').then(function(invoices) {
          if (invoices) {
            return invoices.data;
          } else {
            throw new Error('No invoices found');
          }

        });
      },

      getInvoice: function(id) {
        return $http.get('http://janalex.beta.cirons.com/api/v1/invoices' + '/' + id).then(function(item) {
          if (item) {
            return item.data;
          } else {
            throw new Error('No invoices found');
          }

        });
      },

      addInvoice: function(data) {
        return $http({
          url: 'http://janalex.beta.cirons.com/api/v1/invoices',
          method: 'POST',
          data: data
        }).then(function(item) {
          if (item) {
            return item.data;
          } else {
            throw new Error('Invoice could not be added!');
          }

        });

      },

      removeInvoice: function(id) {
        return $http({
          url: 'http://janalex.beta.cirons.com/api/v1/invoices/' + id,
          method: 'DELETE'
        }).then(function(item) {
          if (item) {
            return item.data;
          } else {
            throw new Error('Invoice could not be deleted!');
          }

        });

      },

      editInvoice: function(id, data) {
        return $http({
          url: 'http://janalex.beta.cirons.com/api/v1/invoices/' + id,
          method: 'PUT',
          data: data
        }).then(function(item) {
          if (item) {
            return item.data;
          } else {
            throw new Error('Invoice could not be edited!');
          }

        });

        },

        bookInvoice: function(id) {
          return $http({
            url: 'http://janalex.beta.cirons.com/api/v1/invoices/' + id + '/book',
            method: 'PUT'
          }).then(function(item) {
            if (item) {
              return item.data;
            } else {
              throw new Error('Invoice could not be edited!');
            }

          });

        }


    }

  }

  invoicesFactory.$inject = ['$http', '$q'];

})();
