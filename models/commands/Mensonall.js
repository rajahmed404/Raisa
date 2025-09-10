// File name: mensonallcall.js

module.exports.config = {
  name: "mensonallcall",
  version: "1.0.0",
  hasPermssion: 1, // শুধু এডমিন ইউজ করতে পারবে
  credits: "Sohidul Edit",
  description: "সবারে মেনশন করে কল join করাবে",
  commandCategory: "group",
  usages: "",
  cooldowns: 5
};

module.exports.run = async function({ api, event }) {
  const { threadID, messageID } = event;

  // গ্রুপ মেম্বার বের করা
  const threadInfo = await api.getThreadInfo(threadID);
  const mems = threadInfo.participantIDs;

  let mentions = [];
  let msg = "📢 সবাই কল এ JOIN করো!\n\n";

  for (let id of mems) {
    if (id != api.getCurrentUserID()) {
      mentions.push({ tag: "@all", id });
    }
  }

  // মেনশন সহ মেসেজ পাঠানো
  api.sendMessage({ body: msg, mentions }, threadID, messageID);

  // কল স্টার্ট করা (শুধু অ্যাডমিন পারবে)
  api.sendMessage("📞 কল শুরু করা হচ্ছে...", threadID, () => {
    api.startCall(threadID);
  });
};
