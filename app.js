'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.version',
  'ngMaterial',
  'ngSanitize'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/view1'});
}])

.controller('AppCtrl', function($scope, $mdDialog) {
	$scope.status = '  ';
	$scope.customFullscreen = false;


	$scope.showAbout = function(ev) {
	    $mdDialog.show(
	      $mdDialog.alert()
	        .parent(angular.element(document.querySelector('#popupContainer')))
	        .clickOutsideToClose(true)
	        .title('About')
	        .htmlContent('The Pomodoro Technique is a time management method.' + '<br>' +
	          'The goal of the technique is to facilitate iterative development by breaking work into intervals:' + '<br>' +
	          '    - Set timer to 25 minutes, and Work on task until time is up' + '<br>' +
	          '    - Set timer to 5 minutes, and take a Short Break' + '<br>' +
	          '    - Repeat' + '<br>' +
	          '    - Every four cycles set timer to 10 minutes, and take a Long Break in place of the Short Break' + '<br>' +
	          '<br>' + 
	          'PuttanescaTimer automatically switches between these three Periods' + '<br>' +
	          'You can add in your own custom time Periods to suit your personal work habits' + '<br>'+
	          '<br>' + 
	          'Why "PuttanescaTimer"?' + '<br>'+
	          'Simple, puttanesca is the funniest of all pastas')
	        .ariaLabel('Alert Dialog Demo')
	        .ok('Got it!')
	        .targetEvent(ev)
	    )
	  }

	  $scope.showSettings = function(ev) {
	    $mdDialog.show({
	      controller: DialogController,
	      templateUrl: 'settingsDialog.html',
	      parent: angular.element(document.body),
	      targetEvent: ev,
	      clickOutsideToClose:true,
	      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
	    })
	  }

	  function DialogController($scope, $mdDialog, settingsService) {
	    $scope.hide = function() {
	      	$mdDialog.hide();
	    };

	    $scope.cancel = function() {
	      	$mdDialog.cancel();
	    };

	    $scope.confirm = function() {
	    	$scope.setAudioVolume()
	      	$mdDialog.hide();
	    };

	    $scope.getAudioVolume = function(){
	    	return settingsService.getAudioVolume();
	    }
	    
	    $scope.volumes  = [
	    	{name:'100%', value: 1},
	    	{name: '75%', value: .75}, 
	    	{name: '50%', value: .50},
	    	{name: '25%', value: .25},
	    	{name: 'Mute', value: 0}
	    ];
	    $scope.audioVolume = $scope.getAudioVolume();
	    $scope.volume = $scope.volumes[0];
	    for(var i = 0; i < $scope.volumes.length; i++){
	    	if($scope.volumes[i].value == $scope.audioVolume)
	    		$scope.volume = $scope.volumes[i]
	    }

	    $scope.setAudioVolume = function(){
	    	return settingsService.setAudioVolume($scope.volume.value);
	    }
	   	
  }
})