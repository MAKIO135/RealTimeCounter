var express = require( 'express' )
var app = express(), 
	server = require( 'http' ).createServer( app );

// Access server through port 3700
server.listen( 3700 );

// Set '/public' as the static folder. Any files there will be directly sent to the viewer
app.use( express.static( __dirname + '/public' ) );

// Set index.html as the base file
app.get( '/', function ( req, res ) {
	res.sendFile( __dirname + '/index.html' );
});

var io = require( 'socket.io' ).listen( server );
var count = 0;
io.sockets.on( 'connection' , function ( socket ) {
	socket.emit( 'setCounter', { count: count } );

	socket.on( 'add', function(data){
		count ++;
		io.sockets.emit( 'setCounter', { count: count } );
	});

	socket.on( 'sub', function(data){
		count --;
		io.sockets.emit( 'setCounter', { count: count } );
	});
});