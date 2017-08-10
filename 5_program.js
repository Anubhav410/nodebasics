var fs = require('fs');

fs.readdir( process.argv[2] , function( err , files ){

	files.forEach( function( e , i ){
		var split = e.split('.');
		if( split.length > 1 ){
			if( split[1] == process.argv[3] ){
				console.log( e );
			}

		}
		
	} );

} );