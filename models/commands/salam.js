module.exports.config = {
  name: "salam",
  version: "1.0.0",
  permission: 0,
  credits: "Joy Ahmed",
  description: "React and reply message only (no image)",
  prefix: false,
  category: "noPrefix",
  usages: "",
  cooldowns: 1
};

// ✅ ট্রিগার শব্দের লিস্ট
const triggerWords = ["আসসালামু আলাইকুম", "Assalamualaikum", "Assalamu alaikum"];

module.exports.handleEvent = async function({ api, event }) {
  const { body, threadID, messageID } = event;
  if (!body) return;

  const msgLower = body.toLowerCase();
  const matched = triggerWords.find(word => msgLower === word);

  if (!matched) return;

  // 🔥 রিঅ্যাকশন
  api.setMessageReaction("❤️", messageID, (err) => {}, true);

  // ✉️ মেসেজ রিপ্লাই
  const replyText = `ওয়ালাইকুম সালাম`;
  api.sendMessage(replyText, threadID, messageID);
};
