console.log('HdlConnect module started');
var send = require('./HdlSender.js');

function HdlConnect (hostIp, port) {
	this.ip = hostIp;
	this.port = port;
}

HdlConnect.prototype.send = send;

module.exports = function(hostIp, port) {
	return new HdlConnect(hostIp, port);
};