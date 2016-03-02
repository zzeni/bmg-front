var apiService = angular.module('apiService', ['ngResource', 'config']);

apiService.factory('api', ['$resource', '$http', 'config', function ($resource, $http, config) {
  "use strict";

  var service = {};

  service.get = function get(uri_path) {
    return $http.get(config.API_ENDPOINT_URL + uri_path);
  };

  return service;
}]);