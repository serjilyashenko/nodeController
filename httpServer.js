var http = require('http');
var url = require('url');
var querystring = require('querystring');
var static = require('node-static');
var file = new static.Server('.');

var hdl = require('./udpClient')

function accept(req, res) {

	// если URL запроса /vote, то...
	if (req.url == '/on') {
			res.end('Ваш голос принят: ' + new Date());
			hdl(55,3,100);
	} else if (req.url == '/off'){
			resgit.end('Ваш голос принят: ' + new Date());
			hdl(55,3,0);
	} else {
		// иначе считаем это запросом к обычному файлу и выводим его
		file.serve(req, res); // (если он есть)
	}

}

// ------ этот код запускает веб-сервер -------
module.exports = function(){
	// if (!module.parent) {
		http.createServer(accept).listen(8080);
		console.log('http Server created');
	// } else {
		// exports.accept = accept;
	// };
};