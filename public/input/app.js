// var playerName = prompt('Enter the name you want to register for playing?');
// while (!playerName) {
//     playerName = prompt('Enter the name you want to register for playing?');
// }
window.addEventListener('load', function() {



    const urlParams = new URLSearchParams(window.location.search);
    const password = urlParams.get('password');
    const nextStepBtn = document.getElementById('mission-button');
    // nextStepBtn.style.display = 'none';
    // var socketId = null;

    //Open and connect socket
    let socket = io();
    //Listen for confirmation of connection
    socket.on('connect', function() {
        // console.log("Connected with socketId: " + socket.id);
        // socketId = socket.id;
        // check to see if password is correct and send the password authentication to the server
        if (password) {
            socket.emit('authentication', { password });
        }
    });
    //listen for the boolean from the server
    socket.on('authentication', function(data) {
        //if true and the user is the "host", display the button, otherwise don't
        if (data === true) {
            nextStepBtn.style.display = 'inline-block';
        }
    });

    /* --- Code to RECEIVE a socket message from the server ---  Chat box interaction*/
    let chatBox = document.getElementById('chat-box-msgs');

    //Listen for messages named 'msg' from the server
    socket.on('msg', function(data) {
        console.log("Message arrived!");
        console.log(data);

        //Create a message string and page element
        let receivedMsg = data.name + ": " + data.msg;
        let msgEl = document.createElement('p');
        msgEl.innerHTML = receivedMsg;

        //Add the element with the message to the page
        chatBox.appendChild(msgEl);
        //Add a bit of auto scroll for the chat box
        chatBox.scrollTop = chatBox.scrollHeight;
    });

    /* --- Code to SEND a socket message to the Server ---  */
    let nameInput = document.getElementById('name-input')
    let msgInput = document.getElementById('msg-input');
    let sendButton = document.getElementById('send-button');

    sendButton.addEventListener('click', function() {
        let curName = nameInput.value;
        let curMsg = msgInput.value;
        let msgObj = { "name": curName, "msg": curMsg };


        // send the message object to the server
        socket.emit('msg', msgObj);
    });







})