

// --- INIT DEPENDENCIES
let express = require('express'),
    app = express(),
    path = require('path');

// --
let http = require('http').Server(app);
let io = require('socket.io')(http);
//Définition du routeur
var router = express.Router();

app.use('/', express.static("public"));

// ------------------------
// ROUTE
// ------------------------
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'./public/game.html'))

});

// ------------------------
//
// ------------------------
io.on('connection', function(socket){

    console.log('a user connected');

    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

    socket.on('message', function(message){
        console.log(message);
        io.emit('cool', message);
    });

    socket.broadcast.emit('hi');

});

// ------------------------
// START SERVER
// ------------------------
//Définition et mise en place du port d'écoute
var port = 8008;
app.listen(port, () => console.log(`Listening on port ${port}`));
