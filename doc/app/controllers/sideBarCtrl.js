angular.module('app')

.controller('SideBarCtrl', ['$scope', '$rootScope', '$location', function ($scope, $rootScope, $location) {
	$rootScope.$on('$routeChangeSuccess', function(e, route) {
		$rootScope.currHash = route.params.component;		
	})
	$scope.components = [
		'words',
		'buttons',
		'links',
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