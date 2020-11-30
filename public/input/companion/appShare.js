let namePrompt;

window.addEventListener('load', function() {
    //alert name box
    myFunction()

    console.log(namePrompt)

    if (namePrompt) {
        header = document.getElementById("heading-name");
        header.innerHTML = namePrompt + "'s" + "&nbsp";
        controlName = document.getElementById("control-center-name")
        controlName.innerHTML = "&nbsp" + namePrompt + "'s";
    }

    //initialize socket
    let socket = io();

    let notesBox = document.getElementById('notes-box-msgs');
    //Listen for messages named 'msg' from the server
    socket.on('notesMsg', function(data) {

        console.log("Message arrived!");
        console.log(data);

        console.log(data.notes)

        //Create a message string and page element
        let recievedNote = data.name + "<br><br>" + data.lifeform + "<br><br>" + data.notes;
        let notesEl = document.createElement('p');
        notesEl.classList.add("notesBoxMsgs");
        notesEl.innerHTML = recievedNote;

        //Add the element with the message to the page
        notesBox.appendChild(notesEl);
        //Add a bit of auto scroll for the chat box
        notesBox.scrollTop = notesBox.scrollHeight;
    });


    //reference to the Notes Box, Button and Input

    let notesButton = document.getElementById('notes-button');
    let notesInput = document.getElementById('note-input');
    let lifeformInput = document.getElementById('lifeForm-input');

    //get button working
    notesButton.addEventListener('click', function() {
        let lifeForm = lifeformInput.value;
        let notesMsg = notesInput.value;
        let notesObj = {
            "name": namePrompt,
            "lifeform": lifeForm,
            "notes": notesMsg
        };

        console.log('button clicked')

        console.log(notesInput.value)

        // send the notes message object to the server
        socket.emit('notesMsg', notesObj);
    });
})

//alert box
function myFunction() {
    namePrompt = window.prompt('Astrobiologist Name');
}