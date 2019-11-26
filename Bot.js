const Telegraf = require('telegraf');
const settings = require('./settings/settings');

class Bot {
  constructor() {
    this.apiManager = require('./ApiManager');
    this.bot = new Telegraf(settings.token);
  }

  startBot() {
    this.bot.start((ctx) => ctx.reply('Willkommen beim DankMemes-Bot\n/dankestMeme, um das dankeste Meme von heute zu bekommen'));
    this.bot.help((ctx) => ctx.reply('Hier ist die nicht-existente Hilfe-Seite'));
    this.bot.command('dankestmeme', ctx => {
      this.apiManager.getHottestToday(ctx);
    });
    this.bot.command('random', ctx => {
      this.apiManager.getRandom(ctx);
    });
    this.bot.command('test', ctx => {
      this.apiManager.testSendImg(ctx);
    })
    this.bot.launch();
    console.log("Bot has been started");
  }
}

module.exports = new Bot();