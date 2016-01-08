(function() {
  'use strict';
  module.exports = usersFactory;

  function usersFactory($http, $q) {

    return {

      getUsers: function() {
        return $http.get('http://janalex.beta.cirons.com/api/v1/users').then(function(users) {
          if (users) {
            return users.data;
          } else {
            throw new Error('No users found');
          }

        });
      },

      getUser: function(id) {
        return $http.get('http://janalex.beta.cirons.com/api/v1/users' + '/' + id).then(function(item) {
          if (item) {
            return item.data;
          } else {
            throw new Error('No users found');
          }

        });
      },

      addUser: function(data) {
        return $http({
          url: 'http://janalex.beta.cirons.com/api/v1/users',
          method: 'POST',
          data: data
        }).then(function(item) {
          if (item) {
            return item.data;
          } else {
            throw new Error('User could not be added!');
          }

        });

      },

      removeUser: function(id) {
        return $http({
          url: 'http://janalex.beta.cirons.com/api/v1/users/' + id,
          method: 'DELETE'
        }).then(function(item) {
          if (item) {
            return item.data;
          } else {
            throw new Error('User could not be deleted!');
          }

        });

      },

      editUser: function(id, data) {
        return $http({
          url: 'http://janalex.beta.cirons.com/api/v1/users/' + id,
          method: 'PUT',
          data: data
        }).then(function(item) {
          if (item) {
            return item.data;
          } else {
            throw new Error('User could not be edited!');
          }

        });

    },

      changePassword: function(id, data){
          return $http({
            url: 'http://janalex.beta.cirons.com/api/v1/users/' + id + "/password",
            method: 'PUT',
            data: data
          }).then(function(item) {
            if (item) {
              return item.data;
            } else {
              throw new Error('User password could not be edited!');
            }
          });
      }
    }

  }

  usersFactory.$inject = ['$http', '$q'];

})();
