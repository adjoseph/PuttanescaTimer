angular.module('myApp')
	.factory('settingsService',settingsService)

	function settingsService(){
		var audioVolume = 1;

		var service = {
			getAudioVolume: getAudioVolume,
			setAudioVolume: setAudioVolume
		}

		return service;

		function getAudioVolume(){
			return audioVolume;
		}

		function setAudioVolume(volume){
			audioVolume = volume;
		}
	}