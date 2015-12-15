(function(){
"use strict";

angular.module('CIRONS-MAIN-APP')
    .controller('dashboardController', require('./dashboard.ngcontroller'))
    .factory('dashboardFactory', require('./dashboard.ngfactory'))
    .config(require('./dashboard.ngrouter'));

})();
