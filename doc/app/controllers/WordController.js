angular.module('app')

.controller('WordController', ['$scope', function ($scope) {
	$scope.words = ['HTML5', 'CSS3','NewBee-UI'];
	$scope.fnTest = function() {
		alert(1);
	}
	$scope.word2Letters = function (word) {
		return word.split('');
	}
}]);