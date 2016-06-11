var request = require('request');
var	util = require('../util');
var fs = require("fs");

function serverName(fullname, regex) {
    var pattern = regex;
    var re = new RegExp(pattern, 'g');
    if (fullname.match(re)) {
        return fullname
    } else {
        return null
   }
}

module.exports = function (param) {
	var	channel	= param.channel;
    var datacenter = param.args[0];
    var searchString = param.args[1];

    // Read in configuration file
    var data = fs.readFileSync("./config/settings.json"),Config;
    try {
        Config = JSON.parse(data);
    } catch (err) {
        console.log("Error parsing config")
        console.log(err);
    }

	var info = [];

    info.push("Hi, this is your automated squanchy bot to inform you that you have the following instances provisioned in the SCL datacenter.\nIs he passive aggressive or aggressively passive? You alone can decide:\n\n");
	var exec = require('child_process').exec;
	//Before any other calls are made into the Openstack system, 
	//the user must do a general authentication 
	 
	var OSWrap = require('openstack-wrapper');
	OSWrap.getSimpleProject(Config.datacenters[datacenter].os_username, Config.datacenters[datacenter].os_password, Config.datacenters[datacenter].os_project_id, Config.datacenters[datacenter].os_authaddress, function(error, project){
	  if (error) {
	    console.log('An error occured', error);
	  } else {
	    //to use the project object: 
	    project.nova.listServers(function(error, servers_array) {
            if (error) {
                console.error('An error occured', error);
            } else {
                console.log('A list of servers was retrived');
                servers_array.forEach(function(value) {
                    runningInstance = serverName(value.name, searchString); 
                    if (runningInstance != null) {
                        info.push(runningInstance);
                    }
                });
                util.postMessage(channel, info.join('\n'));            
            }
	    });
	  }
	});
};
