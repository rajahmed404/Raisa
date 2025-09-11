// file name: uid.js
const fs = require("fs");

module.exports.config = {
  name: "uid",
  version: "1.0.0",
  permission: 0, // 0 = everyone
  prefix: true,
  credits: "Joy Ahmed",
  description: "Get UID of a user (mention / reply / id).",
  category: "info",
  usages: "uid [id]",
  cooldowns: 5,
};

module.exports.run = async function ({ api, event, args }) {
  try {
    const { threadID, messageID, senderID, mentions } = event;

    // 1) If there's a mention, take the first mentioned user's id
    let targetID = null;
    if (mentions && Object.keys(mentions).length) {
      targetID = Object.keys(mentions)[0];
    }

    // 2) If command was used as a reply to a message, use the replied-to senderID
    else if (event.type === "message_reply" && event.messageReply && event.messageReply.senderID) {
      targetID = event.messageReply.senderID;
    }

    // 3) If user provided an id as arg
    else if (args && args.length && args[0]) {
      const maybe = args[0].toString().trim();
      // allow plain numeric ids, also allow profile links (extract digits)
      const digits = maybe.match(/\d+/g);
      if (digits) targetID = digits.join("");
      else targetID = maybe;
    }

    // 4) fallback to sender
    if (!targetID) targetID = senderID;

    // Try to fetch user info (many Merai/facebook wrappers accept array or single id)
    const sendFallback = () => {
      const profile = `https://facebook.com/${targetID}`;
      return api.sendMessage(
        `🆔 UID: ${targetID}\n\nProfile: ${profile}`,
        threadID,
        messageID
      );
    };

    // Some api implementations: api.getUserInfo([id], cb) -> returns object keyed by id
    // Some: api.getUserInfo(id, cb)
    // We'll try both patterns and fallback gracefully
    try {
      api.getUserInfo([targetID], (err, info) => {
        if (err || !info) return sendFallback();
        const user = info[targetID] || (Array.isArray(info) ? info[0] : info);
        const name = (user && (user.name || user.fullName || user.firstName)) || null;
        const profile = `https://facebook.com/${targetID}`;
        if (name) {
          return api.sendMessage(
            `🆔 UID for ${name}:\n\n• ID: ${targetID}\n• Profile: ${profile}`,
            threadID,
            messageID
          );
        } else return sendFallback();
      });
    } catch (e) {
      // try alternate signature
      try {
        api.getUserInfo(targetID, (err, info) => {
          if (err || !info) return sendFallback();
          // info might be object keyed by id or direct user object
          const user = info[targetID] || (Array.isArray(info) ? info[0] : info);
          const name = (user && (user.name || user.fullName || user.firstName)) || null;
          const profile = `https://facebook.com/${targetID}`;
          if (name) {
            return api.sendMessage(
              `🆔 UID for ${name}:\n\n• ID: ${targetID}\n• Profile: ${profile}`,
              threadID,
              messageID
            );
          } else return sendFallback();
        });
      } catch (err) {
        return sendFallback();
      }
    }
  } catch (err) {
    console.error(err);
    return api.sendMessage("⚠️ Error occurred while fetching UID.", event.threadID, event.messageID);
  }
};
