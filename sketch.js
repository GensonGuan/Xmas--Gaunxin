var myPicture
var startingColor
var endingColor


function preload() {
  myPicture = loadImage('picture/Xmas.jpg');
}

var snowflakes = []


function setup() {
  createCanvas(360,640);
  
  //Deal with microphone
  mic = new p5.AudioIn();
  mic.start();
  
  startingColor = color(0,60,0)
  endingColor = color(255,0,0)
}


function draw() {
  var volume = mic.getLevel();
  
  //If the volume is not enought, re-map it (set a higher newMax).
  var newMax = 5;
  volume = map(volume,0,1,0,newMax);
  
  
  image(myPicture,0,0,360,640);
  
  
  //EYE
  var eyeX = 100;
  var eyeY = 130;
  var eyeSize = 8;
  var eyelidShift = map(volume,0,1,10,1);
  fill(0);
  ellipse(eyeX-eyelidShift,eyeY,eyeSize);
  
  var eyeX = 138;
  var eyeY = 129;
  var eyeSize = 8;
  var eyelidShift = map(volume,0,1,5,1);
  fill(0);
  ellipse(eyeX-eyelidShift,eyeY,eyeSize);
  
  var eyeX = 333;
  var eyeY = 231;
  var eyeSize = 8;
  var eyelidShift = map(volume,0,1,5,1);
  fill(0);
  ellipse(eyeX+eyelidShift,eyeY+eyelidShift,eyeSize);
  
  var eyeX = 298;
  var eyeY = 237;
  var eyeSize = 8;
  var eyelidShift = map(volume,0,1,3,1);
  fill(0);
  ellipse(eyeX+eyelidShift,eyeY+eyelidShift,eyeSize);
  
  //eyebrow
  
  var eyeX = 98;
  var eyeY = 123;
  var eyeSize1 = 5;
  var eyeSize2 = 36;
  var eyelidShift = map(volume,0,1,5,1);
  fill(120,50,20);
  ellipse(eyeX,eyeY-eyelidShift,eyeSize2,eyeSize1);
  
  
  var eyeX = 138;
  var eyeY = 123;
  var eyeSize1 = 5;
  var eyeSize2 = 20;
  var eyelidShift = map(volume,0,1,5,1);
  fill(120,50,20);
  ellipse(eyeX,eyeY-eyelidShift,eyeSize2,eyeSize1);
  
  var eyeX = 330;
  var eyeY = 218;
  var eyeSize1 = 5;
  var eyeSize2 = 25;
  var eyelidShift = map(volume,0,1,5,1);
  fill(210,200,90);
  ellipse(eyeX+eyelidShift,eyeY+eyelidShift,eyeSize2,eyeSize1);
  
  var eyeX = 298;
  var eyeY = 220;
  var eyeSize1 = 5;
  var eyeSize2 = 20;
  var eyelidShift = map(volume,0,1,3,1);
  fill(210,200,90);
  ellipse(eyeX+eyelidShift,eyeY+eyelidShift,eyeSize2,eyeSize1);
  
  //back
  push();  //Start with transformations
  noStroke
  var rectColor =
            lerpColor(startingColor,endingColor,volume*3)
        
        fill(rectColor)
  //fill(255,0,0)
  translate(width/2,height);
  var size = map(volume,0,1,width/5,width/2);
  ellipse(0,0,size*3);
  pop();
  
  //text
  push()
  textSize(36)
  textAlign(CENTER)
  fill(210,200,90)
  textFont('Questrial')
  text('HAPPY',width/2,height/30*25)
  text('Xmas!',width/2,height/30*27)
  textSize(20)
  text('(Sing to me,plz~)',width/2,height/30*29)
  pop()

  
  push();  //Start with transformations
  
  //mouse
  noStroke()
  fill(145,45,82)
  ellipse(116,192,36,volume*20)
  fill(0)
  ellipse(116,192,30,volume*10)
  
  fill(255,0,0)
  ellipse(320,300,36,volume*30)
  fill(0)
  ellipse(320,300,35,volume*22)
  
  //var size = map(volume,0,1,width/5,width/2);
  //ellipse(0,0,size);
  pop();  //All transformation are now dropped and the coordinate system is resetted.
  
  
  
  
  
  
  //SNOWFLAKES
  if(true){
    var amount= map(volume,0,1,0,5);
    for(i=1; i <= amount; i++) {
      var obj = {
        x: random(0,1),
        y: random(0,-height/10),
        size: random(1, amount+2)
      }
      //add snowflake to the array of snowflakes
      snowflakes.push(obj);
    }
  }
  
  
  for(var i=0; i< snowflakes.length; i++) {
    var fallingSpeed = 1;
    
    // Increase the single snowflake vertical position
    snowflakes[i].y += fallingSpeed + snowflakes[i].y*0.006; // the last piece needs to simulate gravity
    
    // Create a new ellipse using the x and y properties of the snowflake object
    fill(235,235,188)
    noStroke();
    fill(255);
    ellipse(snowflakes[i].x*width, snowflakes[i].y, snowflakes[i].size);
  }
  
  // Ideally at the end of the sketch:
  // remove elements from array when they go out of the window
  // (not a minimum requirement, just useful for better performances)
  for (var i=snowflakes.length-1; i>= 0; i--){
    if (snowflakes[i].y > height){
      snowflakes.splice(i,1);
    }
  }
  
}
