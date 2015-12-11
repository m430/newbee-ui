/**
* app Module
*
* Description
*/
angular.module('app', ['ngRoute'])
.constant('Const', {
	tplPath: '../template/'
})
.config(['$routeProvider', 'Const', function ($routeProvider, Const) {
	$routeProvider
		.when('/:component', {
			templateUrl: Const.tplPath + 'component.html',
			controller: 'ComponentCtrl'
		})
		.otherwise({ redirectTo: '/words' });
}])

.controller('ComponentCtrl', ['$scope', 'Const', '$rootScope', function ($scope, Const, $rootScope) {
	$scope.title = $rootScope.currHash;
	$scope.compTpl = Const.tplPath + $rootScope.currHash;
}])

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
}])