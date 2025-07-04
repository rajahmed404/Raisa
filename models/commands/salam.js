module.exports.config = {
  name: "salam",
  version: "1.0.0",
  permission: 0,
  credits: "Joy Ahmed",
  description: "React and reply on salaam",
  prefix: false,
  category: "noPrefix",
  usages: "",
  cooldowns: 1
};

module.exports.run = async function({ api, event }) {
  const { body, threadID, messageID } = event;
  if (!body) return;

  // ট্রিগার শব্দ
  const triggerWords = ["আসসালামু আলাইকুম", "assalamualaikum", "assalamu alaikum"];
  const msgLower = body.toLowerCase();

  // যদি মেসেজ trigger word হয়
  if (triggerWords.includes(msgLower)) {
    // রিঅ্যাকশন
    api.setMessageReaction("❤️", messageID, (err) => {}, true);

    // রিপ্লাই
    const replyText = "ওয়ালাইকুম সালাম";
    return api.sendMessage(replyText, threadID, messageID);
  }
};
