var fs = require('fs');
var fileName = process.argv[2];

var buffer = fs.readFileSync( fileName );

var str = buffer.toString();
var x = str.split('\n');

console.log( x.length - 1 );
