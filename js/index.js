var osc, osc2;
var playing = false;

function setup() {
  backgroundColor = color(255,0,255);
  textAlign(CENTER);

  osc2 = new p5.Oscillator();
  osc2.setType('sine');
  osc2.freq(2);
  osc2.amp(1);
  osc2.start();
  osc2.disconnect();

  osc = new p5.Oscillator();
  osc.setType('sine');
  osc.freq(440);
  osc.amp(1);
  osc.start();
  
  osc.amp(osc2);
}

function draw() {
  background(backgroundColor)
  text('click to play', width/2, height/2);
  osc2.freq(mouseX,0.3);
}

function mouseClicked() {
  if (mouseX > 0 && mouseX < width && mouseY < height && mouseY > 0) {
    if (!playing) {
      // ramp amplitude to 0.5 over 0.1 seconds
      osc2.amp(0.5, 0.05);
      osc.amp(0.5, 0.05);
      playing = true;
      backgroundColor = color(0,255,255);
    } else {
      // ramp amplitude to 0 over 0.5 seconds
      osc.amp(0, 0.5);
      playing = false;
      backgroundColor = color(255,0,255);
    }
  }
}