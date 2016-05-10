var apiService = angular.module('apiService', ['ngResource', 'config']);

apiService.factory('api', ['$resource', '$http', 'config', function ($resource, $http, config) {
  "use strict";
  
  function fullPath(endpoint) {
    return config.API_ENDPOINT_URL + endpoint;
  }

  var service = {};

  service.get = function (endpoint) {
    return $http.get(fullPath(endpoint));
  };
  service.post = function (endpoint, data) {
    return $http.post(fullPath(endpoint), data);
  };
  service.put = function (endpoint, data) {
    return $http.put(fullPath(endpoint), data);
  };
  service.delete = function (endpoint, data) {
    return $http.delete(fullPath(endpoint));
  };

  return service;
}]);