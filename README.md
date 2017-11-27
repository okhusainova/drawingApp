# Socket.io Drawing

* Create and navigate into application directory

* Install Express
```shell
$ npm install express --save
```

* Install Socket.IO
```shell
$ npm install socket.io --save
```


* Event handling
```javascript
io.on('connection', function (socket) {
	socket.on('draw', function (data) {
		socket.broadcast.emit('draw', data);
	});
});
```

* Define function to draw lines on client
```javascript
function drawLine(context, x1, y1, x2, y2) {
	context.moveTo(x1, y1);
	context.lineTo(x2, y2);
	context.stroke();
}
```

* Excecute script when content loaded
```javascript
document.addEventListener("DOMContentLoaded", function() {
```

* Set up canvas
```javascript
	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');
	var width = window.innerWidth;
	var height = window.innerHeight;

	canvas.width = width;
	canvas.height = height;
```

* Add mouse state variables
```javascript
	var drawing = false;
	var x, y, prevX, prevY;
```

* Connect to server
```javascript
	var socket = io.connect();
```

* Handle mouse down event
```javascript
	canvas.onmousedown = function(e) {
		drawing = true;
		prevX = x;
		prevY = y;
	}
```

* Add listener for drawing from other clients
```javascript
	socket.on('draw', function(data) {
		drawLine(context, data.x1, data.y1, data.x2, data.y2);
	});
});
```