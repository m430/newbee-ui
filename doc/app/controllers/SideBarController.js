angular.module('app')

.controller('SideBarController', ['$scope', '$rootScope', '$location', function ($scope, $rootScope, $location) {
	$rootScope.$on('$routeChangeSuccess', function(e, route) {
		$rootScope.path = $location.path().substring(1);	
	})
	$scope.components = [
		'word',
		'button',
		'link',
		'toggle',
		'loader',
		'input',
		'radio',
		'checkbox',
		'modal',
		'dropdown',
		'date-picker',
		'slider',
		'pagination'
	];
}]);