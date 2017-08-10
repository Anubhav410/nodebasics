var http = require('http');
var map = require('through2-map');
var qs = require('querystring');


var server = http.createServer( function( req,res ){

	var body='';
            req.on('data', function (data) {
                body +=data;
            });
            req.on('end',function(){
                res.write( body.toUpperCase() );
                res.end();
            });
} );

server.listen( process.argv[2] );