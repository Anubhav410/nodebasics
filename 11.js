var fs = require('fs');
var http = require('http');

var server = http.createServer( function(req,res){
	var stream = fs.createReadStream( process.argv[3] );

	stream.pipe( res );
	

} );
server.listen( process.argv[2] );
