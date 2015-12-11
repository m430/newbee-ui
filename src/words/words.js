angular.module('newbee.words', [])

.directive('nbWords', [function () {

	var letterStyles = ['letter-rotatex', 'letter-rotatey', 'letter-scale', 'letter-roll', 'letter-type'];
	return {
		restrict: 'E',
		replace: true,
		template: function(iElement, iAttrs) {
			var style = iAttrs.nbStyle || 'rotate';	// default style is rotate
			var words = iAttrs.words || ['no', 'words', 'specified'];
			var tpl = '<span class="nb-words"'>;
			if (letterStyles.indexOf(style) != -1) {
				for (var i = 0; i < words.length; i++) {
					var word = '<b>' + (i == 0 ? 'class="nb-visible"' : '') + '>' + word2Letters(words[i]) + '</b>'
					tpl += word;
				}
			} else {
				for (var i = 0; i < words.length; i++) {
					var word = '<b>' + (i == 0 ? 'class="nb-visible"' : '') + '>' + words[i] + '</b>'
					tpl += word;
				}
			}
			tpl += '</span>';
			return tpl;
		},
		link: function (scope, iElement, iAttrs, reCtrl) {
			var style = iAttrs.nbStyle || 'rotate';
			iElement.addClass((letterStyles.indexOf(style) != -1 ? 'nb-' : 'nb-words-') + style);
		}
	};

	function word2Letters(word) {
		var letters = '';
		for (var i = 0; i < word.length; i++) {
			letters += '<i><em>' + word[i] + '</em></i>';
		}
		return letters;
	}
}])