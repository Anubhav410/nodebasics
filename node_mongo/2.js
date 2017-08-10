var mongo = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/learnyoumongo";

mongo.connect( url , function(err, db){

	db.collection('parrots').find( { age : { $gt : Number(process.argv[2]) } } , { 'age' : 1 , 'name' :1 , '_id' :0 }  ).toArray( function(d1,d){console.log(d)} );

	db.close();

} );
