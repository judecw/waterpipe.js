/*----------------------------------------

Example generator

------------------------------------------*/

//Form serialization
$.fn.serializeObject = function()
{
    var o = {};
    var a = this.serializeArray();
    $.each(a, function() {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
};

$( document ).ready(function() {

	$(window).resize(function() {
		if ($('.sidebar-wrapper').height() > $(window).height()){
			var formHeight = $(window).height()-$('.sidebar-wrapper .intro').outerHeight()-$('.sidebar-wrapper .buttons-wrap').outerHeight()-30;
			$('.generator-form-wrap').css('height', formHeight+'px');
		}
	});

	$(window).resize();

	//Init waterpipe
	var smokyBG = $('#wavybg-wrapper').waterpipe();

	// Make sidebar draggable via header handle (vanilla)
	(function(){
		var $panel = $('.sidebar-wrapper');
		var $handle = $('.sidebar-wrapper .drag-handle');
		var isDragging = false;
		var startMouseX = 0, startMouseY = 0;
		var startLeft = 0, startTop = 0;
		// ensure positioned element for dragging
		$panel.css('position', 'fixed');
		$handle.on('mousedown', function(e){
			isDragging = true;
			startMouseX = e.clientX;
			startMouseY = e.clientY;
			startLeft = parseInt($panel.css('left'), 10) || 0;
			startTop = parseInt($panel.css('top'), 10) || 0;
			e.preventDefault();
		});
		$(document).on('mousemove', function(e){
			if(!isDragging) return;
			var dx = e.clientX - startMouseX;
			var dy = e.clientY - startMouseY;
			var newLeft = startLeft + dx;
			var newTop = startTop + dy;
			var maxLeft = $(window).width() - $panel.outerWidth();
			var maxTop = $(window).height() - $panel.outerHeight();
			if (newLeft < 0) newLeft = 0; if (newTop < 0) newTop = 0;
			if (newLeft > maxLeft) newLeft = maxLeft; if (newTop > maxTop) newTop = maxTop;
			$panel.css({ left: newLeft + 'px', top: newTop + 'px' });
		});
		$(document).on('mouseup', function(){ isDragging = false; });
	})();

	//Init nicescroll
	var niceScroll = $('.generator-form-wrap').niceScroll();

	//Params for samples
	var sampleParams = [
		{
			bgColorInner: "#2b2b2b",
			bgColorOuter: "#000000",
			gradientEnd: "#f5883b",
			gradientStart: "#ff5500",
			lineWidth: 1,
			numCircles: 1,
			radiusSize: 100,
			smokeOpacity: 5
		},
		{
			bgColorInner: "#ffffff",
			bgColorOuter: "#cccccc",
			gradientEnd: "#7a7a7a",
			gradientStart: "#000000",
			lineWidth: 2,
			numCircles: 1,
			radiusSize: 100,
			smokeOpacity: 10
		},
		{
			bgColorInner: "#2b2b2b",
			bgColorOuter: "#000000",
			gradientEnd: "#6b71e3",
			gradientStart: "#fa05fa",
			lineWidth: 1.5,
			numCircles: 1,
			radiusSize: 100,
			smokeOpacity: 5
		},
		{
			bgColorInner: "#2b2b2b",
			bgColorOuter: "#000000",
			gradientEnd: "#7d7d7d",
			gradientStart: "#e0e0e0",
			lineWidth: 1.2,
			numCircles: 1,
			radiusSize: 100,
			smokeOpacity: 5
		},
		{
			bgColorInner: "#ffffff",
			bgColorOuter: "#ffffff",
			gradientEnd: "#404040",
			gradientStart: "#000000",
			lineWidth: 3,
			numCircles: 1,
			radiusSize: 100,
			smokeOpacity: 5
		},
		{
			bgColorInner: "#292929",
			bgColorOuter: "#000000",
			gradientEnd: "#001eff",
			gradientStart: "#51ff00",
			lineWidth: 1.5,
			numCircles: 1,
			radiusSize: 100,
			smokeOpacity: 5
		},
		{
			bgColorInner: "#400000",
			bgColorOuter: "#000000",
			gradientEnd: "#400000",
			gradientStart: "#ff0000",
			lineWidth: 1.5,
			numCircles: 1,
			radiusSize: 100,
			smokeOpacity: 10
		},
		{
			bgColorInner: "#ffffff",
			bgColorOuter: "#000000",
			gradientEnd: "#000000",
			gradientStart: "#000000",
			lineWidth: 2.2,
			numCircles: 1,
			radiusSize: 100,
			smokeOpacity: 10
		},
		{
			bgColorInner: "#ffffff",
			bgColorOuter: "#ffffff",
			gradientEnd: "#696969",
			gradientStart: "#636363",
			lineWidth: 1,
			numCircles: 1,
			radiusSize: 100,
			smokeOpacity: 5
		},
		{
			bgColorInner: "#3b003b",
			bgColorOuter: "#630063",
			gradientEnd: "#cccc00",
			gradientStart: "#ffff00",
			lineWidth: 1,
			numCircles: 1,
			radiusSize: 100,
			smokeOpacity: 5
		},
		{
			bgColorInner: "#ffffff",
			bgColorOuter: "#ebebeb",
			gradientEnd: "#012e82",
			gradientStart: "#2600ff",
			lineWidth: 1.5,
			numCircles: 1,
			radiusSize: 100,
			smokeOpacity: 10
		},
		{
			bgColorInner: "#4d4d4d",
			bgColorOuter: "#000000",
			gradientEnd: "#00c48d",
			gradientStart: "#03ffea",
			lineWidth: 1,
			numCircles: 1,
			radiusSize: 100,
			smokeOpacity: 5
		}
	];

	//Set download size
	$('#downloadWidth').val($(window).width());
	$('#downloadHeight').val($(window).height());

	//Go to samples
    $('.sidebar-wrapper').on('click', '.btn-samples', function(){
    	niceScroll.doScrollTop($('.generator-form-wrap').scrollTop() + $('#samples-section').position().top - 89);
    	console.log($('.generator-form-wrap').scrollTop);
    	return false;
	});

	//Generate
    $('.sidebar-wrapper').on('click', '.btn-generate', function(){
    	setNewParams();
    	smokyBG.data('waterpipe').generate();
    	return false;
	});

	//Resize Canvas (no draw)
	$('.sidebar-wrapper').on('click', '.btn-resize-canvas', function(){
		var width = $('#downloadWidth').val(),
			height = $('#downloadHeight').val();
		smokyBG.data('waterpipe').resize(width, height);
		return false;
	});

    //Download
    $('.sidebar-wrapper').on('click', '.btn-download', function(){
    	// Download button removed in simplified UI; no action.
    	return false;
    });

	//Generate sample
    $('.sidebar-wrapper').on('click', '.sample-smoke', function(){
    	var sampleID = $(this).attr('data-id');
    	loadParams(sampleParams[sampleID]);
    	$('.btn-generate').click();
    	return false;
	});

    //Init color pickers
	var gradientStartObj = $('#gradientStart').colpick({
		layout:'hex',
		submit:0,
		colorScheme:'dark',
		onChange:function(hsb,hex,rgb,el,bySetColor) {
			$(el).css('border-color','#'+hex);
			$(el).val('#'+hex);
		}
	}).keyup(function(){
		$(this).colpickSetColor(this.value);
	});

	var gradientEndObj = $('#gradientEnd').colpick({
		layout:'hex',
		submit:0,
		colorScheme:'dark',
		onChange:function(hsb,hex,rgb,el,bySetColor) {
			$(el).css('border-color','#'+hex);
			$(el).val('#'+hex);
		}
	}).keyup(function(){
		$(this).colpickSetColor(this.value);
	});

	var bgColorOuterObj = $('#bgColorOuter').colpick({
		layout:'hex',
		submit:0,
		colorScheme:'dark',
		onChange:function(hsb,hex,rgb,el,bySetColor) {
			$(el).css('border-color','#'+hex);
			$(el).val('#'+hex);
		}
	}).keyup(function(){
		$(this).colpickSetColor(this.value);
	});

	var bgColorInnerObj = $('#bgColorInner').colpick({
		layout:'hex',
		submit:0,
		colorScheme:'dark',
		onChange:function(hsb,hex,rgb,el,bySetColor) {
			$(el).css('border-color','#'+hex);
			$(el).val('#'+hex);
		}
	}).keyup(function(){
		$(this).colpickSetColor(this.value);
	});

	//Smoke Opacity slider
	var smokeOpacitySlider = $('.smokeOpacity-slider').noUiSlider({
		start: [ 10 ],
		range: {
			'min': [ 0 ],
			'max': [ 100 ]
		},
		step: 5,
		serialization: {
			lower: [
			  $.Link({
				target: $('#smokeOpacity')
			  })
			],
			format: {
				decimals: 0,
				mark: '.'
			}
		}
	});
	smokeOpacitySlider.on({
		slide: function(){
			var sliderValue = $(this).val();
			$(this).parents('.input-group').find('.value').html(sliderValue+'%');
		},
		change: function(){
			var sliderValue = $(this).val();
			$(this).parents('.input-group').find('.value').html(sliderValue+'%');
		}
	});

	//Number of Smokes slider
	var numCirclesSlider = $('.numCircles-slider').noUiSlider({
		start: [ 1 ],
		range: {
			'min': [ 1 ],
			'max': [ 5 ]
		},
		step: 1,
		serialization: {
			lower: [
			  $.Link({
				target: $('#numCircles')
			  })
			],
			format: {
				decimals: 0,
				mark: '.'
			}
		}
	});
	numCirclesSlider.on({
		slide: function(){
			var sliderValue = $(this).val();
			$(this).parents('.input-group').find('.value').html(sliderValue);
		},
		change: function(){
			var sliderValue = $(this).val();
			$(this).parents('.input-group').find('.value').html(sliderValue);
		}
	});

	//Smoke Size slider
	var radiusSizeSlider = $('.radiusSize-slider').noUiSlider({
		start: [ 100 ],
		range: {
			'min': [ 10 ],
			'max': [ 300 ]
		},
		step: 1,
		serialization: {
			lower: [
			  $.Link({
				target: $('#radiusSize')
			  })
			],
			format: {
				decimals: 0,
				mark: '.'
			}
		}
	});
	radiusSizeSlider.on({
		slide: function(){
			var sliderValue = $(this).val();
			$(this).parents('.input-group').find('.value').html(sliderValue+'%');
		},
		change: function(){
			var sliderValue = $(this).val();
			$(this).parents('.input-group').find('.value').html(sliderValue+'%');
		}
	});

	//Smoke Size slider
	var lineWidthSlider = $('.lineWidth-slider').noUiSlider({
		start: [ 2 ],
		range: {
			'min': [ 0.1 ],
			'max': [ 10 ]
		},
		step: 0.1,
		serialization: {
			lower: [
			  $.Link({
				target: $('#lineWidth')
			  })
			],
			format: {
				decimals: 1,
				mark: '.'
			}
		}
	});
	lineWidthSlider.on({
		slide: function(){
			var sliderValue = $(this).val();
			$(this).parents('.input-group').find('.value').html(sliderValue+'px');
		},
		change: function(){
			var sliderValue = $(this).val();
			$(this).parents('.input-group').find('.value').html(sliderValue+'px');
		}
	});


	//Set new params
	function setNewParams(){
		var params = $('.generator-params').serializeObject();
    	console.log(params);

		//Set new values
    	smokyBG.data('waterpipe').setOption('gradientStart', params.gradientStart);
    	smokyBG.data('waterpipe').setOption('gradientEnd', params.gradientEnd);
    	smokyBG.data('waterpipe').setOption('smokeOpacity', params.smokeOpacity/100);
    	smokyBG.data('waterpipe').setOption('numCircles', params.numCircles);

		// Base radius on canvas height instead of window height for predictable scaling
		var canvasHeight = smokyBG.data('waterpipe').displayHeight;
		var radius = canvasHeight*0.8/2*(params.radiusSize/100);
        smokyBG.data('waterpipe').setOption('maxMaxRad', radius);
        smokyBG.data('waterpipe').setOption('minMaxRad', radius);

    	smokyBG.data('waterpipe').setOption('lineWidth', params.lineWidth);

    	smokyBG.data('waterpipe').setOption('bgColorOuter', params.bgColorOuter);
    	smokyBG.data('waterpipe').setOption('bgColorInner', params.bgColorInner);
	}

	// Canvas zoom: ctrl+wheel to zoom, double-click to reset
	(function(){
		var $wrap = $('#wavybg-wrapper');
		var $canvas = $wrap.find('canvas');
		var zoom = 1;
		function applyZoom(){
			$canvas.css({
				'transform-origin': '0 0',
				'transform': 'scale(' + zoom + ')'
			});
		}
		$wrap.on('wheel', function(e){
			if (!e.ctrlKey) return; // allow normal scroll
			e.preventDefault();
			var deltaY = e.originalEvent.deltaY;
			var factor = Math.pow(1.0015, -deltaY);
			zoom *= factor;
			if (zoom < 0.1) zoom = 0.1; if (zoom > 4) zoom = 4;
			applyZoom();
		});
		$wrap.on('dblclick', function(){
			zoom = 1;
			applyZoom();
		});
	})();

	//Load params (samples)
	function loadParams(params){
		gradientStartObj.colpickSetColor(params.gradientStart.replace('#', ''));
		gradientEndObj.colpickSetColor(params.gradientEnd.replace('#', ''));
		smokeOpacitySlider.val(params.smokeOpacity).change();
		numCirclesSlider.val(params.numCircles).change();
		radiusSizeSlider.val(params.radiusSize).change();
		lineWidthSlider.val(params.lineWidth).change();
		bgColorOuterObj.colpickSetColor(params.bgColorOuter.replace('#', ''));
		bgColorInnerObj.colpickSetColor(params.bgColorInner.replace('#', ''));
	}

});










