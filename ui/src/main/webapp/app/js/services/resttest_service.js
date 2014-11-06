angular.module("app").factory("ResttestService", function($q, $http) {

  var getResttest = function() {
    return $http.get('/cxf/rest');
  };

  return { getResttest: getResttest };
});
