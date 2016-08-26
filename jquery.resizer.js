(function($) {
    $.fn.resizer = function(args) {
        return this.each(function(){
			var $elm = $(this),
				_options = {},
				_default = {
					resizeOrientation: 'all',
					aspectRatioLocked: true,
					callback: function(){}
				},
				resizeT = function(elm, top){
					var nt = Math.abs(__top + top);
						nh = Math.abs(__height - top);
					elm.css({ height: nh, top: nt });
				},
				resizeR = function(elm, left){
					var nw = elm.width() + ( left - elm.width());
					elm.css({ width: nw });
				},
				resizeB = function(elm, top){
					var nh = elm.height() + ( top - elm.height());
					elm.css({ height: nh });
				},
				resizeL = function(elm, left){
					var nl = Math.abs(__left + left);
						nw = Math.abs(__width - left);
					elm.css({ width: nw, left: nl });
				},
				__width = $elm.width(),
				__height = $elm.width(),
				__left = $elm[0].offsetLeft,
				__top = $elm[0].offsetTop;
				
			_options = $.extend(true, {}, _default, args);
			
			$elm.append('<span class="rszT" disabled="true"></span><span class="rszR" disabled="true"></span><span class="rszB" disabled="true"></span><span class="rszL" disabled="true"></span>');
			
			var roArr = _options.resizeOrientation.split(',');			
			for(var k in roArr)
			{	
				switch(roArr[k]){
					case 't': $elm.children('.rszT').removeAttr('disabled'); break;
					case 'r': $elm.children('.rszR').removeAttr('disabled'); break;
					case 'b': $elm.children('.rszB').removeAttr('disabled'); break;
					case 'l': $elm.children('.rszL').removeAttr('disabled'); break;
					case 'all': $elm.children('.rszT, .rszR, .rszB, .rszL').removeAttr('disabled'); break;
				}
			}
			$elm.draggable({ cursor: "move", cancel: ".rszT, .rszR, .rszB, .rszL" });	
					
			$elm.children('.rszT').not("[disabled=true]").draggable({ 
				axis: "y",
				start: function(e,ui){ 
					Functions.dndStartFunction(ui);
					__height = $elm.height();
					__top = $elm[0].offsetTop;
				},
				drag: function(e,ui){
					Functions.dndDragFunction(ui);
					resizeT($elm, ui.position.top);
					if( _options.aspectRatioLocked )
						resizeR($elm, ui.position.top);
					ui.position.top = 0;
					$elm.children('.rszL').attr('style','');
				},
				stop: function(e,ui){				
					$elm.children('.rszT').attr('style','');
					if( typeof(_options.callback) == 'function' ){
						_options.callback($elm,$elm.width(),$elm.height(),$elm[0].offsetTop,$elm[0].offsetLeft);
					}
				}
			});	
			$elm.children('.rszR').not("[disabled=true]").draggable({ 
				axis: "x",
				start: function(e,ui){ Functions.dndStartFunction(ui); },
				drag: function(e,ui){
					Functions.dndDragFunction(ui);
					resizeR($elm, ui.position.left);
					if( _options.aspectRatioLocked )
						resizeB($elm, ui.position.left);
				},
				stop: function(e,ui){			
					$elm.children('.rszR').attr('style','');		
					if( typeof(_options.callback) == 'function' ){
						_options.callback($elm,$elm.width(),$elm.height(),$elm[0].offsetTop,$elm[0].offsetLeft);
					}
				}
			});		
			$elm.children('.rszB').not("[disabled=true]").draggable({ 
				axis: "y",
				start: function(e,ui){ Functions.dndStartFunction(ui); },
				drag: function(e,ui){
					Functions.dndDragFunction(ui);
					resizeB($elm, ui.position.top);
					if( _options.aspectRatioLocked )
						resizeR($elm, ui.position.top);
				},
				stop: function(e,ui){		
					$elm.children('.rszB').attr('style','');			
					if( typeof(_options.callback) == 'function' ){
						_options.callback($elm,$elm.width(),$elm.height(),$elm[0].offsetTop,$elm[0].offsetLeft);
					}
				}
			});	
			$elm.children('.rszL').not("[disabled=true]").draggable({ 
				axis: "x",
				start: function(e,ui){ 
					Functions.dndStartFunction(ui);
					__width = $elm.width();
					__left = $elm[0].offsetLeft;
				},
				drag: function(e,ui){
					Functions.dndDragFunction(ui);
					resizeL($elm, ui.position.left);
					if( _options.aspectRatioLocked )
						resizeB($elm, ui.position.left);
					ui.position.left = 0;
					$elm.children('.rszL').attr('style','');
				},
				stop: function(e,ui){	
					$elm.children('.rszL').attr('style','');
					if( typeof(_options.callback) == 'function' ){
						_options.callback($elm,$elm.width(),$elm.height(),$elm[0].offsetTop,$elm[0].offsetLeft);
					}
				}
			});	
			
        });
    }
})(jQuery);