angular.module('app')

.controller('WordController', ['$scope', function ($scope) {
	$scope.words = ['HTML5', 'CSS3','NewBee-UI'];
	$scope.name = '我是name';
	$scope.fnTest = function() {
		alert(1);
	}
}]);