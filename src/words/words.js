angular.module('newbee.words', [])

.directive('nbWord', NbWordDirective);

function NbWordDirective($interval) {

	var letterStyles = ['letter-rotatex', 'letter-rotatey', 'letter-scale', 'letter-roll', 'letter-type'];
	function getController(scope, ele, attrs) {
		console.log(scope.words);
	}
	function getTemplate($ele, $attrs) {
		var style = $attrs.nbStyle || 'rotate';	// default style is rotate
		var tpl = '<span class="nb-words">';
		if (letterStyles.indexOf(style) != -1) {
			tpl += '<b ng-repeat="word in words" ng-class="{\'nb-visible\':activeIndex == $index, \'nb-hidden\':activeIndex != $index}"><i ng-repeat="letter in word2Letters(word)"><em>{{letter}}</em></i></b>';
		} else {
			tpl += '<b ng-repeat="word in words" ng-class="{\'nb-visible\':activeIndex == $index, \'nb-hidden\':activeIndex != $index}">{{word}}</b>';
		}
		tpl += '</span>';
		return tpl;
	}
	function getLink($scope, $ele, $attrs, $ctrl) {
		var _duration = parseInt($attrs.nbDuration, 10) || 2500;
		var animationDuration = 1200;
		var letterAnimateDelay = 80;
		var _letterDuration = 800;

		var style = $attrs.nbStyle || 'rotate';
		$ele.addClass((letterStyles.indexOf(style) != -1 ? 'nb-' : 'nb-words-') + style);

		$scope.word2Letters = function (word) {
			return word.split('');
		}
		$scope.activeIndex = 0;
		var $animatorTimer = $interval(function() {
			if ($scope.activeIndex >= $scope.words.length) {
				$scope.activeIndex = 0;
			}
			$scope.activeIndex++;
		}, _duration + animationDuration);

		$scope.$on('$destroy', function() {
			// $timeout.cancel($animatorTimer);
			$interval.cancel($animatorTimer);
		});
	}
	return {
		restrict: 'E',
		replace: true,
		scope: {
			words: '=',
			nbEvent: '&'
		},
		// controller: getController,
		template: getTemplate,
		link: getLink
	};
}
