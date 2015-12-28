angular.module('newbee.input', [])

.directive('nbInput', NbInputDirective);

function NbInputDirective() {
	function getTemplate(iEle, iAttrs) {
		var theme = iAttrs.nbTheme || 'haruki';
		var label = iAttrs.nbLabel || 'Please input somthing..';
		var tpl = '<span class="nb-input nb-input-' + theme + '">\
					<input type="text" id="input-1">\
					<label for="input-1">\
						<span>' + label + '</span>\
					</label>\
				</span>';
		return tpl;
	}
	function getLink(scope, iEle, iAttrs, ctrl) {

	}
	return {
		restrict: 'E',
		replace: true,
		scope: {

		},
		template: getTemplate,
		link: getLink
	}
}