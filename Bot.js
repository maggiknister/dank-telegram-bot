const Telegraf = require('telegraf');
const settings = require('./settings/settings');
const ApiManager = require('./ApiManager');

const bot = new Telegraf(settings.token);

const startBot = () => {
  bot.start((ctx) => ctx.reply('Hallo du Pleb'));
  bot.help((ctx) => ctx.reply('Hier ist die nicht-existente Hilfe-Seite'));
  bot.command('dankestMeme', (ctx) => {
    ApiManager.getDankestMemeToday(ctx);
  })
  bot.launch();
  console.log("Bot has been started");
}

module.exports = startBot;