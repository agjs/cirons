(function() {
  "use strict";
  module.exports = cirons_attachments;

  function cirons_attachments($auth) {

    var _token = "Bearer" + " " + $auth.getToken();
    console.log(_token);

    return {
      restrict: 'EA',
      scope: {
          objectType: '@',
          objectId: '@',
          attachments: '=',
          onchange: '&'
      },
      templateUrl: 'components/directives/cirons-attachments/template.html',
      replace: true,
      link: function(scope, element, attrs) {

          var previewTemplate="";
            previewTemplate += "<li id=\"preview_template\">";
            previewTemplate += "            Uploading <span data-dz-name><\/span>...";
            previewTemplate += "            <div class=\"ui active blue progress\">";
            previewTemplate += "              <div class=\"bar\" data-dz-uploadprogress>";
            previewTemplate += "                <div class=\"progress\"><\/div>";
            previewTemplate += "              <\/div>";
            previewTemplate += "            <\/div>";
            previewTemplate += "        <\/li>";

            console.log("scope: ", attrs.objectType, attrs.objectId);

          element.find(".drop").first().dropzone({
              url: 'http://janalex.beta.cirons.com/api/v1/attachments',
              multiple: true,
              uploadMultiple: false,
              headers: {
                  "Authorization": _token
              },
              success: function(){

              },
              previewTemplate: previewTemplate,
              previewsContainer: document.getElementById('preview_list')
          });
      }
    }

  }

  cirons_attachments.$inject = ['$auth'];

})();
