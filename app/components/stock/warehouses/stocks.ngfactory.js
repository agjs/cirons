(function() {
  'use strict';
  module.exports = stocksFactory;

  function stocksFactory($http, $q) {

    return {
        getStockFromWarehouse: function(warehouse_id){
            return $http.get('http://janalex.beta.cirons.com/api/v1/warehouses/' + warehouse_id + '/stock/').then(function(stock){
                if(stock){
                    return stock.data;
                } else {
                    throw new Error('cant get stock from warehouse');
                }
            });
        },

        updateStock: function(id, data){
            return $http.put('http://janalex.beta.cirons.com/api/v1/stocks/' + id, data).then(function(stock){
                if(stock){
                    return stock.data;
                } else {
                    throw new Error('cant update stock');
                }
            });
        },

        addToWarehouse: function(warehouse_id, data){
            return $http.post('http://janalex.beta.cirons.com/api/v1/warehouses/' + warehouse_id + '/stock/', data).then(function(stock){
                if(stock){
                    return stock.data;
                } else {
                    throw new Error('cant add to stock');
                }
            })
        }
    }

  }

  stocksFactory.$inject = ['$http', '$q'];

})();
