angular.module('newbee.link', [])

.directive('nbLink', NbLinkDirective);

function NbLinkDirective() {
	function getTemplate(iEle, iAttrs) {
		var text = iEle.html();
		var theme = iAttrs.nbTheme;
		return '<a href="#" class="nb-link nb-link-' + theme + '">'+text+'</a>';
	}
	return {
		restrict: 'E',
		replace: true,
		scope: {
			nbTheme: '@'
		},
		template: getTemplate
	}
}