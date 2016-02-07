var apiService = angular.module('apiService', ['ngResource', 'config']);

apiService.factory('api', ['$resource', '$http', 'API_ENDPOINT_URL', function ($resource, $http, API_ENDPOINT_URL) {
  "use strict";

  var service = {};

  service.get = function get(uri_path) {
    return $http.get(API_ENDPOINT_URL + uri_path);
  };

  return service;
}]);