let views = [];
const singleView = {}
let missionBox = document.getElementById('views-box');
let viewsBtn = document.getElementById('views-button');
viewsBtn.style.display = 'none';
let count = 0;
const urlParams = new URLSearchParams(window.location.search);
const password = urlParams.get('password');
let audio2 = new Audio('./audio/falcon.mp3');
let alarmButton = document.getElementById('siren');
let sleepButton = document.getElementById('sleep');
let hyperSleepBtn = document.getElementById('hyperSleep');
let closeButton = document.getElementById('closeButton');
let audio18 = new Audio('./audio/alarm.mp3');
alarmButton.style.display = 'none';
sleepButton.style.display = 'none';
closeButton.style.display = 'none';
hyperSleepBtn.style.display = 'none';
let audio19 = new Audio('./audio/danger.mp3');

let socket = io();

socket.on('connect', function() {
    // console.log("Connected with socketId: " + socket.id);
    // socketId = socket.id;
    // check to see if password is correct and send the password authentication to the server
    if (password) {
        socket.emit('authentication', { password });
    }
});


// check siyan's code

socket.on('next_step_view', function(cnt) {

    console.log(cnt);
    renderImage(views, cnt);
    count++;
    if (count == views.length) {
        count = 0;
    }
});

socket.on('danger', function() {
    audio19.play();
})

//if true and the user is the "host", display the button, otherwise, don't.
socket.on('authentication', function(data) {
    if (data === true) {
        viewsBtn.style.display = 'inline-block';
        alarmButton.style.display = 'inline-block';
        sleepButton.style.display = 'inline-block';
        hyperSleepBtn.style.display = 'inline-block';
        closeButton.style.display = 'inline-block';
    }
});

function renderImage(views, count) {


    console.log(count);
    missionBox.innerHTML = "<p><b>" + views[count].stage + "</b><br /><br />"

    if (views[count].video) {
        missionBox.innerHTML = `  <iframe class="video" width="420" height="315" src=${views[count].video}> </iframe>`
        audio2.play();

    } else if (views[count].danger) {
        missionBox.innerHTML = `  <img class="my-img" src=${ views[count].danger}>`
            // audio19.play();
        socket.emit('danger', {
            audio19
        });
    } else {
        missionBox.innerHTML = `<img class="my-img" src=${ views[count].link}> `
        audio2.pause();
        audio2.currentTime = 0

    }
}

window.addEventListener('load', function() {
    //fetch data set
    fetch("views.json")
        .then(response => response.json())
        .then(data => {
            console.log(data);
            views = data;

            //reference to the Mission Details Box
            let viewsButton = document.getElementById('views-button');
            // let count = 0
            if (views) {
                viewsButton.addEventListener('click', function() {

                        //send the user's password and count to the server in an object
                        socket.emit('next_step_view', {
                            password,
                            count,
                            audio2,
                            audio19

                        });

                        console.log('mission button clicked.')


                        // let msgh2 = missionBox.createElement('h2');
                        // msgh2.innerHTML = (prompts[count].stage);
                        // missionBox.appendChild(msgh2);
                        // let msgh3 = missionBox.createElement('h3');
                        // msgh3.innerHTML = (prompts[count].name);
                        // chatBox.appendChild(msgEl);

                        // missionBox.innerHTML = "<p><b>" + prompts[count].stage + "</b><br /><br />" +
                        //     prompts[count].name + "<br /><br />" + prompts[count].info + "</p>";

                        // count++;
                        // if (count == prompts.length) {
                        //     count = 0;
                        // }

                        // console.log(prompts[0])

                    })
                    //listen to message from the server and execute renderData function

            }

        });

    socket.on('audio18Obj', function(data) {
        if (data) {
            audio18.play();
        }
    })

    alarmButton.addEventListener('click', function() {
        audio18.play();
        // audio18.loop();

        let audio18Obj = {
            "audio11": audio18
        }
        socket.emit('audio18Obj', audio18Obj);
    })

    //need help with this

    socket.on('audio18Obj', function(data) {
        if (data) {
            hyperSleepBtn.addEventListener('click', function(){
                document.getElementById("myNav").style.width = "100%";
            })
            closeButton.addEventListener('click', function(){
                document.getElementById("myNav").style.width = "0%";
            })
        }
    })
   
    hyperSleepBtn.addEventListener('click', function(){
        document.getElementById("myNav").style.width = "100%";
    })

    closeButton.addEventListener('click', function(){
        document.getElementById("myNav").style.width = "0%";
    })

    let sleepObj = {
        "sleepOn": "100%",
        "sleepOff": "0%"
    }
    socket.emit('sleepEmit', sleepObj);

})

