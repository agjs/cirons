(function () {
    'use strict';


    angular.module('CIRONS-MAIN-APP').factory('authenticationFactory', function ($location, $rootScope, $http, meFactory, $cookieStore, $q, $state) {
        var currentUser = {};

        var auth = {
            refresh: function () {
                if ($cookieStore.get('token')) {
                    currentUser = meFactory.get();


                    currentUser.$promise.then(function (user) {
                        $rootScope.user = user;
                    });

                    return currentUser.$promise;
                } else {
                    var dfd = $q.defer();
                    dfd.resolve(false);
                    return dfd.promise;
                }
            },

            /**
             * Authenticate user and save token
             *
             * @param  {Object}   user     - login info
             * @param  {Function} callback - optional
             * @return {Promise}
             */
            login: function (user, callback) {
                var cb = callback || angular.noop;
                var deferred = $q.defer();

                $http.post('http://janalex.beta.cirons.com/api/v1/auth', {
                    username: user.username,
                    password: user.password
                }).
                success(function (data) {
                    $cookieStore.put('token', data.token);
                    currentUser = meFactory.get();
                    deferred.resolve(data);
                    $rootScope.$broadcast('loggedIn');
                    currentUser.$promise.then(function (user) {
                        $rootScope.user = user;
                    });
                    return cb();
                }).
                error(function (err) {
                    this.logout();
                    deferred.reject(err);
                    return cb(err);
                }.bind(this));

                return deferred.promise;
            },

            /**
             * Delete access token and user info
             *
             * @param  {Function}
             */
            logout: function () {
                $cookieStore.remove('token');
                currentUser = {};
            },

            /**
             * Gets all available info on authenticated user
             *
             * @return {Object} user
             */
            getCurrentUser: function () {
                return currentUser;
            },

            hasCompanyDetails: function () {
                return currentUser.hasOwnProperty('company');
            },


            /**
             * Waits for currentUser to resolve before checking if user is logged in
             */
            isLoggedInAsync: function (cb) {
                if (currentUser.hasOwnProperty('$promise')) {
                    currentUser.$promise.then(function () {
                        cb(true);
                    }).catch(function () {
                        cb(false);
                    });
                } else if (currentUser.hasOwnProperty('role')) {
                    cb(true);
                } else {
                    cb(false);
                }
            },

            /**
             * Check if a user is an admin
             *
             * @return {Boolean}
             */
            isAdmin: function () {
                return currentUser.role === 'admin';
            },

            /**
             * Get auth token
             */
            getToken: function () {
                return $cookieStore.get('token');
            }
        };

        auth.refresh();

        return auth;
    });


})();
