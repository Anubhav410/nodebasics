var mongo = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/learnyoumongo";

mongo.connect( url , function(err, db){

	db.collection('parrots').count( { age : { $gt : Number(process.argv[2]) } } , function( err , d ){

		console.log( d );
	} ); 

	db.close();

} );
