angular.module('newbee.checkbox', [])

.directive('nbCheckbox', NbCheckboxDirective);

function NbCheckboxDirective() {
	function getTemplate(iEle, iAttrs) {
		var text = iEle.html();
		var id = iAttrs.nbId || '';
		var name = iAttrs.nbName || '';
		var theme = iAttrs.nbTheme || 'default';
		var tpl = '<label class="nb-checkbox" for="' + id + '"><input class="nb-checkbox-'+theme+'" id="' + id + '" type="checkbox" name="'+name+'">' + text + '</label>';  
		return tpl;
	}
	return {
		restrict: 'E',
		replace: true,
		scope: {
			nbId: '@',
			nbTheme: '@',
			nbName: '@'
		},
		template: getTemplate
	}
}