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

                    return defer.promise;
                }
            }

        });

})();

