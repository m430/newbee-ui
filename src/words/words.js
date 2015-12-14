angular.module('newbee.words', [])

.directive('nbWords', [function () {

	var letterStyles = ['letter-rotatex', 'letter-rotatey', 'letter-scale', 'letter-roll', 'letter-type'];

	function word2Letters(word) {
		var letters = '';
		for (var i = 0; i < word.length; i++) {
			letters += '<i><em>' + word[i] + '</em></i>';
		}
		return letters;
	}
	return {
		restrict: 'E',
		replace: true,
		scope: {
			dataWords: '@'
		},
		template: function(iElement, iAttrs) {
			var style = iAttrs.nbStyle || 'rotate';	// default style is rotate
			var words = iAttrs.words || ['no', 'words', 'specified'];
			var tpl = '<div>{{dataWords}}</div><span class="nb-words">';
			if (letterStyles.indexOf(style) != -1) {
				for (var i = 0; i < words.length; i++) {
					var word = '<b ' + (i == 0 ? 'class="nb-visible"' : '') + '>' + word2Letters(words[i]) + '</b>';
					tpl += word;
				}
			} else {
				for (var i = 0; i < words.length; i++) {
					var word = '<b ' + (i == 0 ? 'class="nb-visible"' : '') + '>' + words[i] + '</b>';
					tpl += word;
				}
			}
			tpl += '</span>';
			return tpl;
		},
		link: function (scope, iElement, iAttrs, reCtrl) {
			var _duration = parseInt(iAttrs.nbDuration, 10) || 2500;
			var animationDuration = 1200;
			var letterAnimateDelay = 80;
			var _letterDuration = 800;

			var style = iAttrs.nbStyle || 'rotate';
			iElement.addClass((letterStyles.indexOf(style) != -1 ? 'nb-' : 'nb-words-') + style);
			var $words = iElement.find('b');
			var activeWordIndex = 0,
					$current = $words[0],
					$previous,
					$next,
					$animatorTimer;
			function animator() {
				if (activeWordIndex >= $words.length) {
					activeWordIndex = 0;
				}
				$current = getByIndex($words, activeWordIndex);
				$previous = getByIndex($words, activeWordIndex - 1);
				$next = getByIndex($words, activeWordIndex + 1);

				$current.classList.remove('nb-hidden');
				$current.classList.add('nb-visible');
				$previous.classList.remove('nb-visible');
				$previous.classList.add('nb-hidden');

				activeWordIndex++;

				$animatorTimer = setTimeout(animator, _duration + animationDuration);
			}

			animator();
			scope.$on('$destroy', function() {
				clearTimeout(animatorTimer);
			});

			function getByIndex(arr, index) {
				if (index < 0) {
					return arr[arr.length - 1];
				} else if (index>= arr.length) {
					return arr[0];
				} else {
					return arr[index];
				}
			}
		}
	}
}])
