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
				resizeW = function(elm, left){
					var nw = elm.width() + ( left - elm.width() + 5);
					elm.css({ width: nw });
				},
				resizeH = function(elm, top){
					var nh = elm.height() + ( top - elm.height() + 5);
					elm.css({ height: nh });
				};
			_options = $.extend(true, {}, _default, args);
			
			switch(_options.resizeOrientation){
				case 'w': $elm.append('<span class="rszW"></span>'); break;
				case 'h': $elm.append('<span class="rszH"></span>'); break;
				case 'all': $elm.append('<span class="rszW"></span><span class="rszH"></span>'); break;
			}
			$elm.draggable({ cursor: "move", cancel: ".rszW, .rszH" });	
				
			$elm.children('.rszW').draggable({ 
				axis: "x",
				drag: function(e,ui){
					resizeW($elm, ui.position.left);
					if( _options.aspectRatioLocked )
						resizeH($elm, ui.position.left);
				},
				stop: function(e,ui){					
					if( typeof(_options.callback) == 'function' ){
						_options.callback($elm,$elm.width(),$elm.height());
					}
				}
			});		
			$elm.children('.rszH').draggable({ 
				axis: "y",
				drag: function(e,ui){
					resizeH($elm, ui.position.top);
					if( _options.aspectRatioLocked )
						resizeW($elm, ui.position.top);
				},
				stop: function(e,ui){					
					if( typeof(_options.callback) == 'function' ){
						_options.callback($elm,$elm.width(),$elm.height());
					}
				}
			});	
        });
    }
})(jQuery);