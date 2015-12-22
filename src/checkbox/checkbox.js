angular.module('newbee.checkbox', [])

.directive('nbCheckbox', NbCheckboxDirective);

function NbCheckboxDirective() {
	function getTemplate(iEle, iAttrs) {
		var text = iEle.html();
		var id = iAttrs.nbId;
		var theme = iAttrs.nbTheme;
		var tpl = '<label class="nb-checkbox" for="' + id + '"><input id="' + id + '" type="radio" name="'+name+'"><span class="nb-outer"><span class="nb-inner"></span></span>' + text + '</label>';  
		return tpl;
	}
	function getLink(scope, iEle, iAttrs, ctrl) {
		
	}
	return {
		restrict: 'E',
		replace: true,
		scope: {
			nbId: '@',
			nbTheme: '@'
		},
		template: getTemplate,
		link: getLink
	}
}