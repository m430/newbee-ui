angular.module('newbee.select', [])

.directive('nbSelect', NbSelectDirective);

function NbSelectDirective() {
	function getTemplate(iEle, iAttrs) {
		var defaultOption = iAttrs.nbDefaultOption || 'Please set default option';
		var theme = iAttrs.nbTheme || 'default';
		var tpl = '<div class="selectholder">\
						    <label>'+defaultOption+'</label>\
						    <select name="projectstart" id="projectstart">\
						    	<option on-finish-render="ngRepeatFinished" ng-repeat="option in nbOptions" value="{{$index}}">{{option.value}}</option>\
						    </select>\
						  </div>';
		return tpl;
	}
	function getLink(scope, iEle, iAttrs, ctrl) {
		iEle.children().hide();
		var desc = iEle.children('label').text();
		iEle.append('<span class="desc">' + desc + '</span><span class="pulldown"></span><div class="selectdropdown"></div>');
		scope.$on('ngRepeatFinished', function(e) {
			iEle.children('select').children('option').each(function(index, el) {
				if ($(this).attr('value') != '0') {
					var $drop = $(this).parent().siblings('.selectdropdown');
					var name = $(this).text();
					$drop.append('<span>'+name+'</span>');
				}
			});

			iEle.click(function(event) {
				if (iEle.hasClass('activeselectholder')) {
					// roll up roll up
					iEle.children('.selectdropdown').slideUp(200);
					iEle.removeClass('activeselectholder');
					// change span back to selected option text
					if(iEle.children('select').val() != '0') {
						iEle.children('.desc').fadeOut(100, function(){
							iEle.text(iEle.siblings("select").val());
							iEle.fadeIn(100);
						});
					}
				} else {
					// if there are any other open dropdowns, close 'em
					$('.activeselectholder').each(function(){
						$(this).children('.selectdropdown').slideUp(200);
						// change span back to selected option text
						if($(this).children('select').val() != '0') {
							$(this).children('.desc').fadeOut(100, function(){
								$(this).text($(this).siblings("select").val());
								$(this).fadeIn(100);
							});
						}
						$(this).removeClass('activeselectholder');
					});			
					// roll down
					iEle.children('.selectdropdown').slideDown(200);
					iEle.addClass('activeselectholder');
					// change span to show select box title while open
					if(iEle.children('select').val() != '0') {
						iEle.children('.desc').fadeOut(100, function(){
							iEle.text(iEle.siblings("select").children("option[value=0]").text());
							iEle.fadeIn(100);
						});
					}
				}
			});

			// select dropdown click action
			$('.selectholder .selectdropdown span').click(function(){
				$(this).siblings().removeClass('active');
				$(this).addClass('active');
				var value = $(this).text();
				$(this).parent().siblings('select').val(value);
				$(this).parent().siblings('.desc').fadeOut(100, function(){
					$(this).text(value);
					$(this).fadeIn(100);
				});
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