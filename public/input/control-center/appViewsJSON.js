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
let launchBtn = document.getElementById('go-audio');
let audio17 = new Audio('./audio/apollo.mp3');
let audio18 = new Audio('./audio/alarm.mp3');
alarmButton.style.display = 'none';
sleepButton.style.display = 'none';
closeButton.style.display = 'none';
hyperSleepBtn.style.display = 'none';




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
    audio3.play();
})

//if true and the user is the "host", display the button, otherwise, don't.
socket.on('authentication', function(data) {
    if (data === true) {
        viewsBtn.style.display = 'inline-block';
        alarmButton.style.display = 'inline-block';
        sleepButton.style.display = 'inline-block';
        hyperSleepBtn.style.display = 'inline-block';
        closeButton.style.display = 'inline-block';
        launchBtn.style.display = 'inline-block';
       
      
    }
});

function renderImage(views, count) {


    console.log(count);
    missionBox.innerHTML = "<p><b>" + views[count].stage + "</b><br /><br />"

    if (views[count].video) {
        missionBox.innerHTML = `  <iframe class="video" width="420" height="315" src=${views[count].video}> </iframe>`
        audio2.play();
    }
     else if (views[count].isSpace) {
         const spaceFrame = document.createElement('iframe');
        //  const frameDoc = spaceFrame.contentDocument;
        //  const script = document.createElement('script');
        //  script.type = 'text/javascript';
        //  script.src = './threeTest/space.js';
        //  frameDoc.body.append(script);
         missionBox.innerHTML = '<iframe class="space-frame" src="/input/space.html" scrolling="no"></iframe>';
         audio2.pause();
     
    }else if(views[count].hypersleep){
        missionBox.style.backgroundColor = "black";

    } else if(views[count].wormhole){
        missionBox.innerHTML = '<iframe class="space-frame" src="/input/wormhole/wormhole.html" scrolling="no"></iframe>';
    } else if(views[count].Utu){
        missionBox.innerHTML = '<iframe class="space-frame" src="/input/SpacecraftTest/index.html" scrolling="no"></iframe>';
    }
        else if (views[count].danger) {git
        missionBox.innerHTML = `  <img class="my-img" src=${ views[count].danger}>`
            // audio19.play();
        socket.emit('danger', {
            audio3
        });
    } else {
        missionBox.innerHTML = `<img class="my-img" src=${ views[count].link}> `
        audio2.pause();
        audio2.currentTime = 0

    }
}

window.addEventListener('load', function() {
    //fetch data set
    fetch("./json/views.json")
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

    socket.on('sleepEmit', function(data) {
        if (data) {
            document.getElementById("myNav").style.width = data.isSleeping ? "100%" : "0%";
        }
    });

    socket.on('audio17Obj', function(data) {
        if (data) {
            audio17.play();
        }
    })

    launchBtn.addEventListener('click', function() {
        audio17.play();

        let audio17Obj = {
            "audio10": audio17
        }
        socket.emit('audio17Obj', audio17Obj);
    });

    hyperSleepBtn.addEventListener('click', function(){
        document.getElementById("myNav").style.width = "100%";
        socket.emit('sleepEmit', {
            isSleeping: true
        });
    });

    closeButton.addEventListener('click', function(){
        document.getElementById("myNav").style.width = "0%";
        socket.emit('sleepEmit', {
            isSleeping: false
        });
    });



})

