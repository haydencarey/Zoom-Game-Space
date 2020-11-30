window.addEventListener('load', function() {


    //create url paramter
    let urlParams = new URLSearchParams(window.location.search);
    let password = urlParams.get('password');
    let nextStepBtn = document.getElementById('mission-button');
  
    const toggleButton = document.getElementById('toggle');
    let resetButton = document.getElementById('reset');
    
    toggleButton.style.display = 'none';
    resetButton.style.display = 'none';
    // nextStepBtn.style.display = 'none';
    // var socketId = null;

    //Open and connect socket
    let socket = io();

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
           
            toggleButton.style.display = 'inline-block';
            resetButton.style.display = 'inline-block';
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

   
    let started = false;
    toggleButton.addEventListener('click', function() {
        if (!started) {
            socket.emit('startTimer');
            toggleButton.innerText = "Stop";
            started = true;
        } else {
            socket.emit('stopTimer');
            started = false;
            toggleButton.innerText = "Start";
        }
    });

    resetButton.addEventListener('click', function() {
        socket.emit('resetTimer');
    });

    socket.on('timeEvent', function(time) {
        if (started) {
            toggleButton.innerText = "Stop";
        }
        var timer = document.getElementById('timer');
        timer.innerText = time;
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


   
})