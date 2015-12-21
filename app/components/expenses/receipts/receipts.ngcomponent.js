(function(){
"use strict";

angular.module('CIRONS-MAIN-APP')
    .controller('receiptsController', require('./receipts.ngcontroller'))
    .factory('receiptsFactory', require('./receipts.ngfactory'))
    .config(require('./receipts.ngrouter'));

})();
