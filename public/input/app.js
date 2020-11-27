window.addEventListener('load', function() {


    //create url paramter
    let urlParams = new URLSearchParams(window.location.search);
    let password = urlParams.get('password');
    let nextStepBtn = document.getElementById('mission-button');
    let launchBtn = document.getElementById('go-audio');
    let audio17 = new Audio('./audio/apollo.mp3');
    // nextStepBtn.style.display = 'none';
    // var socketId = null;

    //Open and connect socket
    let socket = io();
    socket.on('audio17Obj', function(data) {
            if (data) {
                audio17.play();
            }
        })
        //Listen for confirmation of connection
    socket.on('connect', function() {

        // check to see if password is inputted and send the password authentication to the server
        if (password) {
            socket.emit('authentication', { password });
        }
    });
    //listen for the boolean from the server
    socket.on('authentication', function(data) {
        //if true and the user is the "host", display the button, otherwise don't
        if (data === true) {
            nextStepBtn.style.display = 'inline-block';
            launchBtn.style.display = 'inline-block';
        }
    });



    /* --- Code to RECEIVE a socket message from the server ---  Chat box interaction*/
    let chatBox = document.getElementById('chat-box-msgs');

    //Listen for messages named 'msg' from the server
    socket.on('msg', function(data) {
        console.log("Message arrived!");
        console.log(data);

        //Create a message string and page element
        let receivedMsg = data.name + ":" + "<br>" + data.msg;
        let msgEl = document.createElement('p');
        msgEl.innerHTML = receivedMsg;

        //Add the element with the message to the page
        chatBox.appendChild(msgEl);
        //Add a bit of auto scroll for the chat box
        chatBox.scrollTop = chatBox.scrollHeight;
    });

    /* --- Code to SEND a socket message to the Server ---  */
    // let nameInput = document.getElementById('name-input')
    let msgInput = document.getElementById('msg-input');
    let sendButton = document.getElementById('send-button');

    sendButton.addEventListener('click', function() {
        // let curName = nameInput.value;
        let curMsg = msgInput.value;
        let msgObj = {
            "name": namePrompt,
            "msg": curMsg
        };


        // send the message object to the server
        socket.emit('msg', msgObj);
    });


    launchBtn.addEventListener('click', function() {
        audio17.play();

        let audio17Obj = {
            "audio10": audio17
        }
        socket.emit('audio17Obj', audio17Obj);
    })





})