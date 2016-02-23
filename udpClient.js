var crc16 = require('crc').crc16xmodem;
var dgram = require('dgram');

// var message = new Buffer("Hello UDP Server :)");

// Creating hdl telegram
var senderIp = new Buffer([192,168,0,102]);	//перевести localhost
var hdlMiracle = new Buffer("HDLMIRACLE");
// data over rs485
var leaderCode = [0xaa, 0xaa];
var sizeOfData = 11;	//without data
var senderSubnet = 0xfd;
var senderId = 0xfe;
var deviceType = [0xff, 0xfe];
var command = [0x00, 0x31];
var targetSubnet = 1;
var tatgetId = 55;
var data = [3, 100, 0, 0];

// var leaderCode = [0xaa, 0xaa];
// var sizeOfData = 11;	//without data
// var senderSubnet = 0x01;
// var senderId = 0x64;
// var deviceType = [0x00, 0x00];
// var command = [0x00, 0x02];
// var targetSubnet = 1;
// var tatgetId = 2;
// var data = [1, 1];

// —борка hdl телеграммы
sizeOfData += data.length;
var hdlTelegram = Array.prototype.concat(sizeOfData, senderSubnet, senderId, deviceType, command, targetSubnet,tatgetId,data);
var crc = new Buffer(crc16(hdlTelegram).toString(16),'hex');

hdlTelegram = Array.prototype.concat(leaderCode, hdlTelegram);
hdlBuffer = new Buffer(hdlTelegram);

hdlBuffer = Buffer.concat([hdlBuffer, crc]);
// console.log(hdlBuffer);

// —борка hdl-ip телеграммы
var hdlIpMessage = Buffer.concat([senderIp, hdlMiracle, hdlBuffer])
console.log(hdlIpMessage);


// ќтправка телеграммы
var port = 6000;
var host = "192.168.0.77";

var client = dgram.createSocket('udp4');
client.send(hdlIpMessage, 0 , hdlIpMessage.length, port, host, function(err, bytes){
	if (err) throw err;
	// console.log("UDP message sent to " + host + ":" + port);
	console.log("massage send");
	client.close();
} );
