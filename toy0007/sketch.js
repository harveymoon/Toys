var ang = 0;

var timer = 0;

var nowPos;
var lastPos; 

function setup() {

  createCanvas(800, 800);
  // background(200);
  rectMode(CENTER);

  nowPos = createVector(width/2, height/2);
}


function draw() {

  timer++;
  if (timer>10) {
    //   background(200, 10);
    fill(200, 10);
    noStroke();
    rect(width/2, height/2, width, height);
    stroke(0);
    timer = 0;
  }

  var Pm = createVector(nowPos.x, nowPos.y);


  var accx = (mouseX-nowPos.x)/55;
  var accy = (mouseY-nowPos.y)/55;

	var maxAcc = 4;

  if (accx>maxAcc) {
    accx = maxAcc;
  }
  if (accx<-maxAcc) {
    accx = -maxAcc;
  }


  if (accy>maxAcc) {
    accy = maxAcc;
  }
  if (accy<-maxAcc) {
    accy = -maxAcc;
  }

  nowPos.x+=accx;
  nowPos.y+=accy;

  //ellipse(nowPos.x, nowPos.y, 20, 20);

  var Mn = createVector(nowPos.x, nowPos.y);


  ang = atan2(Mn.y-Pm.y, Mn.x-Pm.x);

  //line(Mn.x, Mn.y, Pm.x, Pm.y);
  var dist = Mn.dist(Pm);


  //newPos.mult(newPos,100);

  if (dist>.2) {

    push();
    translate(mouseX, mouseY);
    rotate(ang);

    var size = map(dist, 5, 50, 50, 200);
    fill(255);
    line(0, 0, size*2.52, 0);
    rect(size/2, 0, size, 10);
    //ellipse(size*2.52, 0, 10, 10);
    pop();
  }
}
