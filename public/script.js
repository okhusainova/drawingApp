function drawLine(context, x1, y1, x2, y2, color, lineWidth) {
  context.beginPath();
	context.moveTo(x1, y1);
  context.strokeStyle = color;
  context.lineWidth = lineWidth;
	context.lineTo(x2, y2);
	context.stroke();
}

$('#clearBtn').on({
  mouseenter() {
    $('.clear-canvas-btn__label').text('Do it!');
  },
  mouseleave() {
    $('.clear-canvas-btn__label').text('Clear');
  }
});

document.addEventListener("DOMContentLoaded", function() {
	var canvas = document.getElementById('canvas'),
	    context = canvas.getContext('2d'),
	    width = window.innerWidth,
	    height = 668;

	canvas.width = width;
	canvas.height = height;

  context.lineWidth = 5;
  context.lineJoin = 'round';
  context.lineCap = 'round';
  context.strokeStyle = 'blue';

	var drawing = false;
	var x, y, prevX, prevY, color, lineWidth;

	var socket = io.connect();

	$('#clearBtn').on('click', function(){
	clearCanvas();
	socket.emit('clear');
})

	function clearCanvas() {
		context.clearRect(0, 0, canvas.width, canvas.height);
	}


  $('.js-color').on('click', function(e) {
    const $this = $(e.currentTarget);
    color = $this.data('color');
  });

$('.js-tickness').on('click', function (e) {
	const $this = $(e.currentTarget);
  lineWidth = $this.data('width');
});

	canvas.onmousedown = function(e) {
		drawing = true;
		prevX = x;
		prevY = y;
	}

	canvas.onmouseup = function(e) {
		drawing = false;
	}

	canvas.onmousemove = function(e) {
		x = e.clientX;
		y = e.clientY;
		if (drawing) {
			socket.emit('draw', {
				'x1': prevX,
				'y1': prevY,
				'x2': x,
				'y2': y,
				'color': color,
        'lineWidth': lineWidth
			});

			drawLine(context, prevX, prevY, x, y, color, lineWidth);
			prevX = x;
			prevY = y;
		}
	}

	socket.on('draw', function(data) {
    drawLine(context, data.x1, data.y1, data.x2, data.y2, data.color, data.lineWidth);
	});

	socket.on('clear', function(){
		clearCanvas();
	})
});
