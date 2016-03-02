angular.module("multiselect.tpl.html", []).run(["$templateCache", "$http", function($templateCache, $http) {
	$http.get('/templates/home/_activities_dropdown.html')
  .success(function(data) {
    $templateCache.put("multiselect.tpl.html", data);
  });
}]);