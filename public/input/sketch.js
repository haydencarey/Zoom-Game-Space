function setup() {

    console.log("setup")
    createCanvas(window.innerWidth * .90, window.innerHeight);
    document.getElementById("defaultCanvas0").style.width = "90%";
    // let button = createButton("Reset");
    // button.mousePressed(resetSketch);
    background(200);
    let w = width / 3,
        h = height / 3;
    for (let x = 0; x < 20; x++) {
        for (let y = 0; y < 20; y++) {

            fill('black');
            textSize(15);
            text('CapCom Hayden', width / 6, height / 40);
            textAlign(CENTER, CENTER);

            textSize(15);
            text('Biologist 2', width / 2, height / 40);
            textAlign(CENTER, CENTER);

            textSize(15);
            text('Biologist 3', width / 1.2, height / 40);
            textAlign(CENTER, CENTER);

            textSize(15);
            text('Biologist 4', width / 6, height / 2.8);
            textAlign(CENTER, CENTER);

            textSize(15);
            text('Biologist 5', width / 2, height / 2.8);
            textAlign(CENTER, CENTER);

            textSize(15);
            text('Biologist 6', width / 1.2, height / 2.8);
            textAlign(CENTER, CENTER);

            textSize(15);
            text('Biologist 7', width / 6, height / 1.45);
            textAlign(CENTER, CENTER);

            textSize(15);
            text('Biologist 8', width / 2, height / 1.45);
            textAlign(CENTER, CENTER);

            textSize(15);
            text('Biologist 9', width / 1.2, height / 1.45);
            textAlign(CENTER, CENTER);

            fill(255);
            rect(x * w, y * h, w, h);
        }

    }

    //listen for messages named 'data' from the server
    socket.on('data', function(mousePos) {
        console.log(mousePos);
        noStroke();
        fill(0);
        ellipse(mousePos.x, mousePos.y, 5, 5);
    })
}

function mouseDragged() {
    console.log('sending' + mouseX + ',' + mouseY)
        // grab the mouse position
    let mousePos = {
        x: mouseX,
        y: mouseY
    }
    noStroke();
    fill(0);
    ellipse(mouseX, mouseY, 5, 5);

    socket.emit('data', mousePos)

}

function resetSketch() {

    console.log("setup")
    createCanvas(window.innerWidth, window.innerHeight);
    // let button = createButton("Reset");
    // button.mousePressed(resetSketch);
    background(200);
    let w = width / 3,
        h = height / 3;
    for (let x = 0; x < 20; x++) {
        for (let y = 0; y < 20; y++) {

            fill('blue');
            textSize(15);
            text('CapCom Hayden', width / 6, height / 40);
            textAlign(CENTER, CENTER);

            textSize(15);
            text('Hello', width / 2, height / 40);
            textAlign(CENTER, CENTER);

            textSize(15);
            text('Biologist 3', width / 1.2, height / 40);
            textAlign(CENTER, CENTER);

            textSize(15);
            text('Biologist 4', width / 6, height / 2.8);
            textAlign(CENTER, CENTER);

            textSize(15);
            text('Biologist 5', width / 2, height / 2.8);
            textAlign(CENTER, CENTER);

            textSize(15);
            text('Biologist 6', width / 1.2, height / 2.8);
            textAlign(CENTER, CENTER);

            textSize(15);
            text('Biologist 7', width / 6, height / 1.45);
            textAlign(CENTER, CENTER);

            textSize(15);
            text('Biologist 8', width / 2, height / 1.45);
            textAlign(CENTER, CENTER);

            textSize(15);
            text('Biologist 9', width / 1.2, height / 1.45);
            textAlign(CENTER, CENTER);

            fill(255);
            stroke(0);
            rect(x * w, y * h, w, h);
        }

    }

    //listen for messages named 'data' from the server
    socket.on('data', function(mousePos) {
        console.log(mousePos);
        noStroke();
        fill(0);
        ellipse(mousePos.x, mousePos.y, 5, 5);
    })
}

function draw() {

}