var protocol = require('./HdlProtocol.js');

var Hdl = function () {};

Hdl.prototype.singleChannelControl = function (targetSubnet, targetId, channel, value) {
    console.log('>> singleChannelControl method');
};

Hdl.prototype.sceneControl = function (targetSubnet, targetId, area, scene) {
    console.log('>> sceneControl method');
};

Hdl.prototype.sequenceControl = function (targetSubnet, targetId, area, sequence) {
    console.log('>> sequenceControl method');
};

Hdl.prototype.uvSwitchControl = function (targetSubnet, targetId, uvSwitch, value) {
    console.log('>> uvSwitchControl method');
};

module.exports = new Hdl();
