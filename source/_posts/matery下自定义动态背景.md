---
title: matery下自定义动态背景⭐⭐⭐
categories:
  - 学习
  - hexo
tags:
  - 学习心得
  - hexo
img: >-
  https://fastly.jsdelivr.net/gh/GAATTC0/MyPicGoOSS@main/img/Snipaste_2020-12-03_22-26-45.jpg
abbrlink: e95bf6a
date: 2020-12-03 20:33:53
---

# matery下自定义动态背景

## 第一版(不建议，cpu占用太高)

> ref：https://www.jq22.com/jquery-info22256

### 1.添加css样式

```dir
hexo\themes\hexo-theme-matery-master\source\css\matery.css
```

修改：

```css
body {
	background: radial-gradient(200% 100% at bottom center, #f7f7b6, #e96f92, #75517d, #1b2947);
	background: radial-gradient(220% 105% at top center, #1b2947 10%, #75517d 40%, #e96f92 65%, #f7f7b6);
    background-color: #eaeaea;
	background-attachment: fixed;
    margin: 0;
    color: #34495e;
    overflow-x: hidden;
    overflow-y: auto;
	cursor: url(../medias/Arrow.cur),auto
}
```

添加：

```css
@keyframes rotate {
  0% {
    transform: perspective(400px) rotateZ(20deg) rotateX(-40deg) rotateY(0);
  }
  100% {
    transform: perspective(400px) rotateZ(20deg) rotateX(-40deg) rotateY(-360deg);
  }
}
.stars {
  transform: perspective(500px);
  transform-style: preserve-3d;
  position: absolute;
  bottom: 0;
  perspective-origin: 50% 100%;
  left: 50%;
  animation: rotate 90s infinite linear;
}

.star {
  width: 4px;
  height: 4px;
  background: #F7F7B6;
  position: absolute;
  top: 0;
  left: 0;
  transform-origin: 0 0 -300px;
  transform: translate3d(0, 0, -300px);
  backface-visibility: hidden;
}
.table{
	width: 400px;
	height: 350px;
	margin: 80px auto;
}
.table form{
	width: 100%;
}
.table .name{
	width: 280px;
	margin: 20px auto 30px auto;
	display: block;
	height: 30px;
	border-radius: 20px;
	border: none;
	background: rgba(0,0,0,0.2);
	text-indent: 0.5em;
}
.table .btn{
	width: 100px;
	height: 30px;
	background: rgba(0,0,0,0.1);
	border-radius: 8px;
	border: none;
	color: white;
	margin: 0 auto;
	display: block;
}
```

### 2.添加js

```dir
hexo\themes\hexo-theme-matery-master\layout\layout.ejs
```

在\<body\>标签中添加以下代码：

```html
<div class="stars"></div>
	<script>
	$(document).ready(function(){var stars=800;var $stars=$(".stars");var r=800;for(var i=0;i<stars;i++){var $star=$("<div/>").addClass("star");$stars.append($star)}$(".star").each(function(){var cur=$(this);var s=0.2+(Math.random()*1);var curR=r+(Math.random()*300);cur.css({transformOrigin:"0 0 "+curR+"px",transform:" translate3d(0,0,-"+curR+"px) rotateY("+(Math.random()*360)+"deg) rotateX("+(Math.random()*-50)+"deg) scale("+s+","+s+")"})})});
	</script>
```

