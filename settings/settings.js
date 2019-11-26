let fs = require('fs');
let path = require('path');

let settingsFilePath = path.join(__dirname, 'settings.json');

let settingsFile = fs.readFileSync(settingsFilePath);
let settings = JSON.parse(settingsFile);

module.exports = settings;