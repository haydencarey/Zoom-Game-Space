var ship;
var asteroids = [];
var lasers = [];
let x;
let audio3 = new Audio('alien.mp3');


//create socket connection
//check if other people are there ( i need to get initial number)
// on connection let other totalplayers=2=0
//on connection how many sockets are connected

function setup() {
    createCanvas(580, 403);
    ship = new Ship();
    x = 5;
    for (var i = 0; i < x; i++) {
        asteroids.push(new Asteroid());
    }
}

function draw() {
    background(0);


    for (var i = 0; i < asteroids.length; i++) {
        if (ship.hits(asteroids[i])) {
            console.log('ooops!');
            // asteroids.push(new Asteroid());
            // audio3.play();



        }
        asteroids[i].render();
        asteroids[i].update();
        asteroids[i].edges();
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

    ship.render();
    ship.turn();
    ship.update();
    ship.edges();


}

function keyReleased() {
    ship.setRotation(0);
    ship.boosting(false);
}

function keyPressed() {
    if (key == ' ') {
        lasers.push(new Laser(ship.pos, ship.heading));
    } else if (keyCode == 68) {
        ship.setRotation(0.1);
    } else if (keyCode == 65) {
        ship.setRotation(-0.1);
    } else if (keyCode == 87) {
        ship.boosting(true);
    }
}