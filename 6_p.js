var mymod = require('./mymod.js');

mymod( process.argv[2] , process.argv[3] , mycallback )  ;

function mycallback( error , data ){
	data.forEach( function( e , i ){

		console.log( e );

	} );
}