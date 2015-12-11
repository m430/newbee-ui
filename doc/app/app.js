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
}]);

