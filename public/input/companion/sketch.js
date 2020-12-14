let c = "black";
let mousePos ;

function setup() {
// console.log(namePrompt);
    console.log("setup")
    createCanvas(window.innerWidth * .50, window.innerHeight * .50 );
    // document.getElementById("defaultCanvas0").style.width = "75%";
    //Get the saved name
    // let name = localStorage.getItem('name');
    // let button = createButton("Reset");
    // button.mousePressed(resetSketch);

    let x = document.createElement("Button");
    x.setAttribute("id", "click-me");
    let t = document.createTextNode("click me");
    x.appendChild(t);
    document.body.appendChild(x);

    background(200);
  
    // for (let x = 0; x < 20; x++) {
    //     for (let y = 0; y < 20; y++) {

            // fill('black');
            // textSize(30);
            // text(name, width / 2, height / 20);
            // textAlign(CENTER, CENTER);

            // textSize(15);
            // text('Julia', width / 2, height / 40);
            // textAlign(CENTER, CENTER);


        
        // }


        background(255);
  	noStroke();
  //draw the first button
  fill("#ba1e68");
  rect(0, 0, 40, 40);

  //draw the second button
  fill("#191970");
  rect(40, 0, 40, 40);
  //draw the third button
  fill("#145051");
  rect(80, 0, 40, 40);
  print(mouseX, mouseY);
  
   //draw the fourth button
  fill("#7649fe");
  rect(120, 0, 40, 40);
  print(mouseX, mouseY);
  //draw the fifth button

    }
//listen for the message named "data" from the server
    socket.on('data', function(mousePos) {
        console.log(mousePos);
        strokeWeight(5);
            stroke(mousePos['stroke']);
            
        line(mousePos.x, mousePos.y,  mousePos.xPos,  mousePos.yPos);
    })

    //listen for messages named 'data' from the server
    // socket.on('data', function(mousePos) {
    //     console.log(mousePos);
    //     noStroke();
    //     fill(0);
    //     ellipse(mousePos.x, mousePos.y, 5, 5);
    // })
// }

function mouseDragged(){
    
   
    if (mouseIsPressed) {
        strokeWeight(5);
            stroke(c);
            
        line(mouseX, mouseY, pmouseX, pmouseY);

        console.log('sending' + mouseX + ',' + mouseY)
        // grab the mouse position
    let mousePos = {
        x: mouseX,
        y: mouseY,
        strokeWeight: 1,
        stroke: c,
        xPos: pmouseX,
        yPos: pmouseY
    }
    // var socket = io.connect('http://localhost');
    
        
     socket.emit('data', mousePos)
      }
    
       
    
}

function mousePressed() {
  
    if (mouseX > 0 && mouseX < 40 && mouseY > 0 && mouseY < 40) {
        //set the variables to random values
        c = "#ba1e68";
      }
      if (mouseX > 40 && mouseX < 80 && mouseY > 0 && mouseY < 40) {
        //set the variables to random values
        c = "#191970";
      }
      if (mouseX > 80 && mouseX < 120 && mouseY > 0 && mouseY < 40) {
        //set the variables to random values
        c = "#145051";
      }
       if (mouseX > 120 && mouseX < 160 && mouseY > 0 && mouseY < 40) {
        //set the variables to random values
        c = "#7649fe";
      }
    socket.emit('data', mousePos)

}


// function draw() {

// }