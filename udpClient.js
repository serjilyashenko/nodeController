var crc16 = require('crc').crc16xmodem;
var dgram = require('dgram');

// var message = new Buffer("Hello UDP Server :)");

// Creating hdl telegram
var senderIp = new Buffer([192,168,0,102]);	//перевести localhost
var hdlMiracle = new Buffer("HDLMIRACLE");

// Отправка телеграммы
var port = 6000;
var host = "192.168.0.77";

module.exports = function(targetId, channel, lightValue){

	var client = dgram.createSocket('udp4');	// Открываем сокет

	// data over rs485
	var leaderCode = [0xaa, 0xaa];
	var sizeOfData = 11;	//without data
	var senderSubnet = 0xfd;
	var senderId = 0xfe;
	var deviceType = [0xff, 0xfe];
	var command = [0x00, 0x31];
	var targetSubnet = 1;
	var tatgetId = targetId;
	var data = [channel, lightValue, 0, 0];
	
	// Сборка hdl телеграммы
	sizeOfData += data.length;
	var hdlTelegram = Array.prototype.concat(sizeOfData, senderSubnet, senderId, deviceType, command, targetSubnet,tatgetId,data);
	var crc = ('0000' + crc16(hdlTelegram).toString(16)).slice(-4);
	// console.log(crc);
	var crc = new Buffer(crc,'hex');
	// console.log(crc);

	hdlTelegram = Array.prototype.concat(leaderCode, hdlTelegram);
	hdlBuffer = new Buffer(hdlTelegram);
	
	hdlBuffer = Buffer.concat([hdlBuffer, crc]);
	// console.log(hdlBuffer);
	
	// Сборка hdl-ip телеграммы
	var hdlIpMessage = Buffer.concat([senderIp, hdlMiracle, hdlBuffer])
	// console.log(hdlIpMessage);

	client.send(hdlIpMessage, 0 , hdlIpMessage.length, port, host, function(err, bytes){
		if (err) throw err;
		// console.log("UDP message sent to " + host + ":" + port);
		// console.log("massage send");
		client.close();		// Закрываем сокет
	} );
}