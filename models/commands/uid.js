const { findUid } = global.utils;
const regExCheckURL = /^(http|https):\/\/[^ "]+$/;

module.exports.config = {
  name: "uid",
  version: "1.3",
  hasPermssion: 0,
  credits: "Converted by Joy-Ahmed | Original: NTKhang",
  description: "View Facebook UID of user",
  commandCategory: "Info",
  usages: "[mention | reply | link]",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args }) {
  const mentions = event.mentions || {};
  const reply = event.messageReply;

  // ✅ If replied to a message
  if (reply) {
    return api.sendMessage(`👤 UID (replied): ${reply.senderID}`, event.threadID, event.messageID);
  }

  // ✅ If no argument, return own UID
  if (!args[0]) {
    return api.sendMessage(`👤 Your UID: ${event.senderID}`, event.threadID, event.messageID);
  }

  // ✅ If profile link(s) provided
  if (args[0].match(regExCheckURL)) {
    let msg = '';
    for (const link of args) {
      try {
        const uid = await findUid(link);
        msg += `🔗 ${link} => ${uid}\n`;
      } catch (e) {
        msg += `❌ ${link} (ERROR) => ${e.message}\n`;
      }
    }
    return api.sendMessage(msg.trim(), event.threadID, event.messageID);
  }

  // ✅ If mention(s)
  let msg = '';
  for (const id in mentions) {
    const name = mentions[id].replace("@", "");
    msg += `👤 ${name}: ${id}\n`;
  }

  // ✅ If nothing matched
  return api.sendMessage(msg || "❌ কাউকে মেনশন করুন বা প্রোফাইল লিংক দিন, অথবা নিজ UID পেতে কমান্ডটি খালি দিন।", event.threadID, event.messageID);
};
