let prompts = [];

//reference to the Mission Details Box
let missionBox = document.getElementById('mission-box-msgs');
let sendButton = document.getElementById('mission-button');
let count = 0;
const urlParams = new URLSearchParams(window.location.search);
const password = urlParams.get('password');

let socket = io();

function nextStep(prompts, count) {
    missionBox.innerHTML = "<p ><b>" + prompts[count].stage + "</b><br /><br />" +
        prompts[count].name + "<br /><br />" + prompts[count].info + "</p>";
}

window.addEventListener('load', function() {
    //fetch data set
    fetch("prompts.json")
        .then(response => response.json())
        .then(data => {
            console.log(data);
            prompts = data;
            sendButton.addEventListener('click', function() {
                console.log('mission button clicked.')
                    // let msgh2 = missionBox.createElement('h2');
                    // msgh2.innerHTML = (prompts[count].stage);
                    // missionBox.appendChild(msgh2);
                    // let msgh3 = missionBox.createElement('h3');
                    // msgh3.innerHTML = (prompts[count].name);
                    // chatBox.appendChild(msgEl);


                //send the user's password and count to the server in an object
                socket.emit('next_step', {
                    password,
                    count
                });
            });
            //listen to message from the server and execute nextStep function
            socket.on('next_step', function(cnt) {

                nextStep(prompts, cnt);
                count++;
                if (count == prompts.length) {
                    count = 0;
                }
            });



        });
})