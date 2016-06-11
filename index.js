// We need this for self-signed certs
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var slackTerminal = require('slack-terminalize');
var fs = require("fs");

// Read in configuration file
var data = fs.readFileSync("./config/settings.json"),Config;
try {
    Config = JSON.parse(data);
} catch (err) {
    console.log("Error parsing config")
    console.log(err);
}

slackTerminal.init(Config.slack_api_token, {
    // slack rtm client options here
    // more info at: https://github.com/slackhq/node-slack-client/blob/master/lib/clients/rtm/client.js
}, {
    // app configurations to suit your project structure
    // to see the list of all possible config,
    // check this out: https://github.com/ggauravr/slack-terminalize/blob/master/util/config.js
    CONFIG_DIR: __dirname + '/config',
    COMMAND_DIR: __dirname + '/commands'
});
