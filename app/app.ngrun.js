(function() {
  "use strict";


  module.exports = ngRun;

  function ngRun($rootScope, $location, $state, meFactory, editableOptions, editableThemes, $auth) {

    editableOptions.theme = 'default';

    editableThemes['default'].submitTpl = '<button type="submit">ok</button>';

    $rootScope.$on('$stateChangeSuccess', function(event, next) {
      if (!$auth.isAuthenticated()) {
        event.preventDefault();
        $location.path('/login');
      }
    });
  }
  ngRun.$inject = ['$rootScope', '$location', '$state', 'meFactory', 'editableOptions', 'editableThemes', '$auth'];
})();
