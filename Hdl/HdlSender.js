// HdlSender modul
var protocol = require('HdlSender.js');

// TODO: may be replace in other modules
var crc16 = require('crc').crc16xmodem;
var dgram = require('dgram');
var senderIp = new Buffer([192,168,0,102]);	// TODO: перевести из localhost
var port = 6000;
var host = "192.168.0.77";

function HdlSender(){

}

HdlSender.prototype.send = function(command, targetSubnet, targetId){
	var contents = Array.prototype.slice.call(arguments, 3);
};

module.exports = HdlSender;