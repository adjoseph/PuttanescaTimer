'use strict';
angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', [ '$scope', '$timeout', function($scope,$timeout) {
	$scope.workTime = 5;
	$scope.counter = $scope.workTime;
    $scope.onTimeout = function(){
        $scope.counter--;
        if ($scope.counter > 0) {
            mytimeout = $timeout($scope.onTimeout,1000);
        }
        else {
            alert("Time is up!");
        }
    }
    var mytimeout = $timeout($scope.onTimeout,1000);
    
    $scope.reset= function(){
        $scope.counter = $scope.workTime;
        mytimeout = $timeout($scope.onTimeout,1000);
    }

}]);