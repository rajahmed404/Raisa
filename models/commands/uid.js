const axios = require("axios");

module.exports.config = {
  name: "uid",
  version: "1.0",
  author: "Joy-Ahmed",
  description: "Get Facebook UID",
  usage: "[reply | mention | link | username]",
  cooldowns: 5,
  role: 0,
  category: "info"
};

module.exports.run = async function ({ api, event, args }) {
  let uid;

  // ✅ 1. Reply check
  if (event.type === "message_reply") {
    uid = event.messageReply.senderID;
  }

  // ✅ 2. Mention check
  else if (Object.keys(event.mentions).length > 0) {
    uid = Object.keys(event.mentions)[0];
  }

  // ✅ 3. Facebook link check
  else if (args[0]?.includes("facebook.com")) {
    try {
      const url = args[0].trim();
      const username = url
        .replace(/(https?:\/\/)?(www\.)?facebook\.com\//, "")
        .split(/[/?#]/)[0];

      const res = await axios.get(
        `https://graph.facebook.com/${username}?access_token=10220324386567830|c78f3856f5c9e15424348d20a90b0d5c`
      );
      uid = res.data.id;
    } catch (e) {
      return api.sendMessage("❌ ভুল লিংক বা প্রাইভেট প্রোফাইল। UID পাওয়া যায়নি।", event.threadID, event.messageID);
    }
  }

  // ✅ 4. Username or ID from args
  else if (args[0]) {
    try {
      const res = await axios.get(
        `https://graph.facebook.com/${args[0]}?access_token=10220324386567830|c78f3856f5c9e15424348d20a90b0d5c`
      );
      uid = res.data.id;
    } catch (e) {
      return api.sendMessage("❌ UID পাওয়া যায়নি। ইউজারনেম/আইডি ভুল কিনা চেক করুন।", event.threadID, event.messageID);
    }
  }

  // ✅ 5. Default: show sender's UID
  else {
    uid = event.senderID;
  }

  return api.sendMessage(`📌 Facebook UID: ${uid}`, event.threadID, event.messageID);
};
