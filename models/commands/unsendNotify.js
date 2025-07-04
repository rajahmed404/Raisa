const fs = require("fs");

module.exports.config = {
  name: "unsendNotify",
  version: "1.0.2",
  permission: 0,
  credits: "Joy Ahmed",
  description: "Unsend করলে নির্দিষ্ট UID এ ইনবক্সে পাঠাবে",
  prefix: false,
  category: "group",
  usages: "",
  cooldowns: 0
};

// ✅ এখানে তোমার নির্দিষ্ট Admin UID বসাও
const adminUIDs = [
  "100080837633857", // Admin 1
  "100001435123762"  // Admin 2
  // যত ইচ্ছা UID বসাও
];

module.exports.handleEvent = async function ({ api, event, Users, Threads }) {
  const { messageID, threadID, senderID } = event;
  if (!global._unsendData) global._unsendData = {};

  if (event.type == "message") {
    global._unsendData[messageID] = {
      senderID,
      threadID,
      body: event.body || "[🖼️ Media/Attachment]",
      time: Date.now()
    };
  }

  if (event.type == "message_unsend") {
    const oldMsg = global._unsendData[messageID];
    if (!oldMsg) return;

    const threadInfo = await Threads.getInfo(threadID);
    const userInfo = await Users.getName(oldMsg.senderID);
    const groupName = threadInfo.threadName || "Unnamed Group";

    const notify = `🚨 ১টি মেসেজ Unsend হয়েছে!\n━━━━━━━━━━━━━━\n👤 ইউজার: ${userInfo}\n🆔 UID: ${oldMsg.senderID}\n💬 মেসেজ: ${oldMsg.body}\n🕒 টাইম: ${new Date(oldMsg.time).toLocaleString()}\n👥 গ্রুপ: ${groupName} (${threadID})`;

    for (const adminID of adminUIDs) {
      try {
        await api.sendMessage(notify, adminID);
      } catch (e) {
        console.log(`❌ Couldn't send to admin (${adminID})`);
      }
    }

    delete global._unsendData[messageID];
  }
};

module.exports.run = () => {};
