/**
* app Module
*
* Description
*/
angular.module('app', ['ngRoute', 'newbee'])
.constant('Const', {
	tplPath: '../template/',
	title: 'andy'
})
.directive('nbButton', [function () {
	return {
		restrict: 'E',
		template: '<div>Hello Button</div>',
		link: function (scope, iElement, iAttrs) {
		}
	};
}])
.config(['$routeProvider', 'Const', function ($routeProvider, Const) {
	function getComponentTemplate() {

	}
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
		.otherwise({ redirectTo: '/words' });
}]);
