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

  // 1. Reply করা হলে
  if (event.type === "message_reply") {
    uid = event.messageReply.senderID;
  }

  // 2. Mention করা হলে
  else if (Object.keys(event.mentions).length > 0) {
    uid = Object.keys(event.mentions)[0];
  }

  // 3. যদি লিংক দেওয়া হয়
  else if (args[0]?.includes("facebook.com")) {
    const url = args[0].trim();

    // যদি শেয়ার লিংক হয়
    if (url.includes("/share/")) {
      return api.sendMessage("❌ এটি একটি শেয়ার লিংক, এতে UID বের করা সম্ভব না। প্রোফাইল লিংক দিন।", event.threadID, event.messageID);
    }

    try {
      const username = url
        .replace(/(https?:\/\/)?(www\.)?facebook\.com\//, "")
        .split(/[/?#]/)[0];

      const res = await axios.get(`https://graph.facebook.com/${username}?access_token=10220324386567830|c78f3856f5c9e15424348d20a90b0d5c`);
      uid = res.data.id;
    } catch (e) {
      return api.sendMessage("❌ UID বের করতে পারিনি। ভুল লিংক বা প্রাইভেসি সেটিংস হতে পারে।", event.threadID, event.messageID);
    }
  }

  // 4. যদি শুধু username/ID দেওয়া হয়
  else if (args[0]) {
    try {
      const res = await axios.get(`https://graph.facebook.com/${args[0]}?access_token=10220324386567830|c78f3856f5c9e15424348d20a90b0d5c`);
      uid = res.data.id;
    } catch (e) {
      return api.sendMessage("❌ ইউজারনেম/আইডি ভুল বা খুঁজে পাওয়া যায়নি।", event.threadID, event.messageID);
    }
  }

  // 5. কিছু না দিলে নিজের UID
  else {
    uid = event.senderID;
  }

  return api.sendMessage(`✅ UID: ${uid}`, event.threadID, event.messageID);
};
