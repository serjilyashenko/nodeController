// HdlProtocol singleton module

function HdlProtocol() {
	this._commandCodes = {
		// Light Control: Scene
		'Scene Control': 0x002,
		'Response Scene Control': 0x003,
		'Read Status of Scene': 0x000c,
		'Response Read Status of Scene': 0x000d,
		'Broadcast Status of Scene': 0xefff,
		// Light Control: Sequence
		'Sequence Control': 0x001a,
		'Response Sequence Control': 0x001b,
		'Read Status of Sequence': 0xe014,
		'Response Read Status of Sequence': 0xe015,
		'Broadcast Status of Sequence': 0xf036,
		// Light Control: Single Channel
		'Single Channel Control': 0x0031,
		'Response Single Channel Control': 0x0032,
		'Read Status of Channels': 0x0033,
		'Response Read Status of Channels': 0x0034,
		'Read Current Level of Channels': 0x0038,
		'Response Read Current Level of Channels': 0x0039,
		// Logic Control
		'Logic Control': 0xf116,
		'Response Logic Control': 0xf117,
		'Read Status of Logic Control': 0xf112,
		'Response Read Status of Logic Control': 0xf113,
		'Broadcast Status of Status of Logic Control': 0xf12f,
		'Read System Date and Time': 0xda00,
		'Response Read System Date and Time': 0xda01,
		'Modify Read System Date and Time': 0xda02,
		'Response Modify Read System Date and Time': 0xda03,
		'Broadcast System Date and Time(Every Minute)': 0xda44,
		// Universal Switch
		'UV Switch Control': 0xe01c,
		'Response UV Switch Control': 0xe01d,
		'Read Status of UV Switch': 0xe018,
		'Response Read Status of UV Switch': 0xe019,
		'Broadcast Status of Status of UV Switches': 0xe017,
		// Curtain Switch
		'Curtain Switch Control': 0xe3e0,
		'Response Curtain Switch Control': 0xe3e1,
		'Read Status of Curtain Switch': 0xe3e2,
		'Response Read Status of Curtain Switch': 0xe3e3,
		'Broadcast Status of Satus of Curtain Switches': 0xe3e4,
		// GPRS Control
		'GPRS Control': 0xe3d4,
		'Response GPRS Control': 0xe3d5,
		// Panel Control
		'Panel Control': 0xe3d8,
		'Response Panel Control': 0xe3d9,
		'Read Status of Panel Control': 0xe3da,
		'Response Read Status': 0xe3db,
		// AC Control
		'Read AC Status': 0x1938,
		'Response Read AC Status': 0x1939,
		'Control AC Status': 0x193a,
		'Response Control AC Status': 0x193b,
		// Floor Heating Control: Floor Heating Control from DLP
		'Read Floor Heating Status': 0x1944,
		'Response Read Floor Heating Status': 0x1945,
		'Control Floor Heating Status': 0x1946,
		'Response Control Floor Heating Status': 0x1947,
		// Floor Heating Control: Floor Heating Control from Floor Heating Module
		'Read Floor Heating Status': 0x1c5e,
		'Response Read Floor Heating Status': 0x1c5f,
		'Control Floor Heating Status': 0x1c5c,
		'Response Control Floor Heating Status': 0x1c5d,
		// Floor Heating Control: Floor Heating Settings(DLP Works as Master)
		'Read Floor Heating Settings': 0x1940,
		'Response Read Floor Heating Settings': 0x1941,
		'Modify Floor Heating Settings': 0x1942,
		'Response Modify Floor Heating Settings': 0x1943,
		// Floor Heating Settings (Floor Heating module Works as Master)
		'Read Floor Heating Day Night Time Settings': 0x1d1e,
		'Response Read Floor Heating Day Night Time Settings': 0x1d1f,
		'Modify Floor Heating Day Night Time Settings': 0x1d1c,
		'Response Modify Floor Heating Day Night Time Settings': 0x1d1d,
		// Sensors In One: Read Sensors Status( 8in1 DeviceType315 )
		'Read Sensors Status': 0xdb00,
		'Response Read Sensors Status': 0xdb01,
		// Read Sensors Status( 8in1 DeviceType314 )
		'Read Sensors Status': 0x1645,
		'Response Read Sensors Status': 0x1646,
		'Broadcast Sensors Status Automatically': 0x1647, // for ( 12in1 )
		// Read Sensors Status (SensorsInOne)
		'Read Sensors Status': 0x1604,
		'Response Read Sensors Status': 0x1605,
		'Broadcast Sensors Status': 0x1630,
		// Read Temperature: old
		'Read Temperature': 0xe3e7,
		'Response Read Temperature': 0xe3e8,
		'Broadcast Temperature': 0xe3e5,
		// Read Temperature: New
		'Read Temperature New': 0x1948,
		'Response Temperature': 0x1939,
		// Secutiry Module
		'Read Security Module': 0x011e,
		'Response Read Security Module': 0x011f,
		'Arm Security Module': 0x0104,
		'Response Arm Security Module': 0x0105,
		'Alarm Security Module': 0x010c,
		'Response Alarm Security Module': 0x010d,
		// Music Control
		'Music Control': 0x0218,
		'Response Music Control': 0x0219,
		'Read Read Music Control Status': 0x021a,
		'Response Music Control': 0x021b,
		// Dry Contact
		'Dry Contact': 0x15d0,
		'Response Dry Contact': 0x15d1,
		'Dry Contact2': 0x15ce,
		'Response Dry Contact2': 0x15cf,
		// DLP Music Play Control Command
		'Read Z-audio Current Status':  0x192e,
		'Response Read Z-audio Current Satus': 0x192f,
		'Change Source': 0x192e,
		// Power meter Command: Read Voltage
		'Read Voltage': 0xd902,
		'Response Read Voltage': 0xd903,
		// Power meter Command: Raed Current
		'Read Current': 0xd908,
		'Response Read Current': 0xd909,
		// Power meter Command: Read Power
		'Read Power': 0xd0a,
		'Response Read Power': 0xd90b,
		// Power meter Command: Read Power Factor
		'Read Power Factor': 0xd904,
		'Response Power Factor': 0xd905,
		// Power meter Command: Read Electricity
		'Read Electricity': 0xd91a,
		'Response Read Electricity': 0xd91b,
		// Search
		'Search Devices': 0x000e,
		'Response on search request': 0x000f
	};
	this._codesByCommands = {};

	for (var command in this._commandCodes){
		var code = this._commandCodes[command];
		this._codesByCommands[code] = command;
	}
};

HdlProtocol.prototype.codeOfCommand = function (command) {
	// console.log('HdlProtocol: code of command "' + command + '"" is 0x' + this._commandCodes[command].toString(16));
	if (command in this._commandCodes) {
		return this._commandCodes[command];
	} else {
		return null;
	}
};

HdlProtocol.prototype.commandByCode = function (code) {
	// console.log('HdlProtocol: command of code 0x' + code.toString(16) + ' is ' + this._codesByCommands[code]);
	if (code in this._codesByCommands) {
		return this._codesByCommands[code];
	} else {
		return null;
	}
};

module.exports = new HdlProtocol();
