(function() {
  "use strict";

  angular.module('CIRONS-MAIN-APP').run(function($rootScope, $location, $state, meFactory, editableOptions, editableThemes, $auth) {

    editableOptions.theme = 'default';

    editableThemes['default'].submitTpl = '<button type="submit">ok</button>';

    $rootScope.$on('$stateChangeSuccess', function(event, next) {
      if (!$auth.isAuthenticated()) {
        event.preventDefault();
        $location.path('/login');
      }
    });
  });

})();
