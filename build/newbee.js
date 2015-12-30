angular.module('newbee', [
  'newbee.words',
  'newbee.buttons',
  'newbee.loader',
  'newbee.toggle',
  'newbee.radio',
  'newbee.checkbox',
  'newbee.link',
  'newbee.select',
  'newbee.input',
  'newbee.progress'
]);

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
angular.module('newbee.loader', [])

.directive('nbLoader', NbLoaderDirective);

function NbLoaderDirective() {
	function getTemplate(iEle, iAttrs) {
		var tpls = {};
	  tpls.stroke = '<div class="nb-loader nb-loader-stroke" id="__id__"> \
      <svg class="circular"> \
        <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/> \
      </svg> \
    </div>';
	  tpls.fourdots = '<div class="nb-loader-fourdots"> \
	    <div class="nb-loader-dot nb-loader-red"></div> \
	    <div class="nb-loader-dot nb-loader-blue"></div> \
	    <div class="nb-loader-dot nb-loader-green"></div> \
	    <div class="nb-loader-dot nb-loader-yellow"></div> \
	  </div>';

	  tpls.bokeh = '<ul class="nb-loader nb-loader-bokeh"><li></li><li></li><li></li><li></li></ul>';

	  tpls.kiri = '<div class="nb-loader nb-loader-kiri"><span></span><span></span><span></span></div>';

	  tpls.sail = '<div class="nb-loader nb-loader-sail"><span></span><span></span><span></span><span></span></div>';
	  
	  tpls.breath = '<div class="nb-loader nb-loader-breath"><span></span><span></span></div>';

	  tpls.flipDot = '<div class="nb-loader nb-loader-flipdot"> \
	    <div class="semicircle upper-base"><div class="semicircle-inner"></div></div> \
	    <div class="semicircle upper-move"><div class="semicircle-inner"></div></div> \
	    <div class="semicircle lower-base"><div class="semicircle-inner"></div></div> \
	    <div class="semicircle lower-move"><div class="semicircle-inner"></div></div> \
	  </div>';
	  tpls.squarePuls = '<div class="nb-loader nb-loader-squarepuls"><span></span><span></span><span></span></div>';
	  tpls.wave = '<div class="nb-loader nb-loader-wave"><span></span><span></span><span></span><span></span><span></span><span></span></div>';
	  tpls.orbit = '<div class="nb-loader nb-loader-orbit"><div class="nb-loader-dot"></div><div class="nb-loader-dot"></div><div class="nb-loader-dot"></div><div class="nb-loader-dot"></div><div class="nb-loader-dot"></div></div>';

	  var type = iAttrs.type || 'stroke'; // default is stroke
	  return tpls[type];
	}
	return {
		restrict: 'E',
		replace: true,
		scope: {
			type: '@'
		},
		template: getTemplate
	}
}
angular.module('newbee.progress', [])

.directive('nbProgress', NbProgressDirective);