![](https://fastly.jsdelivr.net/gh/GAATTC0/MyPicGoOSS@main/img/image-20201203204217012.png)

### 3.效果(假装星星在动...)

![](https://fastly.jsdelivr.net/gh/GAATTC0/MyPicGoOSS@main/img/Snipaste_2020-12-03_20-45-25.jpg)

### 4.问题

有点吃cpu，一打开就30%多占用，以后再换一换。

## 第二版(目前在用)

> ref：https://www.jq22.com/jquery-info22305

### 1.添加css样式

```dir
hexo\themes\hexo-theme-matery-master\source\css\matery.css
```

```css
/*动态背景*/
#bg {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: -1;
}
#bg canvas {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
}
```

### 2.添加js

```dir
hexo\themes\hexo-theme-matery-master\layout\layout.ejs
```

在\<body\>标签中添加以下代码：

```html
<!--动态背景-->
<div id="bg"><canvas></canvas><canvas></canvas><canvas></canvas></div>
<script src="/js/canva_moving_effect.js"></script>
```

 <img src="https://fastly.jsdelivr.net/gh/GAATTC0/MyPicGoOSS@main/img/image-20201203223146002.png" style="zoom: 67%;" />

### 3.单独引入js文件，因为太多了放body里不好看

```dir
hexo\themes\hexo-theme-matery-master\source\js
```

在这个目录新建一个文件`canva_moving_effect.js`，添加以下代码:

```javascript
(function($){
	var canvas = $('#bg').children('canvas'),
		background = canvas[0],
		foreground1 = canvas[1],
		foreground2 = canvas[2],
		config = {
			circle: {
				amount: 18,
				layer: 3,
				color: [157, 97, 207],
				alpha: 0.3
			},
			line: {
				amount: 12,
				layer: 3,
				color: [255, 255, 255],
				alpha: 0.3
			},
			speed: 0.5,
			angle: 20
		};

	if (background.getContext){
		var bctx = background.getContext('2d'),
			fctx1 = foreground1.getContext('2d'),
			fctx2 = foreground2.getContext('2d'),
			M = window.Math, // Cached Math
			degree = config.angle/360*M.PI*2,
			circles = [],
			lines = [],
			wWidth, wHeight, timer;
		
		requestAnimationFrame = window.requestAnimationFrame || 
			window.mozRequestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			function(callback, element) { setTimeout(callback, 1000 / 60); };

		cancelAnimationFrame = window.cancelAnimationFrame ||
			window.mozCancelAnimationFrame ||
			window.webkitCancelAnimationFrame ||
			window.msCancelAnimationFrame ||
			window.oCancelAnimationFrame ||
			clearTimeout;

		var setCanvasHeight = function(){
			wWidth = $(window).width();
			wHeight = $(window).height(),

			canvas.each(function(){
				this.width = wWidth;
				this.height = wHeight;
			});
		};

		var drawCircle = function(x, y, radius, color, alpha){
			var gradient = fctx1.createRadialGradient(x, y, radius, x, y, 0);
			gradient.addColorStop(0, 'rgba('+color[0]+','+color[1]+','+color[2]+','+alpha+')');
			gradient.addColorStop(1, 'rgba('+color[0]+','+color[1]+','+color[2]+','+(alpha-0.1)+')');

			fctx1.beginPath();
			fctx1.arc(x, y, radius, 0, M.PI*2, true);
			fctx1.fillStyle = gradient;
			fctx1.fill();
		};

		var drawLine = function(x, y, width, color, alpha){
			var endX = x+M.sin(degree)*width,
				endY = y-M.cos(degree)*width,
				gradient = fctx2.createLinearGradient(x, y, endX, endY);
			gradient.addColorStop(0, 'rgba('+color[0]+','+color[1]+','+color[2]+','+alpha+')');
			gradient.addColorStop(1, 'rgba('+color[0]+','+color[1]+','+color[2]+','+(alpha-0.1)+')');

			fctx2.beginPath();
			fctx2.moveTo(x, y);
			fctx2.lineTo(endX, endY);
			fctx2.lineWidth = 3;
			fctx2.lineCap = 'round';
			fctx2.strokeStyle = gradient;
			fctx2.stroke();
		};

		var drawBack = function(){
			bctx.clearRect(0, 0, wWidth, wHeight);

			var gradient = [];
			
			gradient[0] = bctx.createRadialGradient(wWidth*0.3, wHeight*0.1, 0, wWidth*0.3, wHeight*0.1, wWidth*0.9);
			gradient[0].addColorStop(0, 'rgb(0, 26, 77)');
			gradient[0].addColorStop(1, 'transparent');

			bctx.translate(wWidth, 0);
			bctx.scale(-1,1);
			bctx.beginPath();
			bctx.fillStyle = gradient[0];
			bctx.fillRect(0, 0, wWidth, wHeight);

			gradient[1] = bctx.createRadialGradient(wWidth*0.1, wHeight*0.1, 0, wWidth*0.3, wHeight*0.1, wWidth);
			gradient[1].addColorStop(0, 'rgb(0, 150, 240)');
			gradient[1].addColorStop(0.8, 'transparent');

			bctx.translate(wWidth, 0);
			bctx.scale(-1,1);
			bctx.beginPath();
			bctx.fillStyle = gradient[1];
			bctx.fillRect(0, 0, wWidth, wHeight);

			gradient[2] = bctx.createRadialGradient(wWidth*0.1, wHeight*0.5, 0, wWidth*0.1, wHeight*0.5, wWidth*0.5);
			gradient[2].addColorStop(0, 'rgb(40, 20, 105)');
			gradient[2].addColorStop(1, 'transparent');

			bctx.beginPath();
			bctx.fillStyle = gradient[2];
			bctx.fillRect(0, 0, wWidth, wHeight);
		};

		var animate = function(){
			var sin = M.sin(degree),
				cos = M.cos(degree);

			if (config.circle.amount > 0 && config.circle.layer > 0){
				fctx1.clearRect(0, 0, wWidth, wHeight);
				for (var i=0, len = circles.length; i<len; i++){
					var item = circles[i],
						x = item.x,
						y = item.y,
						radius = item.radius,
						speed = item.speed;

					if (x > wWidth + radius){
						x = -radius;
					} else if (x < -radius){
						x = wWidth + radius
					} else {
						x += sin*speed;
					}

					if (y > wHeight + radius){
						y = -radius;
					} else if (y < -radius){
						y = wHeight + radius;
					} else {
						y -= cos*speed;
					}

					item.x = x;
					item.y = y;
					drawCircle(x, y, radius, item.color, item.alpha);
				}
			}

			if (config.line.amount > 0 && config.line.layer > 0){
				fctx2.clearRect(0, 0, wWidth, wHeight);
				for (var j=0, len = lines.length; j<len; j++){
					var item = lines[j],
						x = item.x,
						y = item.y,
						width = item.width,
						speed = item.speed;

					if (x > wWidth + width * sin){
						x = -width * sin;
					} else if (x < -width * sin){
						x = wWidth + width * sin;
					} else {
						x += sin*speed;
					}

					if (y > wHeight + width * cos){
						y = -width * cos;
					} else if (y < -width * cos){
						y = wHeight + width * cos;
					} else {
						y -= cos*speed;
					}
					
					item.x = x;
					item.y = y;
					drawLine(x, y, width, item.color, item.alpha);
				}
			}

			timer = requestAnimationFrame(animate);
		};

		var createItem = function(){
			circles = [];
			lines = [];

			if (config.circle.amount > 0 && config.circle.layer > 0){
				for (var i=0; i<config.circle.amount/config.circle.layer; i++){
					for (var j=0; j<config.circle.layer; j++){
						circles.push({
							x: M.random() * wWidth,
							y: M.random() * wHeight,
							radius: M.random()*(20+j*5)+(20+j*5),
							color: config.circle.color,
							alpha: M.random()*0.2+(config.circle.alpha-j*0.1),
							speed: config.speed*(1+j*0.5)
						});
					}
				}
			}

			if (config.line.amount > 0 && config.line.layer > 0){
				for (var m=0; m<config.line.amount/config.line.layer; m++){
					for (var n=0; n<config.line.layer; n++){
						lines.push({
							x: M.random() * wWidth,
							y: M.random() * wHeight,
							width: M.random()*(20+n*5)+(20+n*5),
							color: config.line.color,
							alpha: M.random()*0.2+(config.line.alpha-n*0.1),
							speed: config.speed*(1+n*0.5)
						});
					}
				}
			}

			cancelAnimationFrame(timer);
			timer = requestAnimationFrame(animate);
			drawBack();
		};

		$(document).ready(function(){
			setCanvasHeight();
			createItem();
		});
		$(window).resize(function(){
			setCanvasHeight();
			createItem();
		});
	}
})(jQuery);
```

### 4.大功告成,附效果图(脑补圈圈在动~)

![](https://fastly.jsdelivr.net/gh/GAATTC0/MyPicGoOSS@main/img/Snipaste_2020-12-03_22-26-45.jpg)