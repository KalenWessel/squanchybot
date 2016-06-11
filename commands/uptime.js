var request = require('request'),
	util 	= require('../util');

module.exports = function (param) {
	var	channel		= param.channel,
		endpoint	= param.commandConfig.endpoint.replace('{gem}', param.args[0]);
		
	var info = [];
        var exec = require('child_process').exec;
	var cmd = 'uptime';

	exec(cmd, function(error, stdout, stderr) {
		info.push('Uptime: ' + stdout);
		util.postMessage(channel, info.join('\n\n'));
        });

};
