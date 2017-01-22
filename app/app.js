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
	    // Appending dialog to document.body to cover sidenav in docs app
	    // Modal dialogs should fully cover application
	    // to prevent interaction outside of dialog
	    $mdDialog.show(
	      $mdDialog.alert()
	        .parent(angular.element(document.querySelector('#popupContainer')))
	        .clickOutsideToClose(true)
	        .title('About')
	        .htmlContent('The Pomodoro Technique is a time management method.' + '<br>' +  'The goal of the technique is to facilitate iterative development by breaking work into intervals')
	        .ariaLabel('Alert Dialog Demo')
	        .ok('Got it!')
	        .targetEvent(ev)
	    )
	  }
})