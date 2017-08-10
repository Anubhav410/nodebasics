var http = require('http');

http.get(process.argv[2], function(res) {
	var count = 0;
	var str = '';
	res.on('data' , function(r){
		str += r.toString();
		count += r.toString().length;
	}).on('end' , function(){
		console.log( count );
		console.log( str );
	});

	
})