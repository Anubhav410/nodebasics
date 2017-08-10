var fs = require('fs');
var path = require('path');

module.exports = function( dirName , extension , callback ){
	
	fs.readdir(  dirName , dirCallback );

	var res = [];
	extension = '.' + extension;
	function dirCallback( err , data ){

		if( err ){
			return callback( err );
		}
		data.forEach( function( e , i ){
			if(path.extname( e ) === extension){
				res.push( e );
			}
		} );

		callback( null , res );

	}
}

