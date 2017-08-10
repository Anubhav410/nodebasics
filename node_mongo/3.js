var mongo = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/learnyoumongo";

mongo.connect( url , function(err, db){

	var doc = { 'firstName' : process.argv[2] , 'lastName' : process.argv[3] } ;
	db.collection('docs').insert( doc  );
	console.log( JSON.stringify(doc) );

	db.close();
} );
