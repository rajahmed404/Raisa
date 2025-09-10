module.exports.config = {
  name: "callonebyone",
  version: "1.0.0",
  permission: 0,
  prefix: true,
  credits: "Sohidul",
  description: "এক এক করে সবাইকে mention করে কল এ ডাকবে",
  category: "group",
  usages: "callonebyone",
  cooldowns: 10
};

module.exports.run = async function ({ api, event }) {
  if (!event.isGroup) {
    return api.sendMessage("⚠️ এই কমান্ড শুধু গ্রুপে ব্যবহার করা যাবে!", event.threadID);
  }

  let all = event.participantIDs; // গ্রুপের সব UID
  for (let uid of all) {
    try {
      await api.sendMessage({
        body: "📢 কল এ আসো!",
        mentions: [{ tag: "@" + uid, id: uid }]
      }, event.threadID);

      await new Promise(resolve => setTimeout(resolve, 1200)); 
      // ১.২ সেকেন্ড delay, না হলে spam হয়ে যাবে
    } catch (e) {
      console.log("❌ Error sending to UID:", uid, e);
    }
  }
};
