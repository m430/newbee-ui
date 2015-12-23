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
		.when('/word', {
			templateUrl: Const.tplPath + 'word.html',
			controller: 'WordController'
		})
		.when('/button', {
			templateUrl: Const.tplPath + 'button.html'
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
		.when('/checkbox', {
			templateUrl: Const.tplPath + 'checkbox.html'
		})
		.when('/link', {
			templateUrl: Const.tplPath + 'link.html'
		})
		.otherwise({ redirectTo: '/word' });
}]);
