const snoowrap = require('snoowrap');
const axios = require('axios');
const settings = require('./settings/settings');
const isImgUrl = require('is-image-url');

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
    };
    this.bot = require('./Bot');
  }

  async getHottestTodaySubmission() {
    try {
      const submissionListing = await this.r.getTop('dankmemes', {time: 'day', limit: 1});
      const submission = submissionListing[0];
      return submission;
    } catch (e) {
      console.error(e);
      return undefined;
    }
  }

  async getHottestToday(ctx) {
    try {
      const submission = await this.getHottestTodaySubmission();
      this.sendImg(ctx, submission);
    } catch (e) {
      console.error(e);
    }
  }

  async sendHottestTodayToChat(chatId) {
    const { url } = await this.getHottestTodaySubmission();
    this.bot.bot.telegram.sendPhoto(chatId, url);
  }

  async getRandom(ctx) {
    try {
      const submission = await this.r.getRandomSubmission('dankmemes');
      this.sendImg(ctx, submission);
    } catch (e) {
      console.error(e);
    }
  }

  sendImg(ctx, submission) {
    const { url } = submission;
    if (!url) {
      ctx.reply("Es gab einen Fehler mit der Kommunikation zur Reddit API");
      return;
    }
    if (!isImgUrl(url)) {
      ctx.reply("Die Reddit API gab kein Bild zurück");
      return;
    }
    ctx.replyWithPhoto({url});
    console.log("Sent: ", url);
  }
}

module.exports = new ApiManager();