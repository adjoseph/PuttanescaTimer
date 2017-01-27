'use strict';
angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', [ '$scope', '$timeout', 'settingsService', function($scope,$timeout, settingsService) {
	$scope.times = [
		{value : 25, name : "25 (Work Period)"},
		{value : 5, name : "5 (Short Break Period)"},
		{value : 10, name :"10 (Long Break Period)"}
	];

	$scope.paused = true;

	$scope.startButton = "Start";

	$scope.addingCustom = false;

	$scope.workTime = $scope.times[0];
	$scope.counter = $scope.workTime.value * 60;
	$scope.remainingMinutes = Math.floor($scope.counter / 60);
	$scope.remainingSeconds = $scope.counter - $scope.remainingMinutes * 60;
	if ($scope.remainingSeconds == 0)
		$scope.remainingSeconds = "00";

    $scope.onTimeout = function(){
        $scope.counter--;
        $scope.remainingMinutes = Math.floor($scope.counter / 60);
		$scope.remainingSeconds = $scope.counter - $scope.remainingMinutes * 60;
        if ($scope.counter > 0) {
            mytimeout = $timeout($scope.onTimeout,1000);
        }
        else {
        	$scope.playAudio();
            alert("Time is up!");
            if ($scope.workTime == $scope.times[0]){
            	$scope.workTime = $scope.times[1];
            	$scope.counter = $scope.workTime.value * 60;
            	$scope.remainingMinutes = Math.floor($scope.counter / 60);
				$scope.remainingSeconds = $scope.counter - $scope.remainingMinutes * 60;
				if ($scope.remainingSeconds == 0)
					$scope.remainingSeconds = "00";
            }
            else{
            	$scope.workTime = $scope.times[0];
            	$scope.counter = $scope.workTime.value * 60;
            	$scope.remainingMinutes = Math.floor($scope.counter / 60);
				$scope.remainingSeconds = $scope.counter - $scope.remainingMinutes * 60;
				if ($scope.remainingSeconds == 0)
					$scope.remainingSeconds = "00";
            }
        }
    }
    var mytimeout;
    
    $scope.pause= function(){
    	$timeout.cancel(mytimeout);
    	$scope.paused = true;
    	$scope.startButton = "Start"
    }

    $scope.resume= function(){
    	mytimeout = $timeout($scope.onTimeout,1000);
    	$scope.paused = false;
    	$scope.startButton = "Pause"
    }

    $scope.startOrResume= function(){
    	if($scope.paused == true){
    		$scope.resume()
    	}
    	else{
    		$scope.pause();
    	}
    }

    $scope.reset= function(){
        $scope.pause()
        $scope.counter = $scope.workTime.value * 60;
        $scope.resume()
    }

    $scope.addCustom= function(){
    	$scope.addingCustom = true;
    }

    $scope.newCustomName = "";
    $scope.newCustomTime = 1;

    $scope.submitCustom= function(){
    	$scope.times.push(
    		{value : $scope.newCustomTime, 
    			name : $scope.newCustomTime.toString() + " ("+ $scope.newCustomName + ")"});
    	$scope.addingCustom = false;
    	$scope.newCustomName = "";
    	$scope.newCustomTime = 1;
    	$scope.workTime = $scope.times[$scope.times.length-1];
    }

    $scope.getAudioVolume = function(){
    	return settingsService.getAudioVolume();
    }
    $scope.volume = $scope.getAudioVolume().value;

    $scope.playAudio = function() {
        var audio = new Audio('../ding.mp3');
        audio.volume = $scope.getAudioVolume().value;
        audio.play();
    };

    $scope.Range = function(start, end) {
	    var result = [];
	    for (var i = start; i <= end; i++) {
	        result.push(i);
	    }
	    return result;
	}
}]);