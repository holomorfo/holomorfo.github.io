
// https://www.keithmcmillen.com/blog/making-music-in-the-browser-web-midi-api/

class Note {
    constructor(midiNote, vel, timeStart) {
        this.midNum = midiNote;
        this.velocity = vel;
        this.timeStamp = timeStart;
        this.isClosed = false;
    }

    setEndTime(endTm) {
        this.endTime = endTm-this.timeStamp;
        this.isClosed = true;
    }

}

var midi, data;
var currNote, currVel;
var context = new AudioContext();
var listNotes = [];

// request MIDI access
if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess({
        sysex: false
    }).then(onMIDISuccess, onMIDIFailure);
} else {
    alert("No MIDI support in your browser.");
}

// midi functions
function onMIDISuccess(midiAccess) {
    // when we get a succesful response, run this code
    midi = midiAccess; // this is our raw MIDI data, inputs, outputs, and sysex status
    console.log('Success MIDI');
    var inputs = midi.inputs.values();
    // loop over all available inputs and listen for any MIDI input
    for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
        // each time there is a midi message call the onMIDIMessage function
        console.log('Input ' + input);
        input.value.onmidimessage = onMIDIMessage;
    }
}

function onMIDIFailure(error) {
    // when we get a failed response, run this code
    console.log("No access to MIDI devices or your browser doesn't support WebMIDI API. Please use WebMIDIAPIShim " + error);
}

function onMIDIMessage(message) {
    data = message.data; // this gives us our [command/channel, note, velocity] data.
    if (128 <= data[0] && data[0] < 144) {
        console.log('MIDI Note Off', data, context.currentTime); // MIDI data [144, 63, 73]
        // Run list, remove elements    
        for (var i = 0; i < listNotes.length; i++) {
            if (!listNotes[i].isClosed && listNotes[i].midNum == data[1]) {
                console.log('close note');
                listNotes[i].setEndTime(context.currentTime);
            }
        }
    } else if (144 <= data[0] && data[0] < 160) {
        console.log('MIDI Note On', data, context.currentTime); // MIDI data [144, 63, 73]
        currNote = data[1];
        currVel = data[2];
        if(listNotes.length>50){
            listNotes.shift();
        }
        listNotes.push(new Note(currNote, currVel, context.currentTime));
    }
    console.log("num list "+listNotes.length);
    //console.log('MIDI data', data, context.currentTime); // MIDI data [144, 63, 73]
}

//==========================================00
// P5

var notePosY = 0;
var w = window.innerWidth * 0.75;
var h = window.innerHeight * 0.75;
var scaledTime = 0;
var secsWindow = 5  ;
var offsetX = w * 0.85;

function setup() {
    createCanvas(w, h);
    colorMode(HSB, 50);

}

function draw() {
    background(200);
    scaledTime = context.currentTime;
    scaledTime = map(context.currentTime, 0, secsWindow, 0, w)
    translate(-scaledTime, 0);
    //scale(10,1);
    for (var i = 0; i < listNotes.length; i++) {
        //notePosX= listNotes[i].timeStamp+w/2;
        notePosX = map(listNotes[i].timeStamp, 0, secsWindow, 0, w) + offsetX;
        if (listNotes[i].isClosed) {
            noteWidthX = map(listNotes[i].endTime, 0, secsWindow, 0, w);
        } else {
            //console.log('not closed');
            tempWidth = context.currentTime-listNotes[i].timeStamp
            noteWidthX = map(tempWidth, 0, secsWindow, 0, w);
        }
        notePosY = map(listNotes[i].midNum, 0, 120, h - 50, 50);
        //notePosY=listNotes[i].midNum;
        rectMode(CORNER);
        noteSizeY = map(listNotes[i].velocity, 0, 127, 0, 50);
        fill(noteSizeY,25,25);
        rect(notePosX, notePosY, noteWidthX, -noteSizeY);
        textSize(32);
        text(""+listNotes[i].velocity,notePosX, notePosY-50)
    }
}