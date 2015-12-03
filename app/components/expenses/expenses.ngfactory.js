(function () {
    "use strict";

    angular.module('CIRONS-MAIN-APP')
        .factory('expensesFactory', function ($http, $q) {
            return {

                getSuppliers: function() {
                    var defer = $q.defer();
                    return $http.get('http://janalex.beta.cirons.com/api/v1/suppliers').then(function(expenses){
                        if(expenses) {
                            return expenses;
                        } else {
                            throw new Error('No expenses found');
                        }

                    });
                },

                getSupplier: function(id) {
                    var defer = $q.defer();
                    return $http.get('http://janalex.beta.cirons.com/api/v1/suppliers' + '/' + id).then(function(item){
                        if(item) {
                            return item;
                        } else {
                            throw new Error('No expenses found');
                        }

                    });
                }
            }

        });

})();

