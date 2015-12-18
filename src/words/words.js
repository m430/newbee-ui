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

function NbWordDirective($interval) {

	var letterStyles = ['letter-rotateX', 'letter-rotateY', 'letter-scale', 'letter-input'];
	function getController(scope, ele, attrs) {
		console.log(scope.words);
	}
	function getTemplate($ele, $attrs) {
		var style = $attrs.nbStyle || 'rotate';	// default style is rotate
		var tpl = '<span class="nb-words">';
		if (letterStyles.indexOf(style) != -1) {
			tpl += '<b on-finish-render="ngRepeatFinished" ng-repeat="word in words" ng-class="{\'nb-visible\':activeIndex == $index, \'nb-hidden\':activeIndex - 1 == $index}"><i ng-repeat="letter in word2Letters(word) track by $index"><em>{{letter}}</em></i></b>';
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
			lettersAnimation();
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
					cliping();
					break;
				default: '';
			}
		}

		function cliping() {
			var $next = $ele.find('b')[$scope.activeIndex];
			var width = $next.clientWidth;
			$ele.width(width + 10);
			setTimeout(function() {
				$ele.width(0);
			}, _duration + 100);
		}

		// when repeat render finished
		$scope.$on('ngRepeatFinished', function() {
			if (style == 'clip') cliping();
			if (letterStyles.indexOf(style) != -1) lettersAnimation();
		});

		function lettersAnimation() {
			if (letterStyles.indexOf(style) != -1) {
				var $words = $ele.find('b');
				if (style == 'letter-input') {
					$ele.removeClass('nb-waiting');
					setTimeout(function() {
						$ele.addClass('nb-selected');
					}, _duration + 100);
				}
				letterIn($words.eq($scope.activeIndex).find('i'));
				letterOut($words.eq($scope.prevIndex).find('i'));
			}
		}
		var inLetterIndex = 0, outLetterIndex = 0;
		function letterIn(letters) {
			if (style == 'letter-input') {
				$ele.removeClass('nb-selected');
			};

			if (letters[inLetterIndex]) {
				letters[inLetterIndex].classList.remove('nb-out');
				letters[inLetterIndex].classList.add('nb-in');
			}
			inLetterIndex++;
			if (inLetterIndex < letters.length) {
				setTimeout(function() {letterIn(letters)}, letterAnimateDelay);
			} else {
				inLetterIndex = 0;
				if (style == 'letter-input') {
					$ele.addClass('nb-waiting');
				};
			}
		}
		function letterOut(letters) {
			if (style == 'letter-input') {
				letters.removeClass('nb-in');
				return;
			}
			if (letters[outLetterIndex]) {
				letters[outLetterIndex].classList.remove('nb-in');
				letters[outLetterIndex].classList.add('nb-out');
			}
			outLetterIndex++;
			if (outLetterIndex < letters.length) {
				setTimeout(function() {letterOut(letters)}, letterAnimateDelay);
			} else {
				letters.removeClass('nb-in');
				outLetterIndex = 0;
			}
		}

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
		link: getLink,
		controller: function($scope) {
		
		}
	};
}
