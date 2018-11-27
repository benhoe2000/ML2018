// imports the express library
var express = require("express");
// intanstiate express object
var app = express();
// import body parser
var bodyParser = require("body-parser");
app.use(bodyParser.json());

// first rout
app.get("/",function(req,res){
	 console.log('root route');
	 res.send("<h1>Im responding with a message");
});
// http://localhost/currency/SGD/USD
// new route which will make an http request to Fixer IO
app.get("/currency/:amount/:fromcurr/:tocurr",function(req,res){
	  console.log('currency route was done');
	  // import the request library
	  var request = require('request');
	  // read our parameters in route
	  var fromC = req.params.fromcurr.toUpperCase();
	  var toC = req.params.tocurr.toUpperCase();
	  var amount = req.params.amount;
	  request("http://data.fixer.io/api/latest?access_key=6f58c045f2f0f9ae28985f8c8643e12e&base=EUR&symbols=" + fromC + "," + toC,
	  	function(error,response,body){
	  	// callback wll be triggered once the api responds back with
	  	// json
	  	       console.log('body ' + body);
	  	       // convert the body string to an javascript object
	  	       var obj = JSON.parse(body);
	  	       // parse float casts to a floating point
	  	       // ensure its a number
	  	       var rate1 = parseFloat(obj.rates[fromC]); 
	  	       var rate2 = parseFloat(obj.rates[toC]);
	  	       console.log('rate1 ' + rate1);
	  	       console.log('rate2 ' + rate2);
	  	       var total = parseFloat(amount) * parseFloat(rate2)/parseFloat(rate1);
	  	       // 10000= SGD is equal to 700 USD
	  	       var s = amount + fromC + " is equala to " + total.toFixed(4) + " " + toC;
	  	       console.log('statuscode ' + response.statusCode);
	  			console.log('request was made');
	  			// JSON.stringify ensures the object is converted to a string
	  			 res.send(JSON.stringify({result:s}));
	  }); // end of the request block
	//  console.log('fromc ' + fromC + 'toC' + toC + 'amount ' + amount);

	 
}) // end of currency route

 // create the post route for dialog flow
 app.post("/ai",function(req,res){
 	  // import the request library
	var request = require('request');
 	var response =  "this is a test";
 	 // this is taken from dialogflows output based on the entities
 	var amount = req.body.queryResult.parameters.amount;
 	var toCurr = req.body.queryResult.parameters.toC;
 	var fromCurr = req.body.queryResult.parameters.fromC;
 	console.log('toCurr' + toCurr);
 	console.log('fromCurr' + fromCurr);
 	

 	 request("https://dmitcurrencyapp.herokuapp.com/currency/" + amount + "/" + fromCurr + "/" + toCurr,
 	 	function(error,response,body){
 	 		    console.log("callback");
 	 			var obj = JSON.parse(body);
 	  			res.send(JSON.stringify({fulfillmentText:obj.result}));	
 	 	})
 	 
 })



// listens at the port
var listener = app.listen(process.env.PORT,process.env.IP,function(){
	console.log('starting the server');
	console.log('port is ' + listener.address().port);
})
