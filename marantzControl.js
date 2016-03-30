var http = require('http');

module.exports = function(cmd){
	var request = http.request({
		hostname: "192.168.0.67",
		path: "/MainZone/index.put.asp",
		method: "POST",
		headers: {Accept: "text/html"}
		}, function(response) {
			console.log("Сервис ответил с кодом ",response.statusCode);
		});

	if(cmd == "on")
		request.end("cmd0=PutZone_OnOff%2FON&cmd1=aspMainZone_WebUpdateStatus%2F");
	else
		request.end("cmd0=PutZone_OnOff%2FOFF&cmd1=aspMainZone_WebUpdateStatus%2F");
};