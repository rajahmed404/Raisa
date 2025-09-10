const { segment } = require("oicq");

module.exports.config = {
  name: "callall",
  version: "1.0.0",
  permission: 0,
  prefix: true,
  credits: "Sohidul",
  description: "সবারে mention করে কল এ ডাকবে",
  category: "group",
  usages: "callall",
  cooldowns: 5
};

module.exports.run = async function ({ api, event }) {
  if (event.isGroup) {
    let msg = "📢 সবাই কল এ আসো!";
    let mentions = [];

    // গ্রুপের সব মেম্বার UID নিয়ে mention বানানো
    for (let mem of Object.values(event.participantIds)) {
      mentions.push({ tag: "@all", id: mem });
    }

    return api.sendMessage({ body: msg, mentions: mentions }, event.threadID);
  } else {
    return api.sendMessage("⚠️ এই কমান্ড শুধু গ্রুপে কাজ করবে!", event.threadID);
  }
};
