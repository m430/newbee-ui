/**
* app Module
*
* Description
*/
angular.module('app', ['ngRoute'])

.config(['$routeProvider', function ($routeProvider) {
	var tplPath = '../template/';
	$routeProvider
		.when('/:component', {
			templateUrl: tplPath + 'words.html',
			// controller: 'WordsCtrl'
		})
		.otherwise({ redirectTo: '/words' });
}])

.controller('SideBarCtrl', ['$scope', '$location', function ($scope, $location) {
	$scope.$on('$routeChangeSuccess', function(e, route) {
		$scope.currHash = route.params.component;		
	})
	$scope.components = [
		'words',
		'button',
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