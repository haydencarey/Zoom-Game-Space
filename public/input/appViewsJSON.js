let views = [];
const singleView = {}
let missionBox = document.getElementById('views-box');
let nextStepBtn = document.getElementById('views-button');
nextStepBtn.style.display = 'none';
let count = 0;
const urlParams = new URLSearchParams(window.location.search);
const password = urlParams.get('password');
let audio2 = new Audio('falcon.mp3');

let socket = io();

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
    if (data === true) {
        nextStepBtn.style.display = 'inline-block';
    }
});

function renderImage(views, count) {

    missionBox.innerHTML = "<p><b>" + views[count].stage + "</b><br /><br />"

    if (views[count].video) {
        missionBox.innerHTML = `  <iframe class="video" width="420" height="315" src=${views[count].video}> </iframe>`
        audio2.play();
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
                            count
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
                socket.on('next_step_view', function(cnt) {

                    renderImage(views, cnt);
                    count++;
                    if (count == views.length) {
                        count = 0;
                    }
                });
            }

        });

})