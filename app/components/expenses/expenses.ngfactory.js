(function () {
    "use strict";

    angular.module('CIRONS-MAIN-APP')
        .factory('expensesFactory', function ($http, $q) {
            return {

                getSuppliers: function () {
                    var defer = $q.defer();
                    return $http.get('http://janalex.beta.cirons.com/api/v1/suppliers').then(function (expenses) {
                        if (expenses) {
                            return expenses.data;
                        } else {
                            throw new Error('No expenses found');
                        }

                    });
                },

                getSupplier: function (id) {
                    var defer = $q.defer();
                    return $http.get('http://janalex.beta.cirons.com/api/v1/suppliers' + '/' + id).then(function (item) {
                        if (item) {
                            return item.data;
                        } else {
                            throw new Error('No expenses found');
                        }

                    });
                },

                addSupplier: function (supplier) {
                    var defer = $q.defer();
                    return $http({
                        url: 'http://janalex.beta.cirons.com/api/v1/suppliers',
                        method: 'POST',
                        data: {company_name: supplier}
                    }).then(function (item) {
                        if (item) {
                            return item.data;
                        } else {
                            throw new Error('Supplier could not be added!');
                        }

                    });

                },

                removeSupplier: function (id) {
                    var defer = $q.defer();
                    return $http({
                        url: 'http://janalex.beta.cirons.com/api/v1/suppliers/' + id,
                        method: 'DELETE'
                    }).then(function (item) {
                        if (item) {
                            return item.data;
                        } else {
                            throw new Error('Supplier could not be deleted!');
                        }

                    });

                },

                editSupplier: function (id, companyName) {
                    var defer = $q.defer();
                    return $http({
                        url: 'http://janalex.beta.cirons.com/api/v1/suppliers/' + id,
                        method: 'PUT',
                        data: {company_name: companyName}
                    }).then(function (item) {
                        if (item) {
                            return item.data;
                        } else {
                            throw new Error('Supplier could not be edited!');
                        }

                    });

                }
            }

        });

})();

