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