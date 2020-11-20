let audio = new Audio('missile.mp3');
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
            // muted = "muted"
        }
    })

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
})

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
    typeWriter();
    console.log('socket connected')

})