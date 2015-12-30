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
		.when('/select', {
			templateUrl: Const.tplPath + 'select.html',
			controller: 'SelectController'
		})
		.when('/input', {
			templateUrl: Const.tplPath + 'input.html'
		})
		.when('/progress', {
			templateUrl: Const.tplPath + 'progress.html',
			controller: 'ProgressController'
		})
		.otherwise({ redirectTo: '/word' });
}]);

angular.module('app')

.controller('ProgressController', ['$scope', function ($scope) {
	$scope.percent = 45;
	$scope.setPercent = function(p) {
		$scope.percent = p;
	}
}])
angular.module('app')

.controller('SelectController', ['$scope', function ($scope) {
	$scope.cities = [
		{value: '北京', key: 'BJ'},
		{value: '西安', key: 'XA'},
		{value: '上海', key: 'SH'},
		{value: '深圳', key: 'SZ'},
		{value: '广州', key: 'GZ'},
		{value: '洛杉矶', key: 'LOS'}
	];
}]);
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
		'radio',
		'checkbox',
		'input',
		'select',
		'progress',
		'modal',
		'dropdown',
		'date-picker',
		'slider',
		'pagination'
	];
}]);
angular.module('app')

.controller('WordController', ['$scope', function ($scope) {
	$scope.words = ['HTML5', 'CSS3','NewBee-UI'];
}]);