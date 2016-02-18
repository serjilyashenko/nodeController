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

	var hdlTelegram = {
		leaderCode		:message.slice(14,16).toString('hex'),
		dataSize 		:message[16],
		senderSubnet 	:message[17],
		senderId 		:message[18],
		deviceType 		:message.slice(19,21).toString('hex'),
		command 		:parseInt(message.slice(21,23).toString('hex'), 16),
		targetSubnet 	:message[23],
		targetId 		:message[24],
		dataCRC 		:message.slice(24).toString('hex'),
		data 			:message.slice(24, (message.length - 2)),
		CRC 			:message.slice((message.length - 2), message.length).toString('hex')
	};

	switch (hdlTelegram.command){
		case 0x0031 :
			console.log("       Command: " + hdlTelegram.command.toString(16) + " -> " + hdlCommandCode[hdlTelegram.command] );
			console.log("     Target id: " + hdlTelegram.targetId 		);
			console.log("    Channel No: " + hdlTelegram.data[0].toString(16));
			console.log();
			break;
	}

	// console.log(message[0] + "." + message[1] + "." + message[2] + "." + message[3]);	// IP sender
	// console.log(message.slice(4,14).toString());										// magic header
	// console.log(message.slice(14));													// hdl protocol
	// console.log("   Leader Code: " + hdlTelegram.leaderCode		);
	// console.log("     Data size: " + hdlTelegram.dataSize 		);
	// console.log(" Sender subnet: " + hdlTelegram.senderSubnet 	);
	// console.log("     Sender id: " + hdlTelegram.senderId 		);
	// console.log("   Device type: " + hdlTelegram.deviceType 	);
	// console.log("       Command: " + hdlTelegram.command.toString(16) + " -> " + hdlCommandCode[hdlTelegram.command] );
	// console.log(" Target subnet: " + hdlTelegram.targetSubnet 	);
	// console.log("     Target id: " + hdlTelegram.targetId 		);
	// console.log("    Data + CRC: " + hdlTelegram.dataCRC 		);
	// console.log("          Data: " + hdlTelegram.data.toString('hex'));
	// console.log("           CRC: " + hdlTelegram.CRC 			);
	// console.log();
});

server.bind(port);

var hdlCommandCode = {
	0x0002 : "4.1.1 Scene Control",
	0x0003 : "4.1.2 Response Scene Control",
	0x000C : "4.1.3 Read Status of Scene",
	0x000D : "4.1.4 Response Read Status of Scene",
	0xEFFF : "4.1.5 Broadcast Status of Scene",
	0x001A : "4.2.1 Sequence Control",
	0x001B : "4.2.2 Response Sequence Control",
	0xE014 : "4.2.3 Read Status of Sequence",
	0xE015 : "4.2.4 Response Read Status of Sequence",
	0xF036 : "4.2.5 Broadcast Status of Sequence",
	0x0031 : "4.3.1 Single Channel Control",
	0x0032 : "4.3.2 Response Single Channel Control",
	0x0033 : "4.3.3 Read Status of Channels",
	0x0034 : "4.3.4 Response Read Status of Channels",
	0x0038 : "4.3.5 Read Current Level of Channels",
	0x0039 : "4.3.6 Response Read Current Level of Channels",
	0xF116 : "5.1.1 Logic Control",
	0xF117 : "5.1.2 Response Logic Control",
	0xF112 : "5.1.3 Read Status of Logic Control",
	0xF113 : "5.1.4 Response Read Status of Logic Control",
	0xF12F : "5.1.5 Broadcast Status of Status of Logic Control",
	0xDA00 : "5.1.6 Read System Date and Time",
	0xDA01 : "5.1.7 Response Read System Date and Time",
	0xDA02 : "5.1.8 Modify Read System Date and Time",
	0xDA03 : "5.1.9 Response Modify Read System Date and Time",
	0xDA44 : "5.1.10 Broadcast System Date and Time(Every Minute)",
	0xE01C : "6.1.1 UV Switch Control",
	0xE01D : "6.1.2 Response UV Switch Control",
	0xE018 : "6.1.3 Read Status of UV Switch",
	0xE019 : "6.1.4 Response Read Status of UV Switch",
	0xE017 : "6.1.5 Broadcast Status of Status of UV Switches",
	0xE3E0 : "7.1.1 Curtain Switch Control",
	0xE3E1 : "7.1.2 Response Curtain Switch Control",
	0xE3E2 : "7.1.3 Read Status of Curtain Switch",
	0xE3E3 : "7.1.4 Response Read Status of Curtain Switch",
	0xE3E4 : "7.1.5 Broadcast Status of Status of Curtain Switches",
	0xE3D4 : "8.1.1GPRS Control",
	0xE3D5 : "8.1.2 Response GPRS Control",
	0xE3D8 : "9.1.1 Panel Control",
	0xE3D9 : "9.1.2 Response Panel Control",
	0xE3DA : "9.1.3 Read Status of Panel Control",
	0xE3DB : "9.1.4 Response Read Status of Panel Control",
	0x1938 : "10.1.1 Read AC Status",
	0x1939 : "10.1.2 Response Read AC Status",
	0x193A : "10.1.3 Control AC Status",
	0x193B : "10.1.4 Response Control AC Status",
	0x1944 : "11.1.1 Read Floor Heating Status",
	0x1945 : "11.1.2 Response Read Floor Heating Status",
	0x1946 : "11.1.3 Control Floor Heating Status",
	0x1947 : "11.1.4 Response Control Floor Heating Status",
	0x1C5E : "11.2.1 Read Floor Heating Status",
	0x1C5F : "11.2.2 Response Read Floor Heating Status",
	0x1C5C : "11.2.3 Control Floor Heating Status",
	0x1C5D : "11.2.4 Response Control Floor Heating Status",
	0x1940 : "11.3.1 Read Floor Heating Settings",
	0x1941 : "11.3.2 Response Read Floor Heating Settings",
	0x1942 : "11.3.3 Modify Floor Heating Settings",
	0x1943 : "11.3.4 Response Modify Floor Heating Settings",
	0x1D1E : "11.4.1 Read Floor Heating Day Night Time Setting",
	0x1D1F : "11.4.2 Response Read Floor Heating Day Night Time Setting",
	0x1D1C : "11.4.3 Modify Floor Heating Day Night Time Setting",
	0x1D1D : "11.4.4 Response Modify Floor Heating Day Night Time Setting",
	0xDB00 : "12.1.1 Read Sensors Status",
	0xDB01 : "12.1.2 Response Read Sensors Status",
	0x1645 : "12.2.1 Read Sensors Status",
	0x1646 : "12.2.2 Response Read Sensors Status",
	0x1645 : "12.3.1 Read Sensors Status",
	0x1646 : "12.3.2 Response Read Sensors Status",
	0x1647 : "12.3.3 Broadcast Sensors Status Automatically",
	0x1604 : "12.4.1 Read Sensors Status",
	0x1605 : "12.4.2 Response Read Sensors Status",
	0x1630 : "12.4.3 Broadcast Sensors Status",
	0xE3E7 : "13.1.1 Read Temperature",
	0xE3E8 : "Ⓒ Copyright 1985 – 2014, HDL System specifications AS v1.1.04",
	0xE3E5 : "13.1.3 Broadcast Temperature",
	0x1948 : "13.2.1 Read Temperature New",
	0x1949 : "13.2.2 Response Temperature",
	0x011E : "14.1.1 Read Security Module",
	0x011F : "14.1.2 Response Read Security Module",
	0x0104 : "14.1.3 Arm Security Module",
	0x0105 : "14.1.4 Response Arm Security Module",
	0x010C : "14.1.5 Alarm Security Module",
	0x010D : "14.1.6 Response Alarm Security Module",
	0x0218 : "15.1.1 Music Control",
	0x0219 : "Ⓒ Copyright 1985 – 2014, HDL System specifications AS v1.1.04",
	0x021A : "15.1.3 Read Read Music Control Status",
	0x021B : "15.1.4 Response Music Control",
	0x15D0 : "16.1.1 Dry Contact",
	0x15D1 : "16.1.2 Response Dry Contact",
	0x15CE : "16.1.3 Dry Contact",
	0x15CF : "16.1.4 Response Dry Contact",
	0x192E : "17.1.1 Read Z-audio Current Status",
	0x192F : "17.1.2 Response Read Z-audio Current Status (1) Play or Stop",
	0x192F : "17.1.3 Response Read Z-audio Current Status (2) Play or Pause",
	0x192F : "17.1.4 Response Read Z-audio Current Status (3) Play",
	0x192F : "17.1.5 Response Read Z-audio Current Status (4) Stop",
	0x192F : "17.1.6 Response Read Z-audio Current Status (5) further information",
	0x192E : "17.1.7 Change Source(1) Normal way",
	0x192E : "17.1.8 Change Source(1) Next Source",
	0x192F : "17.1.9 Response Change Source",
	0x192E : "17.1.10 Previous List",
	0x192E : "17.1.11 Next List",
	0x192F : "17.1.12 Response Total Play Lists",
	0x192F : "Ⓒ Copyright 1985 – 2014, HDL System specifications AS v1.1.04",
	0x192F : "17.1.14 Response Total Songs",
	0x192F : "17.1.15 Response the Name of Song",
	0x1364 : "18.1.1 Read Play Lists",
	0x1365 : "18.1.2 Response Read Play Lists",
	0xD902 : "19.1.1 Read Voltage",
	0xD903 : "19.1.2 Response Read Voltage",
	0xD908 : "19.2.1 Read Current",
	0xD909 : "19.2.2 Response Read Current",
	0xD90A : "19.3.1 Read Power",
	0xD90B : "19.3.2 Response Read Power",
	0xD904 : "19.4.1 Read Power Factor",
	0xD905 : "19.4.2 Response Read Power Factor",
	0xD91A : "19.5.1 Read Electricity",
	0xD91B : "19.5.2 Response Read Electricity"
}