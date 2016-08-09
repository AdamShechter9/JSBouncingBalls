// Balls animation made in JavaScript.
// Utilizing JQuery.

// By Adam Shechter    adam.s.develop@gmail.com

var circlesArr = [];
var gravity = 1;

var colors = ["#000000", "#FF0000", "#00FF00",
			 "#0000FF", "#FFFF00", "#00FFFF", "#FF00FF", "#C0C0C0"];


function createCanvasObject() {
	var width = window.innerWidth;
	var height = window.innerHeight;
	var canvasObject = document.createElement("CANVAS");
	canvasObject.id = "balls";
	canvasObject.height = height * 0.8;
	canvasObject.width = width * 0.8;
	var canvasdiv = document.getElementsByClassName("canvasspace");
	canvasdiv[0].appendChild(canvasObject);
}

function circleOBJ (circlex, circley) {
	this.x = circlex;
	this.y = circley;
	this.radius = Math.floor(Math.random()*20)+5;
	this.xvelocity = Math.floor(Math.random()*5)+0.5;
	this.yvelocity = Math.floor(Math.random()*5)+0.5;
	colorn = Math.floor(Math.random()*8);
	this.color = colors[colorn];
}

var requestAnimationFrame = window.requestAnimationFrame || 
                            window.mozRequestAnimationFrame || 
                            window.webkitRequestAnimationFrame || 
                            window.msRequestAnimationFrame;
createCanvasObject();
var canvas = document.getElementById('balls');
var ctx = canvas.getContext("2d");

function renderCircle() {
	ctx.clearRect(0,0,canvas.width,canvas.height);

	for(var i = 0; i < circlesArr.length ;i+=1 )
	{
		ctx.beginPath();
		ctx.arc(circlesArr[i].x,circlesArr[i].y,circlesArr[i].radius,0,2*Math.PI);
		ctx.fillStyle = circlesArr[i].color;
		ctx.fill();
		ctx.closePath();

		if (((circlesArr[i].y + circlesArr[i].radius) > canvas.height) || ((circlesArr[i].y - circlesArr[i].radius) < 0))
		{
			circlesArr[i].yvelocity*=-1;
		}
		if (((circlesArr[i].x + circlesArr[i].radius) >= canvas.width) || ((circlesArr[i].x - circlesArr[i].radius) <= 0))
		{
			circlesArr[i].xvelocity*=-1;
		}
		circlesArr[i].y += circlesArr[i].yvelocity;
		circlesArr[i].x += circlesArr[i].xvelocity;

		for (var idx = 0; idx < circlesArr.length; idx += 1) {
			// skip over if it's the same circle with same index number
			if (idx === i) {
				continue;
			}
			else {
				// detection collision
				// console.log('in detection collision', i, idx);
				var xdist = Math.pow((circlesArr[i].x - circlesArr[idx].x), 2);
				var ydist = Math.pow((circlesArr[i].y - circlesArr[idx].y), 2);
				var radSqr = Math.pow((circlesArr[i].radius + circlesArr[idx].radius), 2);
				if ((xdist + ydist) <= radSqr) {
					// console.log('collision!!!!!!', i, idx);
					if (idx > i) {
						circlesArr.splice(idx, 1);
						circlesArr.splice(i, 1);
					} else {
						circlesArr.splice(i, 1);
						circlesArr.splice(idx, 1);
					}
					
					break;
				}
			}
		}
	}
	requestAnimationFrame(renderCircle);
}

function makeCircle(circlex, circley) {
	var newCircle = new circleOBJ(circlex, circley);
	var randomDirectionX = Math.floor(Math.random() * 2),
		randomDirectionY = Math.floor(Math.random() * 2);

	if (randomDirectionX != 1)
		newCircle.xvelocity *= -1;
	if (randomDirectionY != 1)
		newCircle.yvelocity *= -1;

	circlesArr.push(newCircle);

	console.log('X ' + newCircle.x);
	console.log('Y ' + newCircle.y);
	console.log('Xvel ' + newCircle.xvelocity);
	console.log('Yvel ' + newCircle.yvelocity);
}

$(document).ready(function (){
	var renderFlag = false;

	makeCircle((window.innerWidth / 2), (window.innerHeight / 2));
	renderCircle();

	$('#balls').click(function(event){
		console.log('canvas clicked');
		var x = event.clientX;     // Get the horizontal coordinate
		var y = event.clientY;     // Get the vertical coordinate
		makeCircle(x,y);

	})
})