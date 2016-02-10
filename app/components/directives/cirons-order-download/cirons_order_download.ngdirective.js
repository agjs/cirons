(function() {
  "use strict";
  module.exports = cirons_order_download;

  function cirons_order_download() {

    return {
      restrict: 'EA',
      scope: {
          order: '='
      },
      templateUrl: 'components/directives/cirons-order-download/template.html',
      replace: true,
      link: function(scope, element, attrs) {
          element.dropdown();
      },
      controller: function($scope, $auth){
          $scope.downloadPDF = function(){
              window.location = 'http://janalex.beta.cirons.com/api/v1/orders/' + $scope.order.id + '/pdf?token=' + $auth.getToken();
          };

          $scope.downloadPackingList = function(){
              window.location = 'http://janalex.beta.cirons.com/api/v1/orders/' + $scope.order.id + '/packing_list?token=' + $auth.getToken();
          };

          $scope.downloadInvoicePDF = function(id){
              window.location = 'http://janalex.beta.cirons.com/api/v1/invoices/' + id + '/pdf?token=' + $auth.getToken();
          }
      }
    }

  }

  cirons_order_download.$inject = [];

})();
