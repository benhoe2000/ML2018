//This section list the required libraries
var express = require("express");
//Create an instance of express server
var app = express();
// import body parser
var bodyParser = require("body-parser");
app.use(bodyParser.json());

const functions = require('firebase-functions');

app.post('/fulfillment', functions.https.onRequest((request, response) => {
	const agent = new WebhookClient({ request, response });
	 function welcome(agent) {
	  agent.add(`Welcome to my agent in Heroku!`);
	  agent.add(new Card({
		  title: `This is Agent in Heroku`,
		  imageUrl: 'http://weknowyourdreams.com/images/robot/robot-02.jpg',
		  text: `I am here to serve you.\nPlease free to ask me anything! 💁`,
		  buttonText: 'Click Me to know more about me!',
		  buttonUrl: 'https://assistant.google.com/'
		})
	  );
	}
}	
function fallback(agent) {
	agent.add(`I didn't understand`);
	agent.add(`I'm sorry, can you try again?`);
  }


