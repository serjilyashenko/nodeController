var port = 6000;
var host = "192.168.0.77";

var dgram = require('dgram');
// var message = new Buffer("Hello UDP Server :)");

// Creating hdl telegram
var senderIp = new Buffer([192,168,0,102]);
var hdlMiracle = new Buffer("HDLMIRACLE");
// data over rs485
var leaderCode = [0xaa, 0xaa];
var hdlTelegram = leaderCode.concat([0xbb, 0xbb]);
hdlBuffer = new Buffer(hdlTelegram);

console.log(Buffer.concat([senderIp, hdlMiracle, hdlBuffer]));

var client = dgram.createSocket('udp4');
// client.send(message, 0 , message.length, port, host, function(err, bytes){
// 	if (err) throw err;
// 	console.log("UDP message sent to " + host + ":" + port);
// 	client.close();
// } );