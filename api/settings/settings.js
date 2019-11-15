let fs = require('fs');
let settingsFile = fs.readFileSync('api/settings/settings.json');
let settings = JSON.parse(settingsFile);

module.exports = settings;