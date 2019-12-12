let bull = require('bull');

class Scheduler {

  constructor() {
    this.subscriberQueue = new bull('subscriber-queue', {
      redis: {
        host: 'redis',
        port: 6379
      }
    });
    this.apiManager = require('./ApiManager');

  }

  async addSubscriber(telegramCtx) {
    const { chat } = telegramCtx;
    const job = await this.subscriberQueue.add({
      name: chat.username ? chat.username : chat.first_name,
      chatId: chat.id
    }, {
      repeat: {
        cron: "* * * * *"
      }
    });
    this.subscriberQueue.process(async (job, done) => {
      console.log("Job is being processed");
      let { chatId } = job.data;
      this.apiManager.sendHottestTodayToChat(chatId);
      done();
    });
  }
}

module.exports = new Scheduler();