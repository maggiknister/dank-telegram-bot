let bodyParser = require('body-parser');
let fs = require('fs');
let express = require('express');

let app = express();
const axios = require('axios');

let SetupManager = require('./setup');

SetupManager.initializeWebhook();

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

let settingsJson = fs.readFileSync('api/settings.json');
let settings = JSON.parse(settingsJson);

//TODO use baseurl with bot token for security reasons
let baseUrl = `/${settings.token}`;

app.get('/test', (req, res) => {
  console.log(req);
  res.send("test");
})

app.post('/newMessage', (req, res) => {
  console.log('Message received:\n', req.body);
  res.send(req.body);
  let { message } = req.body;
   //Each message contains "text" and a "chat" object, which has an "id" which is the chat id

  if (message.entities[0].type === 'bot_command') {
    console.log("The guy send a command!");
    console.log(message.entities);
  }

  if (!message || message.text.toLowerCase().indexOf('marco') < 0) {
    return res.end()
  }

  // If we've gotten this far, it means that we have received a message containing the word "marco".
  // Respond by hitting the telegram bot API and responding to the approprite chat_id with the word "Polo!!"
  axios.post(`https://api.telegram.org/bot${settings.token}/sendMessage`,
    {
        chat_id: message.chat.id,
        text: 'Polo!!'
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

})

// Finally, start our server
let port = 8443;
app.listen(port, () => {
  console.log(`Telegram app listening on port ${port}!`)
})