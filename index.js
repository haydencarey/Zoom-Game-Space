let express = require('express');
let app = express();
app.use('/', express.static('public'));

//Initialize the actual HTTP server
let http = require('http');
let server = http.createServer(app);
let port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log("Server listening at port: " + port);
});

//set the host password
let adminPassword = '1234';

//Initialize socket.io
let io = require('socket.io').listen(server);

//Listen for individual clients/users to connect
io.sockets.on('connection', function(socket) {
    console.log("We have a new client: " + socket.id);


    //Listen for password authentication from the client
    socket.on('authentication', function(obj) {
        if (obj.password === adminPassword) {
            console.log('User ' + socket.id + ' advertised as admin!');
            //emit a boolean true back to the client
            io.to(socket.id).emit('authentication', true);
        }
    });

    //Listen for a message named 'msg' from this client
    socket.on('msg', function(data) {
        //Data can be numbers, strings, objects
        console.log("Received a 'msg' event");
        console.log(data);

        //Send a response to all clients, including this one
        io.sockets.emit('msg', data);

    });
    //listening for audioObh from the client
    socket.on('audioObj', function(data) {
        console.log("Received a 'audioObj' event");
        console.log(data);
        //Send audio response to all clients, including this one
        io.sockets.emit('audioObj', data);

    })

    //Listen for a message named 'notesMsg' from this client
    socket.on('notesMsg', function(data) {
        //Data can be numbers, strings, objects
        console.log("Received a 'notesMsg' event");
        console.log(data);

        //Send a response to all clients, including this one
        io.sockets.emit('notesMsg', data);

    });


    //Listen for a message named 'data' from this client
    socket.on('data', function(data) {
        //Data can be numbers, strings, objects
        console.log("Received: 'data' " + data);

        //Send the data to all clients, including this one
        //Set the name of the message to be 'data'
        io.sockets.emit('data', data);
    });

    //Listen for a message named 'next_step' from this client
    socket.on('next_step', function(obj) {
        // check to see if the password equals the authentication password
        if (obj.password === adminPassword) {
            //if these match up, emit obj.count to the clients
            io.sockets.emit('next_step', obj.count);
        }
    });
    //Listen for a message named 'next_step_view' from this client
    socket.on('next_step_view', function(obj) {
        // check to see if the password equals the authentication password
        if (obj.password === adminPassword) {
            //if these match up, emit obj.count to the clients
            io.sockets.emit('next_step_view', obj.count);
        }
    });

    socket.on('game-started', function(obj) {
        console.log('game-started', obj)

        io.emit('start', { id: 23 });
    })

    socket.on('data-button', function(obj) {
        console.log('game-started', obj)

        io.emit('buttonPressed', { id: 23 });
    })

    //Listen for this client to disconnect
    socket.on('disconnect', function() {
        console.log("A client has disconnected: " + socket.id);
    });
})