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
	    $mdDialog.show(
	      $mdDialog.alert()
	        .parent(angular.element(document.querySelector('#popupContainer')))
	        .clickOutsideToClose(true)
	        .title('Settings')
	        .htmlContent()
	        .ariaLabel('Alert Dialog Demo')
	        .ok('Submit')
	        .targetEvent(ev)
	    )
	  }
})