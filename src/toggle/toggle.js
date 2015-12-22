angular.module('newbee.toggle', [])

.directive('nbToggle', NbToggleDirective);

function NbToggleDirective() {
	function getTemplate(iEle, iAttrs) {
		var tpls = {};
		tpls.arrow = '<a href="" class="nb-toggle-arrow">Menu \
		  <span class="nb-toggle-arrow-bar"></span> \
		  <svg x="0px" y="0px" width="54px" height="54px" viewBox="0 0 54 54"> \
		  <circle fill="transparent" stroke="#66788f" stroke-width="1" cx="27" cy="27" r="25" stroke-dasharray="157 157" stroke-dashoffset="157"></circle> \
		</svg> \
		</a>';
		tpls.circle = '<div class="nb-toggle-circle"> \
		  <div class="nb-top"></div><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="64px" height="64px" viewBox="0 0 64 64" enable-background="new 0 0 64 64" xml:space="preserve"> \
		    <path class="nb-circle" fill="none" stroke-width="4" stroke-miterlimit="10" d="M16,32h32c0,0,11.723-0.306,10.75-11c-0.25-2.75-1.644-4.971-2.869-7.151C50.728,7.08,42.767,2.569,33.733,2.054C33.159,2.033,32.599,2,32,2C15.432,2,2,15.432,2,32c0,16.566,13.432,30,30,30c16.566,0,30-13.434,30-30C62,15.5,48.5,2,32,2S1.875,15.5,1.875,32"></path> \
		    </svg> \
		  <div class="nb-bottom"></div> \
		</div>';
		var id = Math.floor(1 + Math.random() * 1000);
		tpls.switch = '<div class="nb-toggle-switch-wraper"> \
      <input class="nb-toggle-switch" id="'+id+'" type="checkbox">\
      <label class="nb-toggle-switch-btn" for="'+id+'" data-tg-off="OFF" data-tg-on="ON"></label> \
    </div>';
    var type = iAttrs.nbType || 'arrow';
    return tpls[type];
	}
	function getLink(scope, iEle, iAttrs, ctrl) {
		var type = iAttrs.nbType || 'arrow';
		switch(type) {
			case 'arrow':
				FnArrow();
				break;
			case 'circle':
				FnCircle();
				break;
			case 'switch':
				FnSwitch();
				break;
			default: '';
		}
		function FnArrow() {
			var directionCls = (iAttrs.nbDirection && iAttrs.nbDirection == 'right') ? 'nb-right' : 'nb-left';
			iEle.addClass(directionCls);
			iEle.on('click', function() {
				iEle.toggleClass('open');
			});
		}
		function FnCircle() {
			var theme = (iAttrs.nbTheme && iAttrs.nbTheme == 'dark') ? 'nb-dark' : 'nb-light';
			iEle.addClass(theme);
			iEle.on('click', function() {
				iEle.toggleClass('nb-close');
			})
		}
		function FnSwitch() {
			var theme = iAttrs.nbTheme || 'ios';
			iEle.find('input').addClass('nb-toggle-switch-' + theme);
		}
	}
	return {
		restrict: 'E',
		replace: true,
		scope: {
			nbType: '@',
			nbDirection: '@'
		},
		template: getTemplate,
		link: getLink
	}
}