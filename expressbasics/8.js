var express = require('express');
var fs = require('fs')
var app = express();

var bookName = process.argv[3];
var port = process.argv[2];

app.get('/books',function(req,res){

	fs.readFile( bookName , function( err, data ){
		res.json( JSON.parse(data.toString()) );
	} );

});


app.listen( port );