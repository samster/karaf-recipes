angular.module("app").factory("ResttestResource", function($q, $resource) {
  return $resource('/cxf/rest',{}, { 'query': {method: 'GET', isArray: false} });
});
