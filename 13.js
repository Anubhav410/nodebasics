var http = require('http');
var url = require('url');
var querystring = require('querystring');

var server = http.createServer( function(req , res){
	var finalurl = url.parse(req.url );
	var query =  querystring.parse(finalurl.query);

	res.writeHead(200, { 'Content-Type': 'application/json' })

	var date = query['iso'] ;
	date = new Date( date );

	if( finalurl.pathname == '/api/parsetime' ){
		
		 result = { 
				"hour": date.getHours(),  
       			"minute": date.getMinutes(),  
       			"second": date.getSeconds()
		 };

	}else if( finalurl.pathname == '/api/unixtime' ){

	  result = {
	  		'unixtime' :date.getTime()
	  	}

	}
	res.end( JSON.stringify( result ) );

} );

server.listen( process.argv[2] );