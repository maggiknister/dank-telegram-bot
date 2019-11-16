const snoowrap = require('snoowrap');
const axios = require('axios');
const path = require('path');
const fs = require('fs');
let settings = require('./settings/settings');

class ApiManager{

  constructor() {
    this.setup();
  }

  async setup() {
    let { userAgent, clientId, clientSecret } = settings.reddit;
    try {
      // r is the requester
      this.r = await snoowrap.fromApplicationOnlyAuth({
        userAgent,
        clientId,
        clientSecret,
        grantType: snoowrap.grantType.CLIENT_CREDENTIALS
      });
    } catch (e) {
      console.error('API Setup couldnt be completed');
    }
  }

  async getDankestMemeToday(ctx) {
    try {
      const postListing = await this.r.getTop('dankmemes', {time: 'day', limit: 1});
      const post = postListing[0];
      let imageUrl = post.url;

      ctx.replyWithPhoto({url: imageUrl});
      console.log("Dankest meme sent: ", imageUrl);
    } catch (e) {
      console.error(e);
    }
  }
}

module.exports = new ApiManager();