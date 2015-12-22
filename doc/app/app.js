/**
* app Module
*
* Description
*/
angular.module('app', ['ngRoute', 'newbee'])
.constant('Const', {
	tplPath: '../template/'
})
.config(['$routeProvider', 'Const', function ($routeProvider, Const) {
	$routeProvider
		.when('/words', {
			templateUrl: Const.tplPath + 'words.html',
			controller: 'WordController'
		})
		.when('/buttons', {
			templateUrl: Const.tplPath + 'buttons.html'
		})
		.when('/loader', {
			templateUrl: Const.tplPath + 'loader.html'
		})
		.when('/toggle', {
			templateUrl: Const.tplPath + 'toggle.html'
		})
		.when('/radio', {
			templateUrl: Const.tplPath + 'radio.html'
		})
		.otherwise({ redirectTo: '/words' });
}]);
