angular.module('app')

.controller('ComponentCtrl', ['$scope', 'Const', '$rootScope', function ($scope, Const, $rootScope) {
	$scope.title = $rootScope.currHash;
	$scope.compTpl = Const.tplPath + $rootScope.currHash;
}]);
