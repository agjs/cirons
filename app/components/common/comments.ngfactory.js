(function() {
  'use strict';
  module.exports = commentsFactory;

  function commentsFactory($http, $q) {

    return {

      getComments: function(url) {
        return $http.get('http://janalex.beta.cirons.com/api/v1/comments/' + url).then(function(comments) {
          if (comments) {
            return comments.data;
          } else {
            throw new Error('No comments found');
          }

        });
      },

      getComment: function(id) {
        return $http.get('http://janalex.beta.cirons.com/api/v1/comments' + '/' + id).then(function(item) {
          if (item) {
            return item.data;
          } else {
            throw new Error('No comments found');
          }

        });
      },

      addComment: function(data) {
        return $http({
          url: 'http://janalex.beta.cirons.com/api/v1/comments',
          method: 'POST',
          data: data
        }).then(function(item) {
          if (item) {
            return item.data;
          } else {
            throw new Error('Comment could not be added!');
          }

        });

      },

      removeComment: function(id) {
        return $http({
          url: 'http://janalex.beta.cirons.com/api/v1/comments/' + id,
          method: 'DELETE'
        }).then(function(item) {
          if (item) {
            return item.data;
          } else {
            throw new Error('Comment could not be deleted!');
          }

        });

      },

      editComment: function(id, data) {
        return $http({
          url: 'http://janalex.beta.cirons.com/api/v1/comments/' + id,
          method: 'PUT',
          data: data
        }).then(function(item) {
          if (item) {
            return item.data;
          } else {
            throw new Error('Comment could not be edited!');
          }

        });

      }
    }

  }

  commentsFactory.$inject = ['$http', '$q'];

})();
