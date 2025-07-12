let bannedUsers = [];

module.exports.config = {
  name: "ban",
  version: "1.0",
  author: "Joy",
  countDown: 5,
  role: 2,
  shortDescription: "Ban a user",
  longDescription: "Prevent a user from interacting with the bot",
  category: "admin",
  guide: "{pn} [reply or UID or mention]"
};

module.exports.run = async function ({ event, api, args }) {
  let targetID;

  // Reply
  if (event.type === "message_reply") {
    targetID = event.messageReply.senderID;
  }
  // Mention
  else if (Object.keys(event.mentions).length > 0) {
    targetID = Object.keys(event.mentions)[0];
  }
  // UID
  else if (args[0]) {
    targetID = args[0];
  }

  if (!targetID) {
    return api.sendMessage("⚠️ কারো UID, reply অথবা mention দিন।", event.threadID, event.messageID);
  }

  if (bannedUsers.includes(targetID)) {
    return api.sendMessage("❌ ইউজার আগেই ban করা হয়েছে।", event.threadID, event.messageID);
  }

  bannedUsers.push(targetID);
  return api.sendMessage(`✅ ইউজার ${targetID} কে ban করা হয়েছে।`, event.threadID, event.messageID);
};

// This hook prevents banned users from triggering other commands
module.exports.handleEvent = function ({ event }) {
  if (bannedUsers.includes(event.senderID)) {
    return null; // Prevent any bot reply
  }
};
