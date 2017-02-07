var mic;
function setup(){
  createCanvas(500,500);
  mic = new p5.AudioIn()
  mic.start();
}
function draw(){
  background(0);
  micLevel = mic.getLevel();
  console.log(micLevel);

  if(micLevel>0.1){
      fill(0,200,200);
      drawStuff(micLevel*100)
  }else{
    fill(255);
  }
  ellipse(width/2, height/2, 100, 100);
}


function drawStuff(size){

  for(var i=0; i<100;i++){
    rect(random(height), random(width),size,size);
  }
}
