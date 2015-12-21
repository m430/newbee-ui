angular.module('newbee.buttons', [])

.directive('nbButton', NbButtonDirective);

function NbButtonDirective() {
	
	function getLink($scoe,elm,attr){
		var rippleElm = document.createElement('span');
		rippleElm.className = 'nb-button-ripple';

		var rect = elm[0].getBoundingClientRect();

		rippleElm.style.height = rippleElm.style.width = Math.max(rect.width, rect.height) + 'px';
		
		elm[0].appendChild(rippleElm);

		function clickHandel(e){
			rippleElm.classList.remove('nb-animate');
			rect = elm[0].getBoundingClientRect();
			var top = e.clientY - rect.top - rippleElm.offsetHeight / 2;
			var left = e.clientX - rect.left - rippleElm.offsetWidth / 2;

			rippleElm.style.top = top + 'px';
			rippleElm.style.left = left +'px';

			rippleElm.classList.add('nb-animate');
		}

		elm.on('click',clickHandel);
	}
	return {
		restrict: 'E',
		replace: true,
		compile: function(tEle, tAttrs) {
			var inner = tEle[0].innerHTML;
			var tpl = document.createElement('button');
			tpl.className = 'nb-button';
			tpl.innerHTML = inner;
		
			for (var attr in tAttrs) {
				if (!tAttrs.hasOwnProperty(attr) || ['$attr', '$$element'].indexOf(attr) >= 0) {
					continue;
				}
				tpl.setAttribute(attr, tAttrs[attr]);
			}
			
			tEle[0].parentNode.insertBefore(tpl, tEle[0]);
			tEle[0].remove();
			return getLink;
		}	
	}
}
