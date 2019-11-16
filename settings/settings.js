let fs = require('fs');
let settingsFile = fs.readFileSync('settings/settings.json');
let settings = JSON.parse(settingsFile);

module.exports = settings;