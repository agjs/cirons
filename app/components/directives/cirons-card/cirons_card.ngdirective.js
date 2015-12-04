(function(){
"use strict";

angular.module('CIRONS-MAIN-APP').directive('cironsCard', function(){

    return {
        restrict: 'EA',
        scope: {
            cardType: '=ctype',
            cardDescription: '=cdesc',
            cardColor: '=ccolor',
            cardIcon: '=cicon',
            cardCounter: '=ccounter',
            cstate: '@'
        },
        templateUrl: 'components/directives/cirons-card/template.html',
        replace:true,
        link: function(scope){}
    }

});

})();

