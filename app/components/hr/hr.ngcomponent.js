(function(){
"use strict";

angular.module('CIRONS-MAIN-APP')
    .controller('hrController', require('./hr.ngcontroller'))
    .factory('hrFactory', require('./hr.ngfactory'))
    .config(require('./hr.ngrouter'));

})();
