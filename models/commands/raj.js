const fs = require("fs");
module.exports.config = {
  name: "raj",
    version: "1.0.1",
  hasPermssion: 0,
  credits: "JOY", 
  description: "hihihihi",
  commandCategory: "no prefix",
  usages: "tea",
    cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
  var { threadID, messageID } = event;
  if (event.body.indexOf("Assalamu alaikum")==0 || event.body.indexOf("assalamualaikum")==0 || event.body.indexOf("আসসালামু আলাইকুম")==0 || event.body.indexOf("আসসালামু আলাইকুম")==0) {
    var msg = {
        body: "ওয়ালাইকুম সালাম",
        attachment: fs.createReadStream(__dirname + `/JOY/raj.png`)
      }
      api.sendMessage(msg, threadID, messageID);
    api.setMessageReaction("🖤", event.messageID, (err) => {}, true)
    }
  }
  module.exports.run = function({ api, event, client, __GLOBAL }) {

  }
