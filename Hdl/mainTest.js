(function () {
	var send = require('./HdlConnect.js')('192.168.0.77', 6000).send;

	send("hello");
}());