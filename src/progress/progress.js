angular.module('newbee.progress', [])

.directive('nbProgress', NbProgressDirective);

function NbProgressDirective() {
	function getTemplate(iEle, iAttrs) {
		var tpl = '<div class="nb-progress">\
								<div class="progress"></div>\
							  <div class="percents">\
							    <span>45%</span>\
							  </div>\
							</div>';  
		return tpl;
	}
	function getLink(scope, iEle, iAttrs, ctrl) {

	}
	return {
		restrict: 'E',
		replace: true,
		scope: {
			nbTheme: '@',
			nbId: '@',
			nbName: '@'
		},
		template: getTemplate,
		link: getLink
	}
}