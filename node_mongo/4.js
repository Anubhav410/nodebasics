var mongo = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/" + process.argv[2];

mongo.connect( url , function(err, db){

	db.collection('users').update( { name : 'Tina'} , { $set :{ age : 40 } } , function(err , d){
		console.log(d);
	} );
	console.log( JSON.stringify(doc) );

	db.close();
} );
