var port = 6000;
var host = "192.168.0.77";

var dgram = require('dgram');
// var message = new Buffer("Hello UDP Server :)");
var message = new Buffer("Hello UDP Server :)");

var client = dgram.createSocket('udp4');
client.send(message, 0 , message.length, port, host, function(err, bytes){
	if (err) throw err;
	console.log("UDP message sent to " + host + ":" + port);
	client.close();
} );