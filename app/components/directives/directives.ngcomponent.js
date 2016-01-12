(function(){
"use strict";

angular.module('CIRONS-MAIN-APP')

.directive('cironsCard', require('./cirons-card/cirons_card.ngdirective'))
.directive('cironsStatbox', require('./cirons-statbox/cirons_statbox.ngdirective'))
.directive('cironsList', require('./cirons-list-view/cirons_list_view.ngdirective'))
.directive('cironsModelSelector', require('./cirons-model-selector/cirons_model_selector.ngdirective'))
.directive('cironsDropzone', require('./cirons-dropzone/cirons_dropzone.ngdirective'))
.directive('cironsOrderDownload', require('./cirons-order-download/cirons_order_download.ngdirective'))
.directive('cironsCheckbox', require('./cirons-checkbox/cirons_checkbox.ngdirective'))
.directive('cironsAttachments', require('./cirons-attachments/cirons_attachments.ngdirective'))
.directive('ngEnter', require('./ng-enter/ng_enter.ngdirective'))
.directive('cironsStatusBadge', require('./cirons-status-badge/cirons_status_badge.ngdirective'))
.directive('cironsAddressSelector', require('./cirons-address-selector/cirons_address_selector.ngdirective'));

})();
