angular.module('newbee.radio', [])

.directive('nbRadio', NbRadioDirective);

function NbRadioDirective() {
	function getTemplate(iEle, iAttrs) {
		var id = iAttrs.nbId;
		var name = iAttrs.nbName;
		var theme = iAttrs.nbTheme || 'default';
		var tpl = '<label class="nb-radio" for="' + id + '"><input class="nb-radio-'+theme+'" id="' + id + '" type="radio" name="'+name+'"></input><ng-transclude></ng-transclude></label>';  
		return tpl;
	}
	return {
		restrict: 'E',
		replace: true,
		transclude: true,
		scope: {
			nbTheme: '@',
			nbId: '@',
			nbName: '@'
		},
		template: getTemplate
	}
}