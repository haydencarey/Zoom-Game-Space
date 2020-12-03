let audio = new Audio('./audio/missile.mp3');
let audio4 = new Audio('./audio/door.mp3');
let audio5 = new Audio('./audio/beep.mp3');
let audio6 = new Audio('./audio/whoosh.mp3');
let audio7 = new Audio('./audio/kepler.mp3');
let audio8 = new Audio('./audio/saturn.mp3');
let audio9 = new Audio('./audio/houston.mp3');
let audio10 = new Audio('./audio/sputnik.mp3');
let audio11 = new Audio('./audio/cudi.mp3');
let audio12 = new Audio('./audio/tone.mp3');
let audio13 = new Audio('./audio/bowie.mp3');
let audio14 = new Audio('./audio/cudi.mp3');
let audio15 = new Audio('./audio/070.mp3');
let audio16 = new Audio('./audio/beach.mp3');
let audioS = new Audio('./audio/seperation.mp3');
let i;
let txt;
let speed;
let dataButton;

window.addEventListener('load', function() {

    dataButton = document.getElementById("data-button")
    i = 0;
    txt = '111000 launch: 5:45 UTC 101111100 projected arrival: 08:48 001000001 pi=pf 111001010111 Uragan-K 15L10011111000011101001110 T+51:06 11111101010000000001 fuel chamber: LOX/Kerosene 001001101001111110 HJ-1A and HJ-1B 111110100110101 mv=(m−dmg)(v+dv)+dmg(v−u) 0101110001101101110 SAOCOM 1B 1001110 mv=mv+mdv−dmgv−dgd+dmgv−dmgu 10101101010 STS-51-F1 010011001 419 x 22,440 km x 55 degree transfer orbit00100110mdv=dmgdv+dmgv1001111110 ';


    dataButton.addEventListener('click', function() {
        //call back typerwiter animation

        socket.emit('data-button', 'game-id');
    })


    // listen for audioObj from the client
    socket.on('audioObj', function(data) {
        if (data) {
            audio.play();
        }
    })

    socket.on('audioSObj', function(data) {
        if (data) {
            audioS.play();
        }
    })

    // listen for audio4Obj from the client
    socket.on('audio4Obj', function(data) {
            if (data) {
                audio4.play();
            }
        })
        // listen for audio4Obj from the client
    socket.on('audio5Obj', function(data) {
        if (data) {
            audio5.play();
        }
    })
    socket.on('audio6Obj', function(data) {
        if (data) {
            audio6.play();
        }
    })
    socket.on('audio7Obj', function(data) {
        if (data) {
            audio7.play();
        }
    })
    socket.on('audio8Obj', function(data) {
        if (data) {
            audio8.play();
        }
    })
    socket.on('audio9Obj', function(data) {
        if (data) {
            audio9.play();
        }
    })
    socket.on('audio10Obj', function(data) {
        if (data) {
            audio10.play();
        }
    })
    socket.on('audio11Obj', function(data) {
        if (data) {
            audio11.play();
        }
    })
    socket.on('audio12Obj', function(data) {
        if (data) {
            audio12.play();
        }
    })

    //buttons
    let rocketButton = document.getElementById("moon-button")
    rocketButton.addEventListener('click', function() {
        audio.play();

        // audio = audio.play();

        let audioObj = {
            "audio": audio
        }

        //send audioObj to the server
        socket.emit('audioObj', audioObj);
    })

    let seperationButton = document.getElementById("seperation-button")
    seperationButton.addEventListener('click', function() {
        audioS.play();

        // audio = audio.play();

        let audioSObj = {
            "audioS": audioS
        }

        //send audioObj to the server
        socket.emit('audioSObj', audioSObj);
    })



    let audioButton1 = document.getElementById("buttonRoom1")
    buttonRoom1.addEventListener('click', function() {
        audio4.play();

        let audio4Obj = {
                "audio1": audio4
            }
            //send audio4Obj to the server
        socket.emit('audio4Obj', audio4Obj);
    })

    let audioButton2 = document.getElementById("buttonRoom2")
    buttonRoom2.addEventListener('click', function() {
        audio5.play();

        let audio5Obj = {
                "audio2": audio5
            }
            //send audio4Obj to the server
        socket.emit('audio5Obj', audio5Obj);
    })

    let audioButton3 = document.getElementById("buttonRoom3")
    buttonRoom3.addEventListener('click', function() {
        audio6.play();

        let audio6Obj = {
            "audio3": audio6
        }
        socket.emit('audio6Obj', audio6Obj);
    })
    let audioButton4 = document.getElementById("buttonRoom4")
    buttonRoom4.addEventListener('click', function() {
        audio7.play();

        let audio7Obj = {
            "audio4": audio7
        }
        socket.emit('audio7Obj', audio7Obj);
    })
    let audioButton5 = document.getElementById("buttonRoom5")
    buttonRoom5.addEventListener('click', function() {
        audio8.play();

        let audio8Obj = {
            "audio5": audio8
        }
        socket.emit('audio8Obj', audio8Obj);
    })
    let audioButton6 = document.getElementById("buttonRoom6")
    buttonRoom6.addEventListener('click', function() {
        audio9.play();

        let audio9Obj = {
            "audio6": audio9
        }
        socket.emit('audio9Obj', audio9Obj);
    })
    let audioButton7 = document.getElementById("buttonRoom7")
    buttonRoom7.addEventListener('click', function() {
        audio10.play();

        let audio10Obj = {
            "audio7": audio10
        }
        socket.emit('audio10Obj', audio10Obj);
    })
    let audioButton8 = document.getElementById("buttonRoom8")
    buttonRoom8.addEventListener('click', function() {
        audio11.play();

        let audio11Obj = {
            "audio8": audio11
        }
        socket.emit('audio11Obj', audio11Obj);
    })
    let audioButton9 = document.getElementById("buttonRoom9")
    buttonRoom9.addEventListener('click', function() {
        audio12.play();

        let audio12Obj = {
            "audio9": audio12
        }
        socket.emit('audio12Obj', audio12Obj);
    })


    //switches

})

//sliders 

// to be continued

// let slider1 = document.getElementById("slider1");

// slider1.addEventListener('change', function() {
//     // now compare:
//     if (slider1 > 0 && slider1 < 250) {
//         audio13.play();
//         console.log("1")
//     } else if (slider1 > 250 && slider1 < 500) {
//         audio14.play();
//         console.log("2")
//     } else if (slider1 > 500 && slider1 < 750) {
//         // audio15.play();
//         console.log("3")
//     } else if (slider1 > 750 && slider1 < 1000) {
//         // audio16.play();
//         console.log("4")
//     }
// })








//typewriter animation
let write = true;

function typeWriter() {

    if (i < txt.length) {
        document.getElementById("data-box").innerHTML += txt.charAt(i);
        i++;
        speed = 50;
        setTimeout(typeWriter, speed);
    }

    if (i >= txt.length) {
        console.log('done');

        document.getElementById("data-box").innerHTML = ""
        i = 0
    }
}

socket.on('connect', function() {
    // console.log("Connected with socketId: " + socket.id);
    // socketId = socket.id;
    // check to see if password is correct and send the password authentication to the server
    if (password) {
        socket.emit('authentication', { password });
    }
});

//if true and the user is the "host", display the button, otherwise, don't.
socket.on('authentication', function(data) {
    setTimeout(() => {

        if (data === true) {
            dataButton.style.display = 'inline-block';
        }
    }, 1000)
});

socket.on('buttonPressed', (gameId) => {
    typeWriter()
    console.log('socket connected')

})