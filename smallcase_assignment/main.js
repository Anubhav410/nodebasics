var express = require('express');
var mongo = require('mongodb');
var mongoClientUrl = "mongodb://localhost:27017/smallcasedb";
var bodyparser = require('body-parser');

var app = express();

app.use( bodyparser.urlencoded( {extended : false} ) );

app.get('/portfolio/' , connectDB ,function( req, res ){

	var db = req.db;
	//read all the one portfolio in the collection and throw it back
	var stocks = db.collection('stocks').find();

	var result = "";

	stocks.forEach( function( e , i ){

		var temp = { "name" : e.name };
		var trade_info = [];
		var trades = db.collection('trades')
					   .find( { "stock_id" : "598efdefcfac228d368625ec" } )
					   .forEach( function( data ){
							trade_info.push( { "count" : data.count } );
						});
	} );
	

});


app.post( "/portfolio/addTrade" , connectDB  ,function( req , res ){

	/* to add a trade, you send the stock_id, the quantity , price , date and type(buy/sell) */
	// console.log( req.body.str );

	var trade = { 
					"stockId" : req.body.stockId,
					"quantity" : req.body.quantity,
					"price" : req.body.price,
					"type" : req.body.type,
					"date" : req.body.date
				 }
	req.db.collection('trades').insert( trade , function( err , data ){
		console.log( JSON.stringify(err) );
		if( err != null ){
			res.end( JSON.stringify(data.err) );
		}else{
			res.end( JSON.stringify(data.result) );
		}
	} );	


} );

app.post( "/portfolio/updateTrade" , connectDB  ,function( req , res ){

	/* send the tradeId,  and the body wil have the params to be updated */
	var newVal = {};
	if( req.body.quantity ){
		newVal['quantity'] = req.body.quantity;
	}
	if( req.body.price ){
		newVal['price'] = req.body.price;
	}
	if( req.body.date ){
		newVal['date'] = req.body.date;
	}
	if( req.body.type ){
		newVal['type'] = req.body.type;
	}

	console.log( req.body );

	req.db.collection('trades').update( { _id : mongo.ObjectID(req.body.tradeId) } , { $set :  newVal } , function( err , data ){
		
		if( err != null ){
			res.end( JSON.stringify(err) );
		}else{
			res.end( JSON.stringify(data) );
		}
	} );	


} );

app.post( "/portfolio/removeTrade" , connectDB  ,function( req , res ){
	req.db.collection('trades').remove( { _id : mongo.ObjectID(req.body.tradeId) } , { $set :  newVal } , function( err , data ){
		
		if( err != null ){
			res.end( JSON.stringify(err) );
		}else{
			res.end( JSON.stringify(data) );
		}
	} );	


} );


app.listen( 3000 );



/*
	will read and add the right DB object to the request object
*/
function connectDB( req, res,  next ){
	console.log( "Database Adding Middleware" );
	mongo.MongoClient.connect(  mongoClientUrl , function(err , db){
		req.db = db;
		next();
	});
}