angular.module('newbee.link', [])

.directive('nbLink', NbLinkDirective);

function NbLinkDirective() {
	function getTemplate(iEle, iAttrs) {
		var theme = iAttrs.nbTheme;
		var tpl = '';
		if (theme == 'square') {
			tpl += '<span class="nb-link-'+theme+'"><a class="nb-link" href="#"><ng-transclude></ng-transclude></a>';
		} else {
			tpl += '<a href="#" class="nb-link nb-link-' + theme + '"><ng-transclude></ng-transclude></a>';
		}
		return tpl;
	}
	return {
		restrict: 'E',
		replace: true,
		transclude: true,
		scope: {
			nbTheme: '@'
		},
		template: getTemplate
	}
}