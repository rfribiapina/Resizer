# Resizer
Plugin do jQuery que redimenciona elementos HTML

# Como usar

###CSS
```css
.resizer{ width:100px; height:100px;}
```    
###Javascript
```javascript
$('.resizer').resizer(
		{
			resizeOrientation: 'all', // all | t | b | r | l
			aspectRatioLocked: false, // true | false
			callback: function(element,width,height,top,left){
				//console.log(element,width,height,top,left)
			},
			dragCallback: function(event,ui){
				//console.log(event,ui)
			}
		}
);
```    
###HTML
```html
<head>
	<script src="js/jquery.min.js"></script>	
	<script src="js/jquery.ui.min.js"></script>
	<script src="js/jquery.ui.touch_punch.js"></script>
	<script src="jquery.resizer.js"></script>
	<link rel="stylesheet" href="jquery.resizer.css" />
</head>
<body>
<div class='resizer'></div>
</body>
```    
