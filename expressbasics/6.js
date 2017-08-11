var express = require('express');
var app = express();

app.put("/message/:ID" , function( req,res ){
	console.log( req.params.ID );
	var tohash =  new Date().toDateString() + req.params.ID ;
	var result = require('crypto')
      .createHash('sha1')
      .update( tohash )
      .digest('hex')


	res.end( result );

});

app.listen( process.argv[2] );