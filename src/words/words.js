angular.module('newbee.words', [])

.directive('nbWord', NbWordDirective);

// NbWordDirective.$inject = ['$scope'];

function NbWordDirective() {
	
	var letterStyles = ['letter-rotatex', 'letter-rotatey', 'letter-scale', 'letter-roll', 'letter-type'];
	function getController(scope, ele, attrs) {
		console.log(scope.words);
	}
	function getTemplate(iElement, iAttrs) {
		var style = iAttrs.nbStyle || 'rotate';	// default style is rotate
		var words = ['no', 'words', 'specified'];
		var tpl = '<span class="nb-words">';
		if (letterStyles.indexOf(style) != -1) {
			for (var i = 0; i < words.length; i++) {
				var word = '<b ' + (i == 0 ? 'class="nb-visible"' : '') + '>' + word2Letters(words[i]) + '</b>';
				tpl += word;
			}
		} else {
			// for (var i = 0; i < words.length; i++) {
			// 	var word = '<b ' + (i == 0 ? 'class="nb-visible"' : '') + '>' + words[i] + '</b>';
			// 	tpl += word;
			// }
			tpl += '<b ng-repeat="word in words" ng-class="{\'nb-visible\':activeIndex == $index, \'nb-hidden\':activeIndex != $index}">{{word}}</b>';
		}
		tpl += '</span>';
		return tpl;
		// return '<div>Hello words {{dataWords}}</div>';

	}
	function getLink(scope, iElement, iAttrs, reCtrl) {
		var _duration = parseInt(iAttrs.nbDuration, 10) || 2500;
		var animationDuration = 1200;
		var letterAnimateDelay = 80;
		var _letterDuration = 800;

		var style = iAttrs.nbStyle || 'rotate';
		iElement.addClass((letterStyles.indexOf(style) != -1 ? 'nb-' : 'nb-words-') + style);
		var $words = iElement.find('b');
		scope.activeIndex = 0;

		var $animatorTimer;
		function animator() {
			if (scope.activeIndex >= scope.words.length) {
				scope.activeIndex = 0;
			}
			scope.activeIndex++;
			scope.$apply();

			$animatorTimer = setTimeout(animator, _duration + animationDuration);
		}

		animator();
		scope.$on('$destroy', function() {
			clearTimeout($animatorTimer);
		});
	}
	function word2Letters(word) {
		var letters = '';
		for (var i = 0; i < word.length; i++) {
			letters += '<i><em>' + word[i] + '</em></i>';
		}
		return letters;
	}
	function getByIndex(arr, index) {
		if (index < 0) {
			return arr[arr.length - 1];
		} else if (index>= arr.length) {
			return arr[0];
		} else {
			return arr[index];
		}
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
