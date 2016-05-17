
var fragments;
var mouseLoc;

var avoidDist = 0;
var goAvoid = 150;

var p1;
var p2;

var crackSharpness = .35; //0-.5 values;

function setup() {

	 //var density = displayDensity();

	// print("dense "  +density);

	createCanvas(windowWidth,windowHeight);
	//stroke(0);

	fill(10);

	fragments = new Array();
	mouseLoc =createVector();

	var centre = createVector(200, 200); // the center position is decided by mouse position
	 p1 = createVector(0, 0); // the starting top position of the breakup.
	 p2 = createVector(windowWidth, 0); // the second top right position of the first breakup
	var p3 = createVector(windowWidth, windowHeight);// the third bortom right position of the first breakup
	var p4 = createVector(0, windowHeight);// the fourth bottom left position of the first breakup
	decoupe(8, p1, p2, p3, p4, centre ); // basically start breaking up the whole window with the mouse location and random color // first argument is the depth, kinda a power-of, use wisely
}

function draw() {
background(0);
mouseLoc.set(mouseX,mouseY);
// put drawing code here
	for (var i = 0; i < fragments.length; i++) {  	
  	//print(fragments[i] == undefined)
  		fragments[i].moveDraw();
  	};



 if (avoidDist >= 0) {
    goAvoid-= 5;
  }
  

if (avoidDist != goAvoid){
avoidDist+=(goAvoid-avoidDist)/5;
}


}



function mousePressed(){
	goAvoid+=500;
	//mouseLoc.set(mouseX,mouseY);
}

function  decoupe ( fois,  a,  b,  c,  d,  centre ) { // the function that breaks up sections

	var t1=random(0.5-crackSharpness, 0.5+crackSharpness); // pick a random postion to crak // smaller range is less sharp
	var t2=random(0.5-crackSharpness, 0.5+crackSharpness);  // pick another random postion to crack // smaller range is less spikey
	var p1 = createVector();
	var p2 = createVector();
	p1.set(a.x+(b.x-a.x)*t1, a.y+(b.y-a.y)*t1);
	p2.set(d.x+(c.x-d.x)*t2, d.y+(c.y-d.y)*t2);

	// p1.x =a.x+(b.x-a.x)*t1;
	// p1.y = a.y+(b.y-a.y)*t1; //  this is the cracker, it makes two new points while referencing the incomming data 

	//p2.x=d.x+(c.x-d.x)*t2;
	//p2.y= d.y+(c.y-d.y)*t2 ;  //  this is the cracker, it makes two new points while referencing the incomming data, second point that connects the line

	fois--; // the depth has cracked once
	if (fois>0) { // if more recurssive cracks are needed // two shapes resulted from the above function, p1,p2,d,a and b,c,p2,p1
		decoupe(fois, p1, p2, d, a, centre ); // do this function onto the next item
		decoupe(fois, b, c, p2, p1, centre ); // do this function onto the next item
	} else {

	  	var f =new Fragment(a, b, c, d, centre);
	  	append(fragments, f); // if the crack ammount has been reached, this fragment secion is cut up enough, add it to our final array!
  	}
} 

function Fragment (  _a,  _b,  _c,  _d, _cent){	
	this.a = _a;
	this.b = _b;
	this.c = _c;
	this.d = _d;
	this.center = _cent;
	this.dir = createVector(0,0);
	this.rand = createVector(random(-50,50), random(-50,50));
}

Fragment.prototype.moveDraw = function(){
	var distA = this.a.dist(mouseLoc);
	
	//print(dist);

//	text(dist,this.a.x,this.a.y);

	if (distA < avoidDist) {
		var dist = map(distA, 0, avoidDist, 5, 0);
		this.dir = p5.Vector.sub(this.a, mouseLoc);
		this.dir.mult(dist/3);
		//var dir = createVector(this.a.x-mouseLoc.x,this.a.y-mouseLoc.y);
	}

	
	//this.rand.div(distA);
	var randM = p5.Vector.div(this.rand,distA/10);
	this.dir.add();


	if(dist < avoidDist+175){
		//strokeWeight(dist/2);
		stroke(0);
		fill(200);
		quad(this.a.x+this.dir.x,
		this.a.y+this.dir.y,
		this.b.x+this.dir.x,
		this.b.y+this.dir.y,
		this.c.x+this.dir.x,
		this.c.y+this.dir.y,
		this.d.x+this.dir.x,
		this.d.y+this.dir.y,-1,-1,-1,-1);

	}
	else{
		stroke(200);
		strokeWeight(1);
		fill(200);
		quad(this.a.x,this.a.y,this.b.x,this.b.y,this.c.x,this.c.y,this.d.x,this.d.y,1,1,1,1);
	}
}


var getDistance = function( x1,  y1,  x2,  y2) {
  return sqrt(pow(x2-x1, 2)+pow(y2-y1, 2));
}



