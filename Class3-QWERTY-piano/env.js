var osc, env, carrier, modulator;
console.log("Hello");

function setup(){
    console.log("Setup");
    
    osc = new p5.Oscillator();
    osc.amp(0);
    osc.start();
    
    env = new p5.Env();

  // set attackTime, decayTime, sustainRatio, releaseTime
    env.setADSR(0.001, 0.5, 0.1, 0.5);
  // set attackLevel, releaseLevel
    env.setRange(1, 0);

}

function draw(){

  // change the amplitude of the modulator
  // negative amp reverses the sawtooth waveform, and sounds percussive
  //
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
    env.triggerAttack(osc);
}

function keyReleased(){
    env.triggerRelease();
}












