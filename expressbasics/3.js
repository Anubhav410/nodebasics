var express = require('express');
var app = express();
var path = require('path');
var pug = require('pug');

app.set('views' , process.argv[3]);
app.set('view engine' , 'pug');

app.get('/home' ,  function( req,res ){

	res.render( 'index' , { date : new Date().toDateString() } );

});

app.listen( process.argv[2] );