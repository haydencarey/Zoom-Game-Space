let express = require('express');
let app = express();
let bodyParser = require('body-parser');
app.use(bodyParser.json());

let p5Sketches = [];

let fs = require("fs");
const Datastore = require('nedb');

app.use('/', express.static('public'));
let Stopwatch = require('./public/input/companion/timer.js');

//Initialize the actual HTTP server
let http = require('http');
let server = http.createServer(app);
let port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log("Server listening at port: " + port);
});

//db initial code
const database = new Datastore('p5.db');
database.loadDatabase();



//set the host password
let adminPassword = '1234';

//Initialize socket.io
let io = require('socket.io').listen(server);


let watch = new Stopwatch(io);

// add a route on server, that is lstening to a post request
app.post('/p5sketch', (req, res) => {
    console.log(req.body);
    let currentDate = Date();
    let p5Obj = {
        name: req.body.name,
        date: currentDate,
        sketch: req.body.uri
    }
    // insert sketch data into database
    database.insert(p5Obj, (err, newDocs) => {
        if (err) {
            res.json({ task: "failed" });
        } else {
            res.json({ task: "success" });
        }
    })

    p5Sketches.push(p5Obj);
    console.log(p5Sketches);
    // res.json({ task: "success" });
})



// add route to get all the sketches
app.get('/getSketches', (req, res) => {
    // database.find({}, (err, docs) => {
    //     if (err) {
    //         res.json({ task: "failed" });
    //     } else {
    //         let obj = { data: docs }
    //         res.json(obj);
    //     }
    // })
    let obj = { data: p5Sketches }
    res.json(obj);
})



//Listen for individual clients/users to connect
io.sockets.on('connection', function (socket) {
    console.log("We have a new client: " + socket.id);
    let connectedUsersCount = Object.keys(io.sockets.sockets).length;

    let currentShips = connectedUsersCount;
    console.log(currentShips);
    //send back to client to tell them what number ship they are
    socket.emit('shipNum', { ships: currentShips });
    // tell everybody else what ship they are
    socket.broadcast.emit('otherShipNum', { ships: currentShips });
    //assign each id a ship number




    //Listen for password authentication from the client
    socket.on('authentication', function (obj) {
        if (obj.password === adminPassword) {
            console.log('User ' + socket.id + ' advertised as admin!');
            //emit a boolean true back to the client
            io.to(socket.id).emit('authentication', true);
        }
    });

    socket.on('rotationPos', function (obj) {
        socket.broadcast.emit('rotationPos', { obj });
    })
    socket.on('rotationNeg', function (obj) {
        socket.broadcast.emit('rotationNeg', { obj });
    })
    socket.on('boost', function (obj) {
        socket.broadcast.emit('boost', { obj });
    })
    socket.on('rotationStop', function (obj) {
        socket.broadcast.emit('rotationStop', { obj });
    })
    socket.on('boostStop', function (obj) {
        socket.broadcast.emit('boostStop', { obj });
    })
    

    //Listen for a message named 'msg' from this client
    socket.on('msg', function (data) {
        //Data can be numbers, strings, objects
        console.log("Received a 'msg' event");
        console.log(data);

        //Send a response to all clients, including this one
        io.sockets.emit('msg', data);

    });
    //Listen for a message named 'msg' from this client
    socket.on('name', function (data) {
        //Data can be numbers, strings, objects
        console.log("Received a 'msg' event");
        console.log(data);



        //Send a response to all clients, including this one
        io.sockets.emit('name', data);
    });
    //the audio buttons

socket.on('sketchMsg', function(data){
    console.log(data);
    io.sockets.emit('sketchMsg', data);
})

    //listening for audioObh from the client
    socket.on('audioObj', function (data) {
        //Send audio response to all clients, including this one
        io.sockets.emit('audioObj', data);

    })

    //listening for audio4Obh from the client
    socket.on('audio4Obj', function (data) {
        //Send audio response to all clients, including this one
        io.sockets.emit('audio4Obj', data);

    })
    socket.on('audio5Obj', function (data) {
        //Send audio response to all clients, including this one
        io.sockets.emit('audio5Obj', data);

    })
    socket.on('audio6Obj', function (data) {
        //Send audio response to all clients, including this one
        io.sockets.emit('audio6Obj', data);
    })
    socket.on('audio7Obj', function (data) {
        //Send audio response to all clients, including this one
        io.sockets.emit('audio7Obj', data);
    })
    socket.on('audio8Obj', function (data) {
        //Send audio response to all clients, including this one
        io.sockets.emit('audio8Obj', data);
    })
    socket.on('audio9Obj', function (data) {
        //Send audio response to all clients, including this one
        io.sockets.emit('audio9Obj', data);
    })
    socket.on('audio10Obj', function (data) {
        //Send audio response to all clients, including this one
        io.sockets.emit('audio10Obj', data);
    })
    socket.on('audio11Obj', function (data) {
        //Send audio response to all clients, including this one
        io.sockets.emit('audio11Obj', data);
    })
    socket.on('audio12Obj', function (data) {
        //Send audio response to all clients, including this one
        io.sockets.emit('audio12Obj', data);
    })

    socket.on('audio17Obj', function (data) {
        //Send audio response to all clients, including this one
        io.sockets.emit('audio17Obj', data);
    })
    socket.on('audio18Obj', function (data) {
        //Send audio response to all clients, including this one
        io.sockets.emit('audio18Obj', data);
    })
    socket.on('audioSObj', function (data) {
        //Send audio response to all clients, including this one
        io.sockets.emit('audioSObj', data);
    })

    socket.on('danger', function (data) {
        //Send audio response to all clients, including this one
        io.sockets.emit('danger', data);
    })

    socket.on('sleepEmit', function (data) {
        console.log(data);

        //Send audio response to all clients, including this one
        io.sockets.emit('sleepEmit', data);
    })


    //Listen for a message named 'notesMsg' from this client
    socket.on('notesMsg', function (data) {
        //Data can be numbers, strings, objects
        console.log("Received a 'notesMsg' event");
        console.log(data);

        //Send a response to all clients, including this one
        io.sockets.emit('notesMsg', data);

    });


    //Listen for a message named 'data' from this client
    socket.on('data', function (data) {
        //Data can be numbers, strings, objects
        let dataString = JSON.stringify(data)
        console.log("Received: 'data' " + dataString);

        //insert p5 sketch into database
        database.insert(dataString, (err, newDocs) => {
            console.log("new document inserted")
        })

        //Send the data to all clients, including this one
        //Set the name of the message to be 'data'
        io.sockets.emit('data', data);
    });


    //Listen for a message named 'next_step' from this client
    socket.on('next_step', function (obj) {
        // check to see if the password equals the authentication password
        if (obj.password === adminPassword) {
            //if these match up, emit obj.count to the clients
            io.sockets.emit('next_step', obj);
        }
    });

    //Listen for a message named 'next_step_view' from this client
    socket.on('next_step_view', function (obj) {
        // check to see if the password equals the authentication password
        console.log(obj);
        if (obj.password === adminPassword) {
            //if these match up, emit obj.count to the clients
            io.sockets.emit('next_step_view', obj.count);
            // io.sockets.emit('next_step_view', obj.audio2);
        }
    });

    socket.on('game-started', function (obj) {
        console.log('game-started', obj)

        io.emit('start', { id: 23 });
    })

    socket.on('data-button', function (obj) {
        console.log('game-started', obj)

        io.emit('buttonPressed', { id: 23 });
    })

    socket.on('startTimer', function () {
        console.log("Start Timer");
        watch.start();
    });

    socket.on('stopTimer', function () {
        console.log("Stop Timer");
        watch.stop();
    });

    socket.on('resetTimer', function () {
        console.log("Reset Timer");
        watch.reset();
    });

    //Listen for this client to disconnect
    socket.on('disconnect', function () {
        console.log("A client has disconnected: " + socket.id);
    });
})