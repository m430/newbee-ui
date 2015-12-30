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