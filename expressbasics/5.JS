var express = require('express');
var stylus = require('stylus');

var app = express();
app.use( express.static( 'public' ) );
app.use( stylus.middleware( 'public' ) );
app.listen( process.argv[2] );