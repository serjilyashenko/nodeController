var port = 6000;
var host = "192.168.0.77";

var dgram = require('dgram');
var server = dgram.createSocket('udp4');

server.on("listening", function(){
	var address = server.address();
	console.log("!> UDP Server listening on  " + address.address + ":" + address.port);
} );

console.log("!> udp server created! All OK:)");

server.on("message", function(message, remote){
	// console.log(remote.address + ":" + remote.port + " - " + message);
	// console.log(message.toString("hex"));
	console.log(message[0] + "." + message[1] + "." + message[2] + "." + message[3]);	// IP sender
	console.log(message.slice(4,14).toString());										// magic header
	// console.log(message.slice(14));													// hdl protocol
	console.log("   Leader Code: " + message.slice(14,16).toString('hex'));
	console.log("     Data size: " + message[16]);
	console.log(" Sender subnet: " + message[17]);
	console.log("     Sender id: " + message[18]);
	console.log("   Device type: " + message.slice(19,21).toString('hex'));
	console.log("       Command: " + message.slice(21,23).toString('hex'));
	console.log(" Target subnet: " + message[23]);
	console.log("     Target id: " + message[24]);
	console.log("    Data + CRC: " + message.slice(24).toString('hex'));
	console.log("          Data: " + message.slice(24, (message.length - 2)).toString('hex'));
	console.log("           CRC: " + message.slice((message.length - 2), message.length).toString('hex'));
	console.log();
});

server.bind(port);