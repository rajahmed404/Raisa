const axios = require("axios");

module.exports.config = {
  name: "uid",
  version: "1.0",
  author: "Joy-Ahmed",
  role: 0,
  description: "Facebook UID বের করুন",
  usage: "[reply | mention | link]",
  cooldowns: 5,
  category: "info"
};

module.exports.run = async function ({ api, event, args }) {
  const regExCheckURL = /^(http|https):\/\/[^ "]+$/;
  let msg = "";

  // 1. Reply করলে
  if (event.type === "message_reply") {
    return api.sendMessage(`✅ UID: ${event.messageReply.senderID}`, event.threadID, event.messageID);
  }

  // 2. Mention করা হলে
  if (Object.keys(event.mentions).length > 0) {
    for (const id in event.mentions) {
      msg += `👤 ${event.mentions[id].replace("@", "")} => UID: ${id}\n`;
    }
    return api.sendMessage(msg, event.threadID, event.messageID);
  }

  // 3. Profile link দিলে
  if (args[0] && regExCheckURL.test(args[0])) {
    for (const link of args) {
      try {
        const username = link
          .replace(/(https?:\/\/)?(www\.)?facebook\.com\//, "")
          .split(/[/?#]/)[0];

        const res = await axios.get(`https://graph.facebook.com/${username}?access_token=10220324386567830|c78f3856f5c9e15424348d20a90b0d5c`);
        msg += `🔗 ${link} => UID: ${res.data.id}\n`;
      } catch (e) {
        msg += `❌ ${link} => ERROR: ${e.response?.data?.error?.message || "Invalid link"}\n`;
      }
    }
    return api.sendMessage(msg, event.threadID, event.messageID);
  }

  // 4. কিছু না দিলে নিজের UID
  if (!args[0]) {
    return api.sendMessage(`✅ আপনার UID: ${event.senderID}`, event.threadID, event.messageID);
  }

  // 5. যদি ইউজারনেম/আইডি দেওয়া হয়
  try {
    const res = await axios.get(`https://graph.facebook.com/${args[0]}?access_token=10220324386567830|c78f3856f5c9e15424348d20a90b0d5c`);
    return api.sendMessage(`✅ UID of ${args[0]}: ${res.data.id}`, event.threadID, event.messageID);
  } catch (e) {
    return api.sendMessage("❌ ইউজারনেম/লিংক ভুল বা প্রাইভেট!", event.threadID, event.messageID);
  }
};
