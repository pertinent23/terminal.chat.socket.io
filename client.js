const socket = require( "socket.io-client" );
let username;

module.exports = ( terminal ) => {
    const io = socket.io( "ws://localhost:3000" );

        console.log( "" );
        io.on( 'connect', () => {

            console.log( '>>> Conntected' );
            terminal.question( ">>> Quel est votre username? ", ( data ) => {
                username = data;
                console.log( ">>> Entrer un message et valider sur entrer: " );
                terminal.write( ">>> " );

                io.on( 'message', ( data ) => {
                    console.log( `@${data.username}: ${data.message}` );
                    terminal.write( ">>> " );
                } );
            } );

            terminal.on( 'line', ( line ) => {
                terminal.write( ">>> " );
                io.emit( 'message', {
                    username, 
                    message: line
                } );
            } );
        } );
    
        io.on( 'connect_error', () => {
            console.log( ">>> Failed to connect to the server." );
        } );

    return io;
};