var fs = require("fs");

// Read in configuration file
var data = fs.readFileSync("./config/settings.json"),Config;
try {
    Config = JSON.parse(data);
} catch (err) {
    console.log("Error parsing config")
    console.log(err);
}

console.log(Config.datacenters.scl);