function NbProgressDirective() {
	function getTemplate(iEle, iAttrs) {
		var type = iAttrs.nbType || 'circle';
		var tpls = {
			circle: '<div class="nb-progress nb-progress-' + type + '">\
								<div class="progress"><div class="progress-fill" style="transform: rotate({{percent * 3.6}}deg)"></div></div>\
							  <div class="percents">\
							    <span>{{percent + "%"}}</span>\
							  </div>\
							</div>',
			linear: '<div class="nb-progress nb-progress-' + type + '"></div>'
		}
		return tpls[type];
	}
	function getLink(scope, iEle, iAttrs, ctrl) {
		var percent = scope.percent || 0;
		var type = iAttrs.nbType;
		scope.$watch('percent', function(newVal, oldVal, scope) {
			if (newVal > 50 && type == 'circle') {
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
angular.module('newbee.select', [])

.directive('nbSelect', NbSelectDirective);

function NbSelectDirective() {
	function getTemplate(iEle, iAttrs) {
		var defaultOption = iAttrs.nbDefaultOption || 'Please set default option';
		var theme = iAttrs.nbTheme || 'default';
		var tpl = '<div class="nb-select">\
						    <select>\
						    	<option value="0">' + defaultOption + '</option>\
						    	<option on-finish-render="ngRepeatFinished" ng-repeat="option in nbOptions" value="{{$index + 1}}">{{option.value}}</option>\
						    </select>\
						    <span class="desc">' + defaultOption + '</span><span class="pulldown"></span><div class="dropdown"></div>\
						  </div>';
		return tpl;
	}
	function getLink(scope, iEle, iAttrs, ctrl) {
		iEle.children('select').hide();
		scope.$on('ngRepeatFinished', function(e) {
			iEle.children('select').children('option').each(function(index, el) {
				if ($(this).attr('value') != '0') {
					var $drop = $(this).parent().siblings('.dropdown');
					var name = $(this).text();
					$drop.append('<span>'+name+'</span>');
				}
			});

			iEle.click(function(event) {
				if (iEle.hasClass('nb-select-active')) {
					// roll up roll up
					iEle.children('.dropdown').slideUp(200);
					iEle.removeClass('nb-select-active');
				} else {
					// if there are any other open dropdowns, close 'em
					$('.nb-select-active').each(function(){
						$(this).children('.dropdown').slideUp(200);
						// change span back to selected option text
						if($(this).children('select').val() != '0') {
							$(this).children('.desc').fadeOut(100, function(){
								$(this).text($(this).siblings("select").val());
								$(this).fadeIn(100);
							});
						}
						$(this).removeClass('nb-select-active');
					});			
					// roll down
					iEle.children('.dropdown').slideDown(200);
					iEle.addClass('nb-select-active');
				}
			});

			// select dropdown click action
			iEle.find('.dropdown span').click(function(event){
				$(this).siblings().removeClass('active');
				$(this).addClass('active');
				var value = $(this).text();
				$(this).parent().siblings('select').val(value);
				$(this).parent().siblings('.desc').text(value);
			});
		});
	}
	return {
		restrict: 'E',
		replace: true,
		scope: {
			nbDefaultOption: '@',
			nbTheme: '@',
			nbOptions: '=?'
		},
		template: getTemplate,
		link: getLink
	}
}
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
angular.module('newbee.words', [])

.directive('onFinishRender', function ($timeout) {
return {
    restrict: 'A',
    link: function (scope, element, attr) {
        if (scope.$last === true) {
            $timeout(function () {
                scope.$emit('ngRepeatFinished');
            });
        }
    }
}})

.directive('nbWord', NbWordDirective);

function NbWordDirective($interval) {

	var letterStyles = ['letter-rotateX', 'letter-rotateY', 'letter-scale', 'letter-input'];
	function getController(scope, ele, attrs) {
		console.log(scope.words);
	}
	function getTemplate($ele, $attrs) {
		var style = $attrs.nbStyle || 'rotate';	// default style is rotate
		var tpl = '<span class="nb-words">';
		if (letterStyles.indexOf(style) != -1) {
			tpl += '<b on-finish-render="ngRepeatFinished" ng-repeat="word in words" ng-class="{\'nb-visible\':activeIndex == $index, \'nb-hidden\':activeIndex - 1 == $index}"><i ng-repeat="letter in word2Letters(word) track by $index"><em>{{letter}}</em></i></b>';
		} else {
			tpl += '<b on-finish-render="ngRepeatFinished" ng-repeat="word in words" ng-class="{\'nb-visible\':activeIndex == $index, \'nb-hidden\':prevIndex == $index}">{{word}}</b>';
		}
		tpl += '</span>';
		return tpl;
	}
	function getLink($scope, $ele, $attrs, $ctrl) {
		var _duration = parseInt($attrs.nbDuration, 10) || 2500;
		var animationDuration = 1200;
		var letterAnimateDelay = 80;
		var _letterDuration = 800;

		var style = $attrs.nbStyle || 'rotate';
		$ele.addClass((letterStyles.indexOf(style) != -1 ? 'nb-' : 'nb-words-') + style);
		$scope.word2Letters = function (word) {
			return word.split('');
		}
		$scope.activeIndex = 0;
		$scope.prevIndex = $scope.words.length - 1;
		$scope.nextIndex = 1;
		var $animatorTimer = $interval(animator, _duration + animationDuration);

		function animator() {
			$scope.activeIndex++;
			$scope.prevIndex = $scope.activeIndex - 1;
			$scope.nextIndex = $scope.activeIndex + 1;
			if ($scope.prevIndex < 0) {
				$scope.prevIndex = $scope.words.length - 1;
			};
			if ($scope.activeIndex >= $scope.words.length) {
				$scope.activeIndex = 0;
			}
			if ($scope.nextIndex >= $scope.words.length) {
				$scope.nextIndex = 0;
			};
			lettersAnimation();
			fnStyle();
		}

		function fnStyle() {
			switch(style) {
				case 'loading':
					$ele.removeClass('nb-loading');
					setTimeout(function() {
						$ele.addClass('nb-loading');
					}, 200);
					break;
				case 'clip':
					cliping();
					break;
				default: '';
			}
		}

		function cliping() {
			var $next = $ele.find('b')[$scope.activeIndex];
			var width = $next.clientWidth;
			$ele.width(width + 10);
			setTimeout(function() {
				$ele.width(0);
			}, _duration + 100);
		}

		// when repeat render finished
		$scope.$on('ngRepeatFinished', function() {
			if (style == 'clip') cliping();
			if (letterStyles.indexOf(style) != -1) lettersAnimation();
		});

		function lettersAnimation() {
			if (letterStyles.indexOf(style) != -1) {
				var $words = $ele.find('b');
				if (style == 'letter-input') {
					$ele.removeClass('nb-waiting');
					setTimeout(function() {
						$ele.addClass('nb-selected');
					}, _duration + 100);
				}
				letterIn($words.eq($scope.activeIndex).find('i'));
				letterOut($words.eq($scope.prevIndex).find('i'));
			}
		}
		var inLetterIndex = 0, outLetterIndex = 0;
		function letterIn(letters) {
			if (style == 'letter-input') {
				$ele.removeClass('nb-selected');
			};

			if (letters[inLetterIndex]) {
				letters[inLetterIndex].classList.remove('nb-out');
				letters[inLetterIndex].classList.add('nb-in');
			}
			inLetterIndex++;
			if (inLetterIndex < letters.length) {
				setTimeout(function() {letterIn(letters)}, letterAnimateDelay);
			} else {
				inLetterIndex = 0;
				if (style == 'letter-input') {
					$ele.addClass('nb-waiting');
				};
			}
		}
		function letterOut(letters) {
			if (style == 'letter-input') {
				letters.removeClass('nb-in');
				return;
			}
			if (letters[outLetterIndex]) {
				letters[outLetterIndex].classList.remove('nb-in');
				letters[outLetterIndex].classList.add('nb-out');
			}
			outLetterIndex++;
			if (outLetterIndex < letters.length) {
				setTimeout(function() {letterOut(letters)}, letterAnimateDelay);
			} else {
				letters.removeClass('nb-in');
				outLetterIndex = 0;
			}
		}

		$scope.$on('$destroy', function() {
			$interval.cancel($animatorTimer);
		});
	}
	return {
		restrict: 'E',
		replace: true,
		scope: {
			words: '=',
			nbStyle: '@'
		},
		template: getTemplate,
		link: getLink,
		controller: function($scope) {
		
		}
	};
}

angular.module('newbee.link', [])

.directive('nbLink', NbLinkDirective);

function NbLinkDirective() {
	function getTemplate(iEle, iAttrs) {
		var text = iEle.html();
		var theme = iAttrs.nbTheme;
		var tpl = '';
		if (theme == 'square') {
			tpl += '<span class="nb-link-'+theme+'"><a class="nb-link" href="#">'+text+'</a>';
		} else {
			tpl += '<a href="#" class="nb-link nb-link-' + theme + '">'+text+'</a>';
		}
		return tpl;
	}
	return {
		restrict: 'E',
		replace: true,
		scope: {
			nbTheme: '@'
		},
		template: getTemplate
	}
}
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
				if (attr == 'ngClick') {
					tpl.setAttribute('ng-click', tAttrs[attr]);
				} else {
					tpl.setAttribute(attr, tAttrs[attr]);
				}
			}

			tEle[0].parentNode.insertBefore(tpl, tEle[0]);
			tEle[0].remove();
			return getLink;
		}	
	}
}

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