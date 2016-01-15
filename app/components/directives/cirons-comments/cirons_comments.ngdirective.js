(function() {
  "use strict";
  module.exports = cirons_comments;

  function cirons_comments() {

    return {
      restrict: 'EA',
      scope: {
      },
      templateUrl: 'components/directives/cirons-comments/template.html',
      controller: function($scope, $rootScope, $state, $http, commentsFactory, $timeout){
          $scope.active = false;
          $scope.url = $state.href();
          $scope.comment_text = "";
          $scope.comments = [];
          $scope.parsedURL = null;

          $rootScope.$on('$stateChangeStart',
          function(event, toState, toParams, fromState, fromParams){
              $scope.active = false;
              $scope.comments = [];
          });

          $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
              $scope.comments = [];
              $scope.parsedURL = "";
              $timeout(function(){
                  var url = $state.current.ncyBreadcrumbLink;
                  $scope.parsedURL = $scope.parseUrl(url);
                  $scope.getComments();
              }, 100);
          });

          $scope.postComment = function(){
              if($scope.comment_text == false || $scope.comment_text == "" || $scope.parsedURL == ""){
                  return;
              }

              commentsFactory.addComment({
                  text: $scope.comment_text,
                  url: $scope.parsedURL
              }).then(function(comment){
                  $scope.comments.push(comment);
              });
          };

          $scope.parseUrl = function(url_to_parse){
              url_to_parse = url_to_parse.replace(/general|addresses|address|payments|accounting|profit|/gi, "");
              url_to_parse = url_to_parse.replace(/\//g, ".");
              url_to_parse = url_to_parse.replace(/\.\./g, ".");
              url_to_parse = url_to_parse.replace(/#\./g, "");

              return url_to_parse;
          };

          $scope.getComments = function(){
              commentsFactory.getComments($scope.parsedURL).then(function(comments){
                  $scope.comments = comments;
              });
          };

          $scope.open = function(){
              $scope.active = !$scope.active;
              if($scope.active){

              }
          };
      },
      replace: true,
      link: function(scope, element, attrs) {

      }
    }

  }

  cirons_comments.$inject = [];

})();
