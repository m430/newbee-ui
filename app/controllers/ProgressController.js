angular.module('app')

.controller('ProgressController', ['$scope', function ($scope) {
	$scope.percent = 45;
	$scope.setPercent = function(p) {
		$scope.percent = p;
	}
}])