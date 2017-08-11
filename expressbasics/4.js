var express = require('express');
var bodyparser = require('body-parser');

var app = express();
app.use( bodyparser.urlencoded( {extended : false} ) );

app.post('/form', function( req,res ){
	var str = req.body.str;
	res.end( str.toString().split('').reverse().join('') );

});


app.listen( process.argv[2] );