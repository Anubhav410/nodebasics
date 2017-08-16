var mongo = require('mongodb');
var mongoClientUrl = "mongodb://localhost:27017/smallcasedb";

mongo.MongoClient.connect(  mongoClientUrl , function(err , db){
		
	db.collection('stocks').drop();
	db.collection('trades').drop();

	console.log('Adding stocks');

	db.collection('stocks').insert( [ { name : 'reliance' } , { name : 'hdfcbank' } ] , function( err , data ){
		if( err != null ){
			console.log( err );
			db.close();
			return;
		}

		console.log( data );
	});


	console.log( 'Adding trades for reliance' );
	db.collection('trades').insert( [ { 
										stockName : 'reliance' ,
										type 	  : 'buy',
										quantity  : '100',
										price     : '900',
										date      : '2015-04-10'
									   },
									   { 
										stockName : 'reliance' ,
										type 	  : 'sell',
										quantity  : '50',
										price     : '1000',
										date      : '2015-05-10'
									   },
									   { 
										stockName : 'reliance' ,
										type 	  : 'buy',
										quantity  : '100',
										price     : '850',
										date      : '2015-06-10'
									   } ] , function(err , data){

									   			if( err != null ){
													console.log( err );
													db.close();
													return;
												}
												console.log( data );

									   } );

	console.log( 'Adding trades for hdfcbank' );
	db.collection('trades').insert( [ { 
										stockName : 'hdfcbank' ,
										type 	  : 'buy',
										quantity  : '200',
										price     : '1000',
										date      : '2015-05-11'
									   },
									   { 
										stockName : 'hdfcbank' ,
										type 	  : 'sell',
										quantity  : '100',
										price     : '800',
										date      : '2015-07-12'
									   }
									   ] , function(err , data){

									   			if( err != null ){
													console.log( err );
													db.close();
													return;
												}
												console.log( data );

									   } );


	db.close();
	console.log('Init Db Complete');

});