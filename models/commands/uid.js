const axios = require("axios");

module.exports.config = {
  name: "uid",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "Joy-Ahmed",
  description: "Get Facebook UID",
  commandCategory: "Tools",
  usages: "[mention | reply | link]",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
  const mentions = Object.keys(event.mentions || {});
  const reply = event.messageReply;

  // 1. Mention করা ইউজারদের UID
  if (mentions.length > 0) {
    let msg = '';
    for (let i = 0; i < mentions.length; i++) {
      const name = Object.values(event.mentions)[i].replace('@', '');
      const uid = mentions[i];
      msg += `👤 ${name}: ${uid}\n`;
    }
    return api.sendMessage(msg.trim(), event.threadID, event.messageID);
  }

  // 2. Reply করে থাকলে তার UID
  if (reply) {
    return api.sendMessage(`👤 Replied User UID: ${reply.senderID}`, event.threadID, event.messageID);
  }

  // 3. যদি ফেসবুক লিংক বা ইউজারনেম দেওয়া হয়
  if (args[0]) {
    const input = args[0];
    const match = input.match(/(?:facebook\.com\/)?(?:profile\.php\?id=)?([a-zA-Z0-9.]+)/);
    
    if (!match) {
      return api.sendMessage("❌ সঠিক ফেসবুক লিংক বা ইউজারনেম দিন।", event.threadID, event.messageID);
    }

    const username = match[1];

    try {
      const res = await axios.get(`https://graph.facebook.com/${username}?fields=id&access_token=350685531728|62f8ce9f74b12f84c123cc23437a4a32`);
      const uid = res.data.id;
      return api.sendMessage(`✅ UID of '${username}' is: ${uid}`, event.threadID, event.messageID);
    } catch (err) {
      return api.sendMessage("❌ UID বের করা যায়নি।", event.threadID, event.messageID);
    }
  }

  // 4. নিজের UID
  return api.sendMessage(`👤 Your UID: ${event.senderID}`, event.threadID, event.messageID);
};
