var mongo = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/learnyoumongo";

mongo.connect( url , function(err, db){

	db.collection('prices').aggregate([
	{ $match : { size : (process.argv[2])} },
	{ $group : {
			_id : 'avg',
			avg :{
			$avg : '$price'
			}
		}}
	]).toArray( function(e,d){
		console.log( Number(d[0]['avg']).toFixed(2))
	} ); 

	db.close();

} );
