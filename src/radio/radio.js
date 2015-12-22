angular.module('newbee.radio', [])

.directive('nbRadio', NbRadioDirective);

function NbRadioDirective() {
	function getTemplate(iEle, iAttrs) {
		var text = iEle.html();
		var id = iAttrs.nbId;
		var name = iAttrs.nbName;
		var theme = iAttrs.nbTheme || 'default';
		var tpl = '<label class="nb-radio" for="' + id + '"><input class="nb-radio-'+theme+'" id="' + id + '" type="radio" name="'+name+'"></input>' + text + '</label>';  
		return tpl;
	}
	return {
		restrict: 'E',
		replace: true,
		scope: {
			nbTheme: '@',
			nbId: '@',
			nbName: '@'
		},
		template: getTemplate
	}
}