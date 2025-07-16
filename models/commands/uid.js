const axios = require("axios");

module.exports.config = {
  name: "uid",
  version: "1.0",
  hasPermssion: 0,
  credits: "Joy-Ahmed",
  description: "Get UID from profile link, mention, reply or self",
  commandCategory: "info",
  usages: "[tag/reply/link]",
  cooldowns: 5
};

module.exports.run = async function ({ api, event, args }) {
  const regExCheckURL = /^(http|https):\/\/[^ "]+$/;

  // If replied to a message
  if (event.type === "message_reply") {
    return api.sendMessage(event.messageReply.senderID.toString(), event.threadID, event.messageID);
  }

  // If profile link is given
  if (args[0] && regExCheckURL.test(args[0])) {
    let msg = "";
    for (const link of args) {
      try {
        const res = await axios.get(`https://api.leanhtruong.net/fb/finduid?url=${encodeURIComponent(link)}`);
        const uid = res.data?.uid || "Not Found";
        msg += `${link} => ${uid}\n`;
      } catch (e) {
        msg += `${link} => ERROR: ${e.message}\n`;
      }
    }
    return api.sendMessage(msg, event.threadID, event.messageID);
  }

  // If tagged someone
  const mentions = event.mentions;
  if (Object.keys(mentions).length > 0) {
    let msg = "";
    for (const id in mentions) {
      const name = mentions[id].replace("@", "");
      msg += `${name}: ${id}\n`;
    }
    return api.sendMessage(msg, event.threadID, event.messageID);
  }

  // Default: return sender UID
  if (!args[0]) {
    return api.sendMessage(event.senderID.toString(), event.threadID, event.messageID);
  }

  // If wrong usage
  return api.sendMessage("⚠️ Please tag someone, reply to a message, or give a valid profile link.", event.threadID, event.messageID);
};
