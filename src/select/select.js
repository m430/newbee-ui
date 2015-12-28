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