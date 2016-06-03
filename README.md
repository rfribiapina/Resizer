# Resizer
Plugin do jQuery que redimenciona elementos HTML

# Exemplo

$('.resizer').resizer(
		{
			resizeOrientation: 'all', // all | w | h
			aspectRatioLocked: false, // true | false
			callback: function(element,width,height){ }
		}
	);
