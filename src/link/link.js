angular.module('newbee.link', [])

.directive('nbLink', NbLinkDirective);

function NbLinkDirective() {
	function getTemplate(iEle, iAttrs) {
		var text = iEle.html();
		var theme = iAttrs.nbTheme;
		var tpl = '';
		if (theme == 'square') {
			tpl += '<span class="nb-link-'+theme+'"><a class="nb-link" href="#">'+text+'</a>';
		} else {
			tpl += '<a href="#" class="nb-link nb-link-' + theme + '">'+text+'</a>';
		}
		return tpl;
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