var x = process.argv;
var i = 0 ; 
var sum = 0 ; 
if ( x.length > 2 ){
  
	for( i = 2 ; i < x.length ; i++){
		sum += parseInt(x[i]);
	}

}

console.log(sum);

