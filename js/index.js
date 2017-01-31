var osc, env, modulator;

function setup() {
  createCanvas(400, 400);
  background(200);
  
  // carrier
  osc = new p5.Oscillator();
  osc.amp(0);
  osc.freq(440);
  osc.start();
  
  // modulator
  modulator = new p5.Oscillator();
  modulator.amp(200);
  modulator.freq(500);
  modulator.start();
  modulator.disconnect();
  
  osc.freq(modulator);
  
  env = new p5.Env();
  env.setADSR(0.1,0.1,0.1,0.1);
  osc.amp(env);
  } 

function keyReleased(){

}

function keyPressed(){
  console.log(key);
  env.play();
}

function draw() {
}  
 
function mousePressed(){
  
}