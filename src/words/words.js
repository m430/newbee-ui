angular.module('newbee.words', [])

.directive('onFinishRender', function ($timeout) {
return {
    restrict: 'A',
    link: function (scope, element, attr) {
        if (scope.$last === true) {
            $timeout(function () {
                scope.$emit('ngRepeatFinished');
            });
        }
    }
}})

.directive('nbWord', NbWordDirective);

function NbWordDirective($interval, $timeout) {

	var letterStyles = ['letter-rotatex', 'letter-rotatey', 'letter-scale', 'letter-roll', 'letter-type'];
	function getController(scope, ele, attrs) {
		console.log(scope.words);
	}
	function getTemplate($ele, $attrs) {
		var style = $attrs.nbStyle || 'rotate';	// default style is rotate
		var tpl = '<span class="nb-words">';
		if (letterStyles.indexOf(style) != -1) {
			tpl += '<b on-finish-render="ngRepeatFinished" ng-repeat="word in words" ng-class="{\'nb-visible\':activeIndex == $index, \'nb-hidden\':activeIndex - 1 == $index}"><i ng-repeat="letter in word2Letters(word)"><em>{{letter}}</em></i></b>';
		} else {
			tpl += '<b on-finish-render="ngRepeatFinished" ng-repeat="word in words" ng-class="{\'nb-visible\':activeIndex == $index, \'nb-hidden\':prevIndex == $index}">{{word}}</b>';
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
		$scope.prevIndex = $scope.words.length - 1;
		$scope.nextIndex = 1;
		var $animatorTimer = $interval(animator, _duration + animationDuration);

		function animator() {
			$scope.activeIndex++;
			$scope.prevIndex = $scope.activeIndex - 1;
			$scope.nextIndex = $scope.activeIndex + 1;
			if ($scope.prevIndex < 0) {
				$scope.prevIndex = $scope.words.length - 1;
			};
			if ($scope.activeIndex >= $scope.words.length) {
				$scope.activeIndex = 0;
			}
			if ($scope.nextIndex >= $scope.words.length) {
				$scope.nextIndex = 0;
			};
			fnStyle();
		}

		function fnStyle() {
			switch(style) {
				case 'loading':
					$ele.removeClass('nb-loading');
					setTimeout(function() {
						$ele.addClass('nb-loading');
					}, 200);
					break;
				case 'clip':
					setTimeout(cliping, _duration + 100);
					break;
				case 'letter-type':
					$ele.removeClass('nb-waiting');
					setTimeout(function() {
						$ele.addClass('nb-waiting');
					}, _duration + 100);
					break;
				default: '';
			}
		}

		function cliping() {
			var $next = $ele.find('b')[$scope.nextIndex];
			var width = $next.clientWidth;
			$ele.width(0);
			setTimeout(function() {
				$ele.width(width + 15);
			}, 1000);
		}

		// if (style == 'clip') $timeout(cliping, 0);

		$scope.$on('ngRepeatFinished', function() {
			if (style == 'clip') cliping();			
		});

		$scope.$on('$destroy', function() {
			$interval.cancel($animatorTimer);
		});
	}
	return {
		restrict: 'E',
		replace: true,
		scope: {
			words: '=',
			nbStyle: '@'
		},
		template: getTemplate,
		link: getLink
	};
}
