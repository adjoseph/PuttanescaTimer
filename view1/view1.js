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
	$scope.counter = $scope.workTime * 60;
	$scope.remainingMinutes = Math.floor($scope.counter / 60);
	$scope.remainingSeconds = $scope.counter - $scope.remainingMinutes * 60;
    $scope.onTimeout = function(){
        $scope.counter--;
        $scope.remainingMinutes = Math.floor($scope.counter / 60);
		$scope.remainingSeconds = $scope.counter - $scope.remainingMinutes * 60;
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

    $scope.pause= function(){
    	$timeout.cancel(mytimeout);
    }

    $scope.resume= function(){
    	mytimeout = $timeout($scope.onTimeout,1000);
    }

}]);