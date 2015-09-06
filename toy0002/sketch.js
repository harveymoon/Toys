

var iMax = 20;
var jMax = 10;
var f = new Array();
var s= new Array();

var ww =20;
var hh = 20;



var colorA ;
var colorB;
var colorC;
var colorD;

var particles = [];

function setup() {
		createCanvas(windowWidth,windowHeight);
  // put setup code here
MnowPos = createVector(500,500);
Macc = createVector(0,0);

 ww = (width/2)/iMax;
 hh = (height/2)/jMax;

for (i=0;i<iMax;i++) {
 f[i]=new Array();
s[i] = new Array();
  for (j=0;j<jMax;j++) {
  f[i][j]=random(PI);
  s[i][j]=1 ;
 }
}





	colorA = color( 38,113, 88);
	colorC = color(46, 66,114);
	colorB = color(112,156, 52);

	colorD = color(255,0,0);

background(10);
}

function draw() {

//background(255);

// for (i=0;i<iMax;i++) {
//  for (j=0;j<jMax;j++) {
//  //	fill(f[i][j]);

//  rect(i*ww,j*hh,ww-2,hh-2);
//  text(  f[i][j]  ,i*ww,j*hh )
//   // 
//  }
// }


	var x1 = mouseX;
	var y1 = mouseY;
	var x2 = pmouseX;
	var y2 = pmouseY;
	var xG1 = int(map(x1,0,width,0,iMax));
	var yG1 = int(map(y1,0,height,0,jMax));


	//= f[xG1][yG1]+10;

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
//if(mouseIsPressed){
	f[xG1][yG1] = ang;
	s[xG1][yG1] = d;
	}
 //  	ellipse(x1,y1,85,85);
	// fill(255);
	// rect(0,0,100,100);
	// fill(255);
	  //	text(map(ang,-PI,PI,0,255), mouseX,mouseY+10);
	//}

  // put drawing code here

for(var i = 0; i < particles.length; i++){

		//var noiseRot = map(noise(particles[i].nowPos.x * .006 ,particles[i].nowPos.y * .006), .2, .8, 0, PI*2 );
		//particles[i].acc.set(cos(noiseRot)*3,sin(noiseRot)*3);
		//var pxG1 =  int((particles[i].nowPos.x/width) * iMax;
		//var pyG1 =  (particles[i].nowPos.y/height) * jMax;
		var pxG1 = int(map(particles[i].nowPos.x  ,  0,width,  0,iMax  ));
		var pyG1 = int(map(particles[i].nowPos.y,  0,height,0,jMax));
		//print(pxG1);
		//print(nAng);
		var nAng = f[pxG1][pyG1] + PI;
		var nSpeed = s[pxG1][pyG1]* .5;
	
		particles[i].acc.x += (cos(nAng) - particles[i].acc.x  ) /(5*nSpeed);
		particles[i].acc.y += (sin(nAng)- particles[i].acc.y ) /(5*nSpeed) ;
		
		//particles[i].acc.set(cos(nAng)*nSpeed,sin(nAng)*nSpeed);
		
		particles[i].update();
		particles[i].draw(1);


	// 	if(particles[i].nowPos.x>=width-10 || particles[i].nowPos.x <= 10 || particles[i].lifeCount <= 0){
	// 	particles.splice(i,1);
	// 	println("kill : " + i);
	// }


	}
	if(particles.length < 500){


		MnowPos.x = random(width);
		MnowPos.y = random(height);

		for (var i = 10 - 1; i >= 0; i--) {
			


		MnowPos.add(random(-20,20), random(-20,20) );
		var particle;
		var mLoc = int(map(MnowPos.x,0,width,0,4));
		if(mLoc == 0){
			particle = new Particle(MnowPos,Macc,colorA);
		}
		else if(mLoc == 1){
			particle= new Particle(MnowPos,Macc,colorB);
		}
		else if(mLoc == 2){
			particle = new Particle(MnowPos,Macc,colorC);
		}
		else if(mLoc == 3){
			particle = new Particle(MnowPos,Macc,colorD);
		}
		particles.push(particle);
	}

}



	for(var j = 0; j < particles.length; j++){
		if(particles[j].nowPos.x>=width-10 || particles[j].nowPos.x <= 10 || particles[j].nowPos.y>=height-10 || particles[j].nowPos.y <= 10 ){ //|| particles[j].lifeCount <= 0){
			particles.splice(j,1);
			//println("kill : " + j);
		}
	}

}

function Particle ( posN, accN, colorIn){
	this.nowPos=createVector(posN.x,posN.y);
	this.acc = createVector(accN.x, accN.y);
	this.lifeCount = random(1700,2500);
	this.colorN = colorIn;
}

Particle.prototype.update = function(){
	this.lifeCount--;
	this.nowPos.add(this.acc);
}

Particle.prototype.draw = function(siz){
	fill(this.colorN);
	ellipse(this.nowPos.x,this.nowPos.y,siz,siz);
}