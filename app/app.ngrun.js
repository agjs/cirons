(function() {
  "use strict";

  angular.module('CIRONS-MAIN-APP').run(function($rootScope, $state, meFactory, editableOptions, editableThemes, authenticationFactory) {

    authenticationFactory.getCurrentUser().then(function(d){
      console.log(d);
    })

    $rootScope.$state = $state;

    // set `default` theme
    editableOptions.theme = 'default';

    // overwrite submit button template
    editableThemes['default'].submitTpl = '<button type="submit">ok</button>';


  });

})();
