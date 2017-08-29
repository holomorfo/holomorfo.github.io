var osc, env, modulator;
var freq = 220;

var modMaxFreq = 112;
var modMinFreq = 0;
var modMaxDepth = 150;
var modMinDepth = -150;

function setup(){
    console.log("Setup");
    console.log("prueba cambios");
    // Carrier
    osc = new p5.Oscillator('sine');
    osc.amp(0); // set amplitude
    osc.freq(freq); // set frequency
    osc.start(); // start oscillating

  // try changing the type to 'square', 'sine' or 'triangle'
    modulator = new p5.Oscillator('sine');
    modulator.freq(25);
    modulator.amp(50);
    modulator.start();

  // add the modulator's output to modulate the carrier's frequency
    modulator.disconnect();
    osc.freq( modulator );
    // Instantiate the envelope
    env = new p5.Env();

  // set attackTime, decayTime, sustainRatio, releaseTime
    env.setADSR(0.001, 0.5, 0.1, 0.5);

  // set attackLevel, releaseLevel
    env.setRange(1, 0);

}

function draw(){
  // map mouseY to modulator freq between a maximum and minimum frequency
  var modFreq = map(mouseY, height, 0, modMinFreq, modMaxFreq);
  modulator.freq(modFreq);

  // change the amplitude of the modulator
  // negative amp reverses the sawtooth waveform, and sounds percussive
  //
  var modDepth = map(mouseX, 0, width, modMinDepth, modMaxDepth);
  modulator.amp(modDepth);
}

function keyPressed(){
    freq=0;
    switch(key){
        case 'Q':
        freq=midiToFreq(60);
        break;
        case '2':
        freq=midiToFreq(61);
        break;
        case 'W':
        freq=midiToFreq(62);
        break;
        case '3':
        freq=midiToFreq(63);
        break;
        case 'E':
        freq=midiToFreq(64);
        break;
        case 'R':
        freq=midiToFreq(65);
        break;
        case '5':
        freq=midiToFreq(66);
        break;
        case 'T':
        freq=midiToFreq(67);
        break;
        case '6':
        freq=midiToFreq(68);
        break;
        case 'Y':
        freq=midiToFreq(69);
        break;
        case '7':
        freq=midiToFreq(70);
        break;
        case 'U':
        freq=midiToFreq(71);
        break;
    }
    osc.freq(freq);
    console.log("Freq "+freq );
    env.play(osc);
}

function keyReleased(){
}








