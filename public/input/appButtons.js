let audio = new Audio('missile.mp3');
let i;
let txt;
let speed;

window.addEventListener('load', function() {

    let dataButton = document.getElementById("data-button")
    i = 0;
    txt = '111000 launch: 5:45 UTC 101111100 projected arrival: 08:48 001000001 pi=pf 111001010111 Uragan-K 15L10011111000011101001110 T+51:06 11111101010000000001 fuel chamber: LOX/Kerosene 001001101001111110 HJ-1A and HJ-1B 111110100110101 mv=(m−dmg)(v+dv)+dmg(v−u) 0101110001101101110 SAOCOM 1B 1001110 mv=mv+mdv−dmgv−dgd+dmgv−dmgu 10101101010 STS-51-F1 010011001 419 x 22,440 km x 55 degree transfer orbit00100110mdv=dmgdv+dmgv1001111110 ';
    speed = 10;

    dataButton.addEventListener('click', function() {
        console.log('data button clicked')
        typeWriter()



    })


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
        socket.emit('audioObj', audioObj);
    })

})

function typeWriter() {
    if (i < txt.length) {
        document.getElementById("data-box").innerHTML += txt.charAt(i);
        i++;
        speed = 10;
        setTimeout(typeWriter, speed);
    }
    if (i == txt.length) {
        return;
    }


}