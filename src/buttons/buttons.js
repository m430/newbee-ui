angular.module('newbee.buttons', [])

.directive('nbButton', NbButtonDirective);

function NbButtonDirective() {
	return {
		restrict: 'E',
		replace: true,
		template: getTemplate,
		link: getLink
	}

	function getTemplate() {

	}
	function getLink() {
		
	}
}
