var http = require('http');

var one = '';
var two = '';
var three = '';

var callbacks_returned = 0;

http.get(process.argv[2], function(res) {
	var str = '';
	res.on('data' , function(r){
		one += r.toString();
	}).on('end' , function(){
		callbacks_returned++;
		if( callbacks_returned == 3 ){
			console.log( one );
			console.log( two );
			console.log( three );
		}
	});

	
});

http.get(process.argv[3], function(res) {
	res.on('data' , function(r){
		two += r.toString();
	}).on('end' , function(){
		callbacks_returned++;
		if( callbacks_returned == 3 ){
			console.log( one );
			console.log( two );
			console.log( three );
		}
	});

	
})

http.get(process.argv[4], function(res) {
	res.on('data' , function(r){
		three += r.toString();
	}).on('end' , function(){
		callbacks_returned++;
		if( callbacks_returned == 3 ){
			console.log( one );
			console.log( two );
			console.log( three );
		}
	});

	
})