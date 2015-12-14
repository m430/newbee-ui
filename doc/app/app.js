/**
* app Module
*
* Description
*/
angular.module('app', ['ngRoute', 'newbee'])
.constant('Const', {
	tplPath: '../template/'
})
.directive('nbButton', function(){
	return {
		restrict: 'E',
		replace: true,
		template: '<div>nb BUTTON</div>'
	}
})
.config(['$routeProvider', 'Const', function ($routeProvider, Const) {
	$routeProvider
		.when('/:component', {
			templateUrl: Const.tplPath + 'component.html',
			controller: 'ComponentCtrl'
		})
		.otherwise({ redirectTo: '/words' });
}]);
