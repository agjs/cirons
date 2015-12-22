(function() {
  'use strict';
  module.exports = purchaseOrdersFactory;

  function purchaseOrdersFactory($http, $q) {

    return {

      getPurchaseOrders: function() {
        return $http.get('http://janalex.beta.cirons.com/api/v1/purchase_orders').then(function(purchase_orders) {
          if (purchase_orders) {
            return purchase_orders.data;
          } else {
            throw new Error('No purchase_orders found');
          }

        });
      },

      getPurchaseOrder: function(id) {
        return $http.get('http://janalex.beta.cirons.com/api/v1/purchase_orders' + '/' + id).then(function(item) {
          if (item) {
            return item.data;
          } else {
            throw new Error('No purchase_orders found');
          }

        });
      },

      addPurchaseOrder: function(data) {
        return $http({
          url: 'http://janalex.beta.cirons.com/api/v1/purchase_orders',
          method: 'POST',
          data: data
        }).then(function(item) {
          if (item) {
            return item.data;
          } else {
            throw new Error('PurchaseOrder could not be added!');
          }

        });

      },

      removePurchaseOrder: function(id) {
        return $http({
          url: 'http://janalex.beta.cirons.com/api/v1/purchase_orders/' + id,
          method: 'DELETE'
        }).then(function(item) {
          if (item) {
            return item.data;
          } else {
            throw new Error('PurchaseOrder could not be deleted!');
          }

        });

      },

      editPurchaseOrder: function(id, data) {
        return $http({
          url: 'http://janalex.beta.cirons.com/api/v1/purchase_orders/' + id,
          method: 'PUT',
          data: data
        }).then(function(item) {
          if (item) {
            return item.data;
          } else {
            throw new Error('PurchaseOrder could not be edited!');
          }

        });

      }
    }

  }

  purchaseOrdersFactory.$inject = ['$http', '$q'];

})();
