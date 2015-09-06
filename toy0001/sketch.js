var square1;

var nBoxes = 10;
var BB = [];


function setup() {
		createCanvas(windowWidth,windowHeight);
  // put setup code here
}

function draw() {


	var x1 = mouseX;
	var y1 = mouseY;
	var x2 = pmouseX;
	var y2 = pmouseY;



	// line(x1,y1,x2,y2);
	var d = int(dist(x1,y1, x2,y2));

	var ang = atan2(y2-y1,x2-x1);

	var c = color(map(ang,0,PI*2,0,255));
	fill(c);

	noStroke();

	// push();
 //  	translate( (x1+x2)/2, (y1+y2)/2 );
 //  	rotate( ang );
 //  	text(nfc(d,1,1), 0, -5);
 //  	pop();

if(d >= 5){

  	ellipse(x1,y1,85,85);
	fill(255);
	rect(0,0,100,100);
	fill(255);
	  //	text(map(ang,-PI,PI,0,255), mouseX,mouseY+10);
	}

  // put drawing code here
}