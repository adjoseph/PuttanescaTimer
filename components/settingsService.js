angular.module('myApp')
	.factory('settingsService',settingsService)

	function settingsService(){
		var audioVolume = 1;
		var soundFile = '../sounds/ding.mp3';

		var service = {
			getAudioVolume: getAudioVolume,
			setAudioVolume: setAudioVolume,
			getSoundFile: getSoundFile,
			setSoundFile: setSoundFile
		}

		return service;

		function getAudioVolume(){
			return audioVolume;
		}

		function setAudioVolume(volume){
			audioVolume = volume;
		}

		function getSoundFile(){
			return soundFile;
		}

		function setSoundFile(file){
			soundFile = file;
		}
	}