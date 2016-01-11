(function() {
  "use strict";
  module.exports = cirons_attachments;

  function cirons_attachments($auth) {

    var _token = "Bearer" + " " + $auth.getToken();

    return {
      restrict: 'EA',
      scope: {
          objectType: '@',
          objectId: '=',
          attachments: '=',
          onchange: '&'
      },
      transclude: true,
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

            console.log("attachments: ", scope.attachments);

            console.log("scope: ", attrs.objectType, scope.objectId);

          element.find(".drop").first().dropzone({
              url: 'http://janalex.beta.cirons.com/api/v1/attachments',
              multiple: true,
              uploadMultiple: false,
              headers: {
                  "Authorization": _token
              },
              init: function(){
                  this.on("success", function (file) {
                      this.removeAllFiles();
                  });
              },
              success: function(file, response){
                  scope.attachments.push(response);
                  console.log(scope.attachments);
              },
              sending: function(file, xhr, data){
                  data.append("object_id", scope.objectId);
                  data.append("object_type", attrs.objectType);
              },
              previewTemplate: previewTemplate,
              previewsContainer: document.getElementById('preview_list')
          });
      }
    }

  }

  cirons_attachments.$inject = ['$auth'];

})();
