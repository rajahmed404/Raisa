const axios = require("axios");

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

module.exports.handleEvent = async function({ api, event }) {
  const { threadID, messageID, body } = event;

  if (body.toLowerCase().startsWith("assalamu alaikum") || 
      body.toLowerCase().startsWith("assalamualaikum") ||
      body.startsWith("আসসালামু আলাইকুম")) {

    try {
      const imgURL = "https://i.imgur.com/5Qa7zUs.jpeg"; // এখানে আপনার Imgur লিংক বসান
      const response = await axios.get(imgURL, { responseType: "stream" });

      const msg = {
        body: "ওয়ালাইকুম সালাম",
        attachment: response.data
      };

      api.sendMessage(msg, threadID, messageID);
      api.setMessageReaction("🖤", messageID, () => {}, true);

    } catch (err) {
      console.error("Image fetch failed:", err);
    }
  }
};

module.exports.run = function({ api, event }) {
  // No command usage needed
};
