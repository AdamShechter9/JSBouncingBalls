var canvas= document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var myclock = document.getElementById("myclock");
var ctxclock = myclock.getContext("2d");
var radius = myclock.height / 2;
ctxclock.translate(radius, radius);
radius = radius * 0.9;
drawClock();

function drawClock () {
	ctxclock.arc(0,0, radius, 0, 2*Math.PI);
	ctxclock.fillStyle = "white";
	ctxclock.fill();
	drawClockFace(ctxclock, radius);
	drawNumbers(ctxclock, radius);
}

function drawClockFace (ctxclock, radius) {
	ctxclock.beginPath();
	ctxclock.arc(0,0, radius, 0, 2*Math.PI);
	ctxclock.fillStyle = "white";
	ctxclock.fill();
	grad = ctxclock.createRadialGradient(0,0,radius*0.95,0,0,radius *1.05);
	grad.addColorStop(0, '#333');
	grad.addColorStop(0.5, 'white');
	grad.addColorStop(1, "#333");
	ctxclock.strokeStyle = grad;
	ctxclock.lineWidth = radius * 0.1;
	ctxclock.stroke();
	ctxclock.beginPath();
	ctxclock.arc(0,0,radius*0.1,0,2*Math.PI);
	ctxclock.fillStyle = '#333';
	ctxclock.fill();
}

function drawNumbers(ctxclock, radius) {
	ctxclock.font = radius*0.15 + "px arial";
	ctxclock.textBaseline="middle";
	ctxclock.textAlign="center";
	for (var num =1;num<13;num++)
	{
		ang = num * Math.PI / 6;
		ctxclock.rotate(ang);
		ctxclock.translate(0, -radius*0.85);
		ctxclock.rotate(-ang);
		ctxclock.fillText(num.toString(), 0, 0);
		ctxclock.rotate(ang);
		ctxclock.translate(0, radius*0.85);
		ctxclock.rotate(-ang);
	}
}

window.onload = function () {
	var imgstars = document.getElementById("starscape");
	ctx.drawImage( imgstars, 0,0);
	ctx.moveTo(0,0);
	ctx.lineTo(500,400);
	ctx.stroke();

	ctx.beginPath();
	ctx.arc(200,150,80,0,2*Math.PI);
	ctx.stroke();

	var grd=ctx.createRadialGradient(100, 100, 50, 300, 300, 80);
	grd.addColorStop(0,"blue");
	grd.addColorStop(1,"green");

	ctx.fillStyle = grd;
	ctx.fillRect(100,100,200,200);

}

