var soundList = []
var namesList = []
var currentIndex = 0;
var buttonPlay, buttonStop, buttonPause;
var isRandom = false;

function preload() {
  console.log('Loading 1');
  namesList = ['Elevadoresque.mp3', 'PianoCollider.mp3', 'Melodia.mp3','chiptune.mp3'];
  for(var i=0;i<namesList.length;i++){
    soundList.push(loadSound(namesList[i]));
  }
}

function setup() {
  createCanvas(900, 600);
  background(0);

  selectSound = createSelect();
  selectSound.position(20, 120);

  for (var i = 0; i < namesList.length; i++) {
    selectSound.option(namesList[i]);
  }

  selectSound.changed(changeSong);

  fft = new p5.FFT();
  fft.setInput(soundList[currentIndex]);

  buttonPlay = createButton('play');
  buttonPlay.position(220, 120);
  buttonPlay.mousePressed(playCurrentSound);

  buttonPause = createButton('pause');
  buttonPause.position(320, 120);
  buttonPause.mousePressed(pauseCurrentSound);

  buttonStop = createButton('stop');
  buttonStop.position(420, 120);
  buttonStop.mousePressed(stopCurrentSound);

  buttonStop = createButton('<<<');
  buttonStop.position(520, 120);
  buttonStop.mousePressed(previousSound);

  buttonPrev = createButton('>>>');
  buttonPrev.position(620, 120);
  buttonPrev.mousePressed(nextSound);

  buttonLoop = createButton('random');
  buttonLoop.position(720, 120);
  buttonLoop.mousePressed(randomize);

  buttonLoop = createButton('loop');
  buttonLoop.position(820, 120);
  buttonLoop.mousePressed(loopCurrentSound);

};

function draw() {
  background(0);
  // Current Play time
  var timeX = width * soundList[currentIndex].currentTime() / soundList[currentIndex].duration();
  fill(255);
  rect(0, 0, timeX, 20);
  // FFT
  var spectrum = fft.analyze();
  beginShape();
  for (i = 0; i < spectrum.length; i++) {
    vertex(i * 5, map(spectrum[i], 0, 255, height, 130));
  }
  endShape();

  textSize(22);
  fill(255);
  var tx = 'Current song,              looping: '+soundList[currentIndex].isLooping();
  tx +=  '              random: ' +isRandom;
  tx += '\n' + namesList[currentIndex];
  text(tx, 20, 50);
};

function nextSound() {
  if (soundList[currentIndex].isPlaying()) {
    stopCurrentSound();
    if (isRandom) {
      currentIndex = int(random(namesList.length));
    } else {
      currentIndex = Math.min(currentIndex + 1, namesList.length - 1);
    }
    playCurrentSound();
  } else {
    if (isRandom) {
      currentIndex = int(random(namesList.length));
    } else {
      currentIndex = Math.min(currentIndex + 1, namesList.length - 1);
    }
  }
  console.log('Current index next' + currentIndex);
  fft.setInput(soundList[currentIndex]);
}

function previousSound() {
  if (soundList[currentIndex].isPlaying()) {
    stopCurrentSound();
    if (isRandom) {
      currentIndex = int(random(namesList.length));
    } else {
      currentIndex = Math.max(currentIndex - 1, 0);
    }
    playCurrentSound();
  } else {
    if (isRandom) {
      currentIndex = int(random(namesList.length));
    } else {
      currentIndex = Math.max(currentIndex - 1, 0);
    }
  }
  fft.setInput(soundList[currentIndex]);
  console.log('Current index past' + currentIndex);
}

function playCurrentSound() {
  if (!soundList[currentIndex].isPlaying()) {
    soundList[currentIndex].play();
    fft.setInput(soundList[currentIndex]);
  }
}

function pauseCurrentSound() {
  soundList[currentIndex].pause();
  fft.setInput(soundList[currentIndex]);
}

function stopCurrentSound() {
  soundList[currentIndex].stop();
}

function loopCurrentSound() {
  if (soundList[currentIndex].isLooping()) {
    soundList[currentIndex].setLoop(false);
  } else {
    soundList[currentIndex].setLoop(true);
  }
}

function changeSong() {
  var item = selectSound.value();
  console.log('Current index of select value' + item);
  console.log('Current index list of select value' + namesList);

  console.log('Current index list of select value' + namesList.indexOf(item));

  if (soundList[currentIndex].isPlaying()) {
    stopCurrentSound();
    currentIndex = namesList.indexOf(item);
    console.log('Current index of select' + currentIndex);
    playCurrentSound();
  } else {
    currentIndex = namesList.indexOf(item);
  }
  fft.setInput(soundList[currentIndex]);
  console.log('Current index select' + currentIndex);
}

function randomize(){
  isRandom = !isRandom;
}