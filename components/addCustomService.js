angular.module('myApp')
	.factory('addCustomService',addCustomService)

	function addCustomService(){
		var newCustomName = '';
		var newCustomTime = 1;

		var service = {
			setNewCustomName: setNewCustomName,
			getNewCustomName: getNewCustomName,
			setNewCustomTime: setNewCustomTime,
			getNewCustomTime: getNewCustomTime
		}

		return service;

		function setNewCustomName(name){
			newCustomName = name;
		}

		function getNewCustomName(){
			return newCustomName;
		}

		function setNewCustomTime(time){
			newCustomTime = time;
		}

		function getNewCustomTime(){
			return newCustomTime;
		}

	}