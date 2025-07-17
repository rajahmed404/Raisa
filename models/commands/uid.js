const axios = require("axios");

module.exports.config = {
  name: "uid",
  version: "1.0.0",
  permission: 0,
  credits: "Joy-Ahmed",
  description: "ফেসবুক UID বের করুন",
  prefix: true,
  category: "tools",
  usages: "[mention | reply | link]",
  cooldowns: 5
};

module.exports.run = async ({ api, event, args }) => {
  const mention = Object.keys(event.mentions || {});
  const reply = event.messageReply;
  let targetID;

  // যদি mention থাকে
  if (mention.length > 0) {
    targetID = mention[0];
  }
  // যদি reply থাকে
  else if (reply) {
    targetID = reply.senderID;
  }
  // যদি লিংক বা ইউজারনেম দেওয়া হয়
  else if (args[0]) {
    const input = args[0];
    const match = input.match(/(?:facebook\.com\/)?(?:profile\.php\?id=)?([a-zA-Z0-9.]+)/);
    
    if (!match) {
      return api.sendMessage("❌ সঠিক ফেসবুক প্রোফাইল লিংক দিন।", event.threadID, event.messageID);
    }

    const username = match[1];

    try {
      const res = await axios.get(`https://graph.facebook.com/${username}?fields=id&access_token=350685531728|62f8ce9f74b12f84c123cc23437a4a32`);
      const uid = res.data.id;
      return api.sendMessage(`✅ ফেসবুক UID: ${uid}`, event.threadID, event.messageID);
    } catch (err) {
      return api.sendMessage("❌ UID বের করা যায়নি।", event.threadID, event.messageID);
    }
  }
  // নিজে
  else {
    targetID = event.senderID;
  }

  return api.sendMessage(`✅ ফেসবুক UID: ${targetID}`, event.threadID, event.messageID);
};
