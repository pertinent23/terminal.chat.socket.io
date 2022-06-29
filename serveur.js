const express = require( "express" );
const app = express();
const http = require( "http" );
const server = http.createServer( app );
const socket = require( "socket.io" );
const io = new socket.Server( server );

let counter = 0;

app.get( "/", ( req, res ) => {
    res.send( "<h1> My First Serveur in NODE JS </h1>" );
} );

function showConnected() {
    console.log( `>>> ${counter} user(s) connected.` );  
    console.log( ">>> Waiting for connection..." );
};

io.on( 'connection', ( socket ) => {
    counter++;
    socket.emit( 'message', {
        message: 'Welcome',
        username: '{SERVER}'
    } );

    socket.broadcast.emit( 'message',  {
        username: '{SERVER}',
        message: `New user connected`
    } );

    socket.on( 'message', ( data ) => {
        console.log( `@${data.username}: ${data.message}` );
        socket.broadcast.emit( 'message', data );
    } );

    socket.on( 'disconnect', () => {
        counter--;
        showConnected();
    } );
    showConnected();
} );

module.exports = () => {
    console.log( "" );
    console.log( ">>> Serveur is starting..." );
    server.listen( 3000, () => {
        console.log( ">>> Listening on: ", 3000 );
        showConnected();
    } );
    return server;
};