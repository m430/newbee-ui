angular.module('newbee.input', [])

.directive('nbInput', NbInputDirective);

function NbInputDirective() {
	function getTemplate(iEle, iAttrs) {
		var theme = iAttrs.nbTheme || 'haruki';
		var id = iAttrs.nbId || '';
		var label = iAttrs.nbLabel || 'Please input somthing..';
		var tpl = '<span class="nb-input nb-input-' + theme + '">\
					<input type="text" id="' + id + '">\
					<label for="' + id + '" data-content="' + label + '">\
						<span>' + label + '</span>\
					</label>\
				</span>';
		return tpl;
	}
	function getLink(scope, iEle, iAttrs, ctrl) {
		iEle.find('input').blur(function(event) {
			if ($(this).val().trim()) {
				$(this).addClass('nb-input-filled');
			} else {
				$(this).removeClass('nb-input-filled');
			}
		});
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