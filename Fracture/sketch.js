
var fragments;
var mouseLoc;

var avoidDist = 0;
var goAvoid = 150;

var smallDim = 0;

var crackSharpness = .35; //0-.5 values;


var pg;

var pi; 

function setup() {

	 //var density = displayDensity();

	// print("dense "  +density);

	createCanvas(windowWidth,windowHeight);

	//pi = createImage(width,height);
	pg = createGraphics(width/2,height/2);


	print(width);
	print(pg.width);


	pg.background(255);
	pg.fill(0);

	if( windowWidth< windowHeight){
		smallDim = windowWidth;
	}
	else {
		smallDim = windowHeight;
	}
	//stroke(0);

	fill(10);

	fragments = new Array();
	mouseLoc =createVector();

	var centre = createVector(200, 200); // the center position is decided by mouse position
	var p1 = createVector(0, 0); // the starting top position of the breakup.
	var p2 = createVector(windowWidth, 0); // the second top right position of the first breakup
	var p3 = createVector(windowWidth, windowHeight);// the third bortom right position of the first breakup
	var p4 = createVector(0, windowHeight);// the fourth bottom left position of the first breakup
	decoupe(9, p1, p2, p3, p4, centre ); // basically start breaking up the whole window with the mouse location and random color // first argument is the depth, kinda a power-of, use wisely
}

function draw() {



background(255);



mouseLoc.set(mouseX,mouseY);
// put drawing code here

pg.background(255);

textSize(width/10);





	for (var i = 0; i < fragments.length; i++) {  	
  	//print(fragments[i] == undefined)
  		fragments[i].moveDraw();
  	};



noStroke();
text("HARVEY MOON", 200,200);
blendMode(DIFFERENCE);
fill(255);
noStroke();
 text("HARVEY MOON", 200,200);
image(pg,0,0,width,height);
blendMode(BLEND);


 if (avoidDist >= 100) {
    goAvoid-= 4;
  }
  

if (avoidDist != goAvoid){
avoidDist+=(goAvoid-avoidDist)/10;
}


}



function mousePressed(){
	if(goAvoid <= smallDim/4){
	goAvoid+=smallDim/4;
	}
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



	if(distA < avoidDist+20){
		

		pg.quad(
		(this.a.x+this.dir.x)/4,
		(this.a.y+this.dir.y)/4,
		(this.b.x+this.dir.x)/4,
		(this.b.y+this.dir.y)/4,
		(this.c.x+this.dir.x)/4,
		(this.c.y+this.dir.y)/4,
		(this.d.x+this.dir.x)/4,
		(this.d.y+this.dir.y)/4,
		-1,-1,-1,-1);


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
		if(distA < avoidDist+50){
			stroke(0);
		}
		strokeWeight(1);
		fill(200);
		
		quad(this.a.x,this.a.y,this.b.x,this.b.y,this.c.x,this.c.y,this.d.x,this.d.y,1,1,1,1);
		
		pg.quad(
		this.a.x/4,
		this.a.y/4,
		this.b.x/4,
		this.b.y/4,
		this.c.x/4,
		this.c.y/4,
		this.d.x/4,
		this.d.y/4,
		1,1,1,1);

	}
}


var getDistance = function( x1,  y1,  x2,  y2) {
  return sqrt(pow(x2-x1, 2)+pow(y2-y1, 2));
}



