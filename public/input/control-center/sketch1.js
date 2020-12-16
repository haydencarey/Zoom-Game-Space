var ship;
var ship2;
var asteroids = [];
var lasers = [];
let x;
let audio3 = new Audio('./audio/alien.mp3');
// const urlParams = new URLSearchParams(window.location.search);
// const password = urlParams.get('password');
let asteroidButton;
let audio19 = new Audio('./audio/danger.mp3');
let readyGo= false; 

let myShipNum;
let ships = [];

socket.on('shipNum', function (data) {
    console.log(data);
    myShipNum = data.ships - 1;
    console.log(myShipNum);
    readyGo = true;
})




//create socket connection
//check if other people are there ( i need to get initial number)
// on connection let other totalplayers=2=0
//on connection how many sockets are connected
let bgCol;
let sinVal;
let sinValRate;
let index;
let r;


let drawButton;
let drawThing;

function setup() {
    createCanvas(580, 403);

    for (let i = 0; i < (myShipNum+1); i++) {
        let currentShip = new Ship();
        ships.push(currentShip);
        console.log('ship made')
    }


socket.on('otherShipNum', function (data) {
    console.log(data);
    let currentShip = new Ship();
    ships.push(currentShip);
    console.log('another tab ship')
})


    // referencing a class and creating an object from that class



    x = 3;
    for (var i = 0; i < x; i++) {
        asteroids.push(new Asteroid());
    }


    drawButton = createButton('click me')
    drawButton.id('asteroid-button');
    drawButton.mouseClicked(function () {


        //drawThing = true;
        socket.emit('game-started', 'game-id')

    })
}

// function draw() {
//     drawButton.mouseClicked(function(e) {
//         asteroidGame();
//         console.log(e);
//     })
// }

function draw() {
    asteroidGame();
}

function asteroidGame() {


    fill('white');
    textSize(32);
    text('Auto Pilot Activated', 150, 200);
    if (drawThing) {
        background(0);
        textSize(20);
        text('Quick, use WASD to steer and SPACEBAR to fire!', 80, 400);
        fill(255);

        if (readyGo) {

            for (var i = 0; i < asteroids.length; i+=1) {

                if (ships[myShipNum].hits(asteroids[i])) {
                    // console.log('ooops!');
                    asteroids.push(new Asteroid());


                }
                asteroids[i].render();
                asteroids[i].update();
                asteroids[i].edges();
            }
            if (i > 10000) {

                noLoop();
                // document.getElementById("sub-container1").innerHTML = "now";


            }
            if (i > 400) {
                // audio3.play();
                audio3.play();

                background(0);
                i = 0;
                x = 0;
                pixelDensity(1);

                sinValRate = frameCount * 15;
                sinVal = sin(radians(sinValRate));
                bgCol = map(sinVal, -1, 1, 0, 150);

                loadPixels();
                for (x = 0; x < width; x++) {
                    for (y = 0; y < height; y++) {
                        index = (x + y * width) * 4;
                        r = random(255);
                        pixels[index + 0] = r;
                        pixels[index + 1] = r;
                        pixels[index + 2] = r;
                        pixels[index + 3] = 255;
                    }
                }
                updatePixels();

                background(bgCol);


            }





            for (var i = lasers.length - 1; i >= 0; i--) {
                lasers[i].render();
                lasers[i].update();
                if (lasers[i].offscreen()) {
                    lasers.splice(i, 1);
                } else {
                    for (var j = asteroids.length - 1; j >= 0; j--) {
                        if (lasers[i].hits(asteroids[j])) {
                            if (asteroids[j].r > 10) {
                                var newAsteroids = asteroids[j].breakup();
                                asteroids = asteroids.concat(newAsteroids);
                            }
                            asteroids.splice(j, 1);
                            lasers.splice(i, 1);
                            break;
                        }
                    }
                }
            }

            console.log(lasers.length);

            ships[myShipNum].render();
            ships[myShipNum].turn();
            ships[myShipNum].update();
            ships[myShipNum].edges();


            for (let i = 0; i < ships.length; i++) {
                if (i !== myShipNum) {
                    ships[i].render();
                    ships[i].turn();
                    ships[i].update();
                    ships[i].edges();
                }

                // ship2.render();
                // ship2.turn();
                // ship2.update();
                // ship2.edges();

                //do this for all four ships
            }

        }
    }

}


// function draw() {



// }

function keyReleased() {
    ships[myShipNum].setRotation(0);
    socket.emit('rotationStop', { num: myShipNum });
    ships[myShipNum].boosting(false);
    socket.emit('boostStop', { num: myShipNum });
}

// three instances of emit:
function keyPressed() {
if (readyGo){
    if (key == ' ') {
        lasers.push(new Laser(ships[myShipNum].pos, ships[myShipNum].heading));
    } else if (keyCode == 68) {
        ships[myShipNum].setRotation(0.1);
        //emit ship.rotation
        socket.emit('rotationPos', { num: myShipNum });
    } else if (keyCode == 65) {
        ships[myShipNum].setRotation(-0.1);
        socket.emit('rotationNeg', { num: myShipNum });
        //emit ship.rotation
    } else if (keyCode == 87) {
        ships[myShipNum].boosting(true);
        socket.emit('boost', { num: myShipNum });
    }

}

//two more emits

}


//Listen for confirmation of connection
socket.on('connect', function () {
    // console.log("Connected with socketId: " + socket.id);
    // socketId = socket.id;
    // check to see if password is correct and send the password authentication to the server
    if (password) {
        socket.emit('authentication', { password });
    }
});


socket.on('start', (gameId) => {
    drawThing = true;
    console.log('socket connected')

})


socket.on('authentication', function (data) {
    setTimeout(() => {
        asteroidButton = document.getElementById('asteroid-button');
        console.log("asteroidButton ", asteroidButton)
        if (data === true) {
            asteroidButton.style.display = 'flex';
        }
    }, 1000)
});


socket.on('rotationPos', function (data) {
    console.log(data);
    ships[data.num].setRotation(0.1);
})


socket.on('rotationNeg', function (data) {
    console.log(data);
    ships[data.num].setRotation(-0.1);
})


socket.on('boost', function (data) {
    console.log(data);
    ships[data.num].boosting(true);
})

socket.on('rotationStop', function (data) {
    console.log(data);
    ships[data.num].setRotation(0);
})
socket.on('boostStop', function (data) {
    console.log(data);
    ships[data.num].boosting(false);
})



