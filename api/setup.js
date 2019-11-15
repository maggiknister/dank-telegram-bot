const axios = require('axios');
const fs = require('fs');

class SetupManager {
  constructor() {

  }

  async initializeWebhook() {
    let json = fs.readFileSync('api/settings.json');
    let settings = JSON.parse(json);

    // curl -F "url=https://d97237c7.ngrok.io/new-message"  https://api.telegram.org/bot995732400:AAFXS9YYf304WzZy_u1HDsZ-wsgAnBvAXlI/setWebhook
    try {
    let res = await axios.get('http://localhost:4040/api/tunnels');
    let data = res.data;
    let ngrokHostname = data.tunnels[0].public_url;
    console.log('ngrok Hostname:', ngrokHostname );
    let telegramRes = await axios.post(`https://api.telegram.org/bot${settings.token}/setWebhook`,
    {
      url: `${ngrokHostname}/newMessage`
    });
    console.log(telegramRes.data);
    } catch(e) {
      console.log(e.response);
    }
  }
}

module.exports = new SetupManager();