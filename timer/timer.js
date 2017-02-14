'use strict';
angular.module('myApp.timer', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/timer', {
    templateUrl: 'timer/timer.html',
    controller: 'timerCtrl'
  });
}])

.controller('timerCtrl', [ '$scope', '$timeout', 'settingsService', '$mdDialog', 'addCustomService', function($scope, $timeout, settingsService, $mdDialog, addCustomService) {
	$scope.fade = true;
    $scope.times = [
		{value : 25, name : "25 (Work Period)"},
		{value : 5, name : "5 (Short Break Period)"},
		{value : 10, name :"10 (Long Break Period)"}
	];

	$scope.paused = true;

	$scope.startButton = "Start";

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

    $scope.reset= function(time){
        $scope.pause()
        $scope.workTime=time;
        $scope.counter = $scope.workTime.value * 60;
        $scope.resume()
    }

    $scope.addCustom= function(ev){
        $mdDialog.show({
          controller: DialogController,
          templateUrl: 'addCustomDialog.html',
          parent: angular.element(document.body),
          targetEvent: ev,
          clickOutsideToClose:true,
          fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        })
        .then(function(){
            $scope.submitCustom();
        });
    }

    //controller for add custom time dialog
    function DialogController($scope, $mdDialog, settingsService) {
        $scope.hide = function() {
            $mdDialog.hide();
        };

        $scope.cancel = function() {
            $mdDialog.cancel();
        };

        $scope.confirm = function() {
            $scope.setNewCustomName()
            $scope.setNewCustomTime();
            $mdDialog.hide();
        };

        $scope.getNewCustomName = function(){
            return addCustomService.getNewCustomName();
        }

        $scope.getNewCustomTime = function(){
            return addCustomService.getNewCustomTime();
        }

        $scope.setNewCustomName = function(){
            return addCustomService.setNewCustomName($scope.newCustomName);
        }

        $scope.setNewCustomTime = function(){
            return addCustomService.setNewCustomTime($scope.newCustomTime);
        }

        //Range function for the time selector from 1-60minutes
        $scope.Range = function(start, end) {
            var result = [];
            for (var i = start; i <= end; i++) {
                result.push(i);
            }
            return result;
        }

        $scope.newCustomName = $scope.getNewCustomName();
        $scope.newCustomTime = $scope.getNewCustomTime();


    }

    $scope.newCustomName = ""; //set to default for safety 
    $scope.newCustomTime = 1; 

    $scope.submitCustom= function(){
        $scope.newCustomName = addCustomService.getNewCustomName();
        $scope.newCustomTime = addCustomService.getNewCustomTime();
    	$scope.times.push(
    		{value : $scope.newCustomTime, 
    			name : $scope.newCustomTime.toString() + " ("+ $scope.newCustomName + ")"})
    	$scope.newCustomName = ""; //return to default
    	$scope.newCustomTime = 1;
        addCustomService.setNewCustomTime($scope.newCustomTime); //reset to defaults in service
        addCustomService.setNewCustomName($scope.newCustomName);
    	$scope.workTime = $scope.times[$scope.times.length-1]; //set selected time to newly added custom time
    }

    $scope.getAudioVolume = function(){
    	return settingsService.getAudioVolume();
    }

    $scope.getSoundFile = function(){
        return settingsService.getSoundFile();
    }

    $scope.playAudio = function() {
        var audio = new Audio($scope.getSoundFile());
        audio.volume = $scope.getAudioVolume();
        audio.play();
    };
}]);