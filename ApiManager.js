const snoowrap = require('snoowrap');
const axios = require('axios');
const settings = require('./settings/settings');

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

  // TODO post ohne bild abfangen, dann link zu diesem schicken
  async getHottestToday(ctx) {
    try {
      const submissionListing = await this.r.getTop('dankmemes', {time: 'day', limit: 1});
      const submission = submissionListing[0];

      this.sendImg(ctx, submission);
    } catch (e) {
      console.error(e);
    }
  }

  async getRandom(ctx) {
    try {
      const submission = await this.r.getRandomSubmission('dankmemes')
      this.sendImg(ctx, submission);
    } catch (e) {
      console.error(e);
    }
  }

  sendImg(ctx, submission) {
    const imgUrl = submission.url;
    ctx.replyWithPhoto({url: imgUrl});
    console.log("Sent : ", imgUrl);
  }
}

module.exports = new ApiManager();