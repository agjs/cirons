(function(){
"use strict";

angular.module('CIRONS-MAIN-APP').directive('cironsCard', function(){

    return {
        templateUrl: 'components/directives/cirons-card/template.html',
        restrict: 'E',
        scope: {
            color: '=color',
            description: '=description',
            icon: '=icon',
            length: '=length'
        }
    }

});

})();

