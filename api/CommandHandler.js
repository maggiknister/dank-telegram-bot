let fs = require('fs');
let axios = require('axios');
let settings = require('./settings/settings');

class CommandHandler {

  constructor() {
  }


  helpCommand(req, res, message) {
  // If we've gotten this far, it means that we have received a message containing the word "marco".
  // Respond by hitting the telegram bot API and responding to the approprite chat_id with the word "Polo!!"
  axios.post(`https://api.telegram.org/bot${settings.token}/sendMessage`,
    {
        chat_id: message.chat.id,
        text: 'You successfully requested the non-existent help page'
      }
    ).then(response => {
      // We get here if the message was successfully posted
      console.log('Message to user posted')
      res.end('ok')
    }).catch(err => {
      // ...and here if it was not
      console.log('Error :', err)
      res.end('Error :' + err)
    })
  }
}

module.exports = new CommandHandler();