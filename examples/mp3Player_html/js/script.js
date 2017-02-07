

var mySound1, mySound2, playedSound, sel;
var buttonPlay;
function preload() {
  mySound1 = loadSound('assets/s2.mp3');
  mySound2 = loadSound('assets/s3.mp3');

}

function setup() {
  playedSound=mySound1;
  mySound1.setVolume(0.1);
  mySound1.setVolume(0.1);

  buttonPlay = createButton('Play');
  buttonPlay.position(20, 100);
  buttonPlay.mousePressed(playFunc);

  buttonStop = createButton('Stop');
  buttonStop.position(100, 100);
  buttonStop.mousePressed(stopFunc);
}

function playFunc() {
  playedSound.play();
}

function stopFunc() {
  playedSound.stop();
}

function mySelectEvent(item) {
  if(item==='Song 1'){
    stopFunc();
    playedSound=mySound1;
    console.log("Song 1");
  }else if (item==='Song 2') {
    stopFunc();
    playedSound=mySound2;
    console.log("Song 2");
  }
}


function draw() {

}

// When we click
function mousePressed() {
}

// Fade it out when we release
function mouseReleased() {
}

function testHtml(x){
  console.log("Its working test");
  console.log(x);
}

// When we click
function mousePressed() {
}

// Fade it out when we release
function mouseReleased() {
}
