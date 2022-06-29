const server = require( "./serveur" );
const client = require( "./client" );
const readline = require( "readline" );
const terminal = readline.createInterface( process.stdin, process.stdout );
let current = null;

console.log( ">>> Bienvenue dans notre chat" );
console.log( ">>> Que voulez-vous faire?" );
console.log( "" );
console.log( ">>> 1) Créer un serveur." );
console.log( ">>> 2) Vous connecter au serveur." );

terminal.question( ">>> [1/2] : ", ( response ) => {
    terminal.pause();
    if ( response === '1' ) {
        current = server();
    } else {
        current = client( terminal );
    }
} );

terminal.on( 'SIGINT', () => {
    current.close();
    terminal.close();

    console.log( ">>>" );
    console.log( ">>>" );
    console.log( ">>> Connetion close" );
    process.exit( 0 );
} );