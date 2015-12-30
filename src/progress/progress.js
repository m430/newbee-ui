angular.module('newbee.progress', [])

.directive('nbProgress', NbProgressDirective);

function NbProgressDirective() {
	function getTemplate(iEle, iAttrs) {
		var tpl = '<div class="nb-progress">\
								<div class="progress"><div class="progress-fill" style="transform: rotate({{percent * 3.6}}deg)"></div></div>\
							  <div class="percents">\
							    <span>{{percent + "%"}}</span>\
							  </div>\
							</div>';  
		return tpl;
	}
	function getLink(scope, iEle, iAttrs, ctrl) {
		var percent = scope.percent || 0;
		scope.$watch('percent', function(newVal, oldVal, scope) {
			if (newVal > 50) {
				iEle.addClass('gt-50');
			} else {
				iEle.removeClass('gt-50');
			}
		})
	}
	return {
		restrict: 'E',
		replace: true,
		scope: {
			percent: '=?'
		},
		template: getTemplate,
		link: getLink
	}
}