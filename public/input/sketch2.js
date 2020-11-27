
let serial;          // variable to hold an instance of the serialport library
let portName = '/dev/tty.usbmodem14401';  // fill in your serial port name here
let data;
let xPos = 0;                           // x position of the graph
let circleSize = 10;

 
function setup() {
  createCanvas(windowWidth ,windowHeight);
  background(0x08, 0x16, 0x40);

  serial = new p5.SerialPort();       // make a new instance of the serialport library
  serial.on('list', printList);  // set a callback function for the serialport list event
  serial.on('connected', serverConnected); // callback for connecting to the server
  serial.on('open', portOpen);        // callback for the port opening
  serial.on('data', serialEvent);     // callback for when new data arrives
  serial.on('error', serialError);    // callback for errors
  serial.on('close', portClose);      // callback for the port closing
 
serial.list();                      // list the serial ports
  serial.open(portName);              // open a serial port
}
//
function draw() {
//   background(0x08, 0x16, 0x40);

//   fill(255);
//   noStroke();
//   ellipse(width/2,height/2,circleSize,circleSize);
  graphData(data);
  consoleData();
} 

// get the list of ports:
function printList(portList) {
  // portList is an array of serial port names
  for (let i = 0; i < portList.length; i++) {
    // Display the list the console:
    console.log(i + portList[i]);
  }
}

function serverConnected() {
  console.log('connected to server.');
}
 
function portOpen() {
  console.log('the serial port opened.')
}
 
function serialEvent() {
  data = serial.read();
  // console.log(data);
 
  circleSize = data;
}
 
function serialError(err) {
  console.log('Something went wrong with the serial port. ' + err);
}
 
function portClose() {
  console.log('The serial port closed.');
}

function graphData(newData) {
    
  // map the range of the input to the window height:
  var yPos = map(newData, 0, 255, 0, height);
  // draw the line in a pretty color:
  stroke(0xA8, 0xD9, 0xA7);
  line(xPos, height, xPos, height - yPos);
  // at the edge of the screen, go back to the beginning:
  if (xPos >= width) {
    xPos = 0;
    // clear the screen by resetting the background:
    background(0x08, 0x16, 0x40);
  } else {
    // increment the horizontal position for the next reading:
    xPos++;
  }
}

function consoleData(){
  fill(0);
   text("sensor value: " + data, 30, 30);
}