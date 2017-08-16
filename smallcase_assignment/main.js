var express = require('express');
var mongo = require('mongodb');
var mongoClientUrl = "mongodb://localhost:27017/smallcasedb";
var bodyparser = require('body-parser');

var app = express();

app.use( bodyparser.urlencoded( {extended : false} ) );

app.get('/portfolio/' , connectDB ,function( req, res ){
	var db = req.db;
	//get all the trades, as it has all the basic info we need
	db.collection("trades").find().toArray().then( function( tradeInfo ){
		var result = sortTrades( tradeInfo );
		res.end( JSON.stringify(result) );
	} ).catch(err => {
	    console.error(err);
	    return err; 
  	});

	/*	stocks.toArray().then( function( data ){
			//here you have both the stocks, now you get the list of trades for these guys
			var all_promises = [];
			for( var i = 0 ; i < data.length ; i++ ){
				all_promises.push(
					db.collection("trades").find( { stockId : data[i]._id.toString() } ).toArray().then( function( trade ){
						return {
							stockName : "aniuasiunb",
							trades : JSON.stringify(trade)

						}
				} 
				));
			}
			Promise.all( all_promises ).then( function( data ){
				var all_trades = data;
				console.log(data);
			} );

		} ).then(function(){
			console.log("final done");
		});
	*/
});

app.get('/portfolio/holdings' , connectDB ,function( req, res ){
	var db = req.db;
	//get all the trades, as it has all the basic info we need
	db.collection("trades").find().toArray().then( function( tradeInfo ){
		var allTrades = sortTrades( tradeInfo );
		var result = {};
		for( let key in allTrades ){
			var trades = allTrades[key];
			//now loop through the trades, to calculate the average buying price

			var totalShares = 0;
			var finalTotalPrice = 0;
			var totalBuyShares = 0;

			for( var  i = 0; i < trades.length ; i++ ){
				var price = parseInt( trades[i]['price'] );
				var quantity = parseInt( trades[i]['quantity'] );
				switch( trades[i]['type'] ){

					case 'buy' : 
						totalShares += quantity;
						totalBuyShares += quantity;
						finalTotalPrice += quantity * price;
					break;

					case 'sell' : 
						totalShares -= quantity;
					break;
				}
			}
			result[ key ] = {
				quantity : totalShares , 
				price    : finalTotalPrice/totalBuyShares
			}
		}

		res.end( JSON.stringify( result ) );

	} ).catch(err => {
	    console.error(err);
	    return err; 
  	});
});

app.get('/portfolio/returns' , connectDB ,function( req, res ){


});


app.post( "/portfolio/addTrade" , connectDB  ,function( req , res ){

	/* to add a trade, you send the stock_id, the quantity , price , date and type(buy/sell) */

	console.log('Adding trade');

	if( req.body.stockId ==  undefined || req.body.quantity == undefined || req.body.price ==  undefined || req.body.type == undefined || req.body.date == undefined  ){
		res.end('Bad params');
	}

	var trade = { 
					"stockName" : req.body.stockName,
					"quantity" : req.body.quantity,
					"price" : req.body.price,
					"type" : req.body.type,
					"date" : req.body.date
				 }
	req.db.collection('trades').insert( trade , function( err , data ){
		console.log( JSON.stringify(err) );
		if( err != null ){
			console.log("Error : " + err);
			res.end( JSON.stringify(data.err) );
		}else{
			console.log( "Trade Deleted : "  + JSON.stringify(data));
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

	if( req.body.tradeId == undefined || newVal.length == 0 ){
		res.end( 'Bad params' );
	}

	req.db.collection('trades').update( { _id : mongo.ObjectID(req.body.tradeId) } , { $set :  newVal } , function( err , data ){
		
		if( err != null ){
			console.log("Error : " + err);
			res.end( JSON.stringify(err) );
		}else{
			console.log( "Trade Deleted : "  + JSON.stringify(data));
			res.end( JSON.stringify(data) );
		}
	} );	


} );

app.post( "/portfolio/removeTrade" , connectDB  ,function( req , res ){
	console.log( "Deleteing trade : " +  req.body.tradeId);

	if( req.body.tradeId == undefined ){
		res.end( 'Bad params' );
	}

	req.db.collection('trades').remove( { _id : mongo.ObjectID(req.body.tradeId) } , function( err , data ){
		
		if( err != null ){
			console.log("Error : " + err);
			res.end( JSON.stringify(err) );
		}else{
			console.log( "Trade Deleted : "  + JSON.stringify(data));
			res.end( JSON.stringify(data) );
		}
	} );	


} );


app.listen( 3000 );


function sortTrades( allTrades ){
	var result = {};
	for( var i = 0 ; i < allTrades.length ; i++ ){
		data = allTrades[i];
		if( result[ data['stockName'] ] == undefined ){
			result[data['stockName']] = [];
		}

		var trade = {
			quantity : data['quantity'],
			price : data['price'],
			type : data['type'],
			date : data['date']
		}
		result[data['stockName']].push( trade );
	}
	return result;
}	


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