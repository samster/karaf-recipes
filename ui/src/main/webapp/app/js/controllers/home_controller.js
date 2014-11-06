angular.module("app").controller('HomeController', function($scope, $location, AuthenticationService, ResttestResource) {
  $scope.title = "Home";
  $scope.message = "Mouse Over these images to see a directive at work";

  var onLogoutSuccess = function(response) {
    $location.path('/login');
  };

  $scope.logout = function() {
    //AuthenticationService.logout().success(onLogoutSuccess);
    onLogoutSuccess();
  };

  $scope.testRest = function() {
    $scope.restData = ResttestResource.query();
  };

});
