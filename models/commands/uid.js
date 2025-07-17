const fs = require("fs-extra");
const request = require("request");

module.exports.config = {
  name: "uid",
  version: "1.0.0",
  permission: 0,
  credits: "Joy-Ahmed | Modified for Merai by ChatGPT",
  prefix: true,
  description: "Get Facebook UID with profile picture",
  category: "info",
  cooldowns: 5
};

module.exports.run = async function({ api, event, args, Users }) {
  const getPicAndSend = async (uid, name) => {
    const callback = () => {
      api.sendMessage({
        body: `🔍 𝗨𝗜𝗗 𝗜𝗡𝗙𝗢 🔍\n━━━━━━━━━━━━━━\n👤 Name: ${name}\n🆔 UID: ${uid}\n🔗 Profile: https://facebook.com/${uid}\n━━━━━━━━━━━━━━\n𝐂𝐫𝐞𝐚𝐭𝐨𝐫: 𝐌𝐢𝐬𝐬 𝐌𝐢𝐦`,
        attachment: fs.createReadStream(__dirname + "/cache/profile.png")
      }, event.threadID, () => fs.unlinkSync(__dirname + "/cache/profile.png"), event.messageID);
    };

    request(encodeURI(`https://graph.facebook.com/${uid}/picture?width=720&height=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`))
      .pipe(fs.createWriteStream(__dirname + "/cache/profile.png"))
      .on("close", callback);
  };

  // ✅ Reply to someone
  if (event.type === "message_reply") {
    const uid = event.messageReply.senderID;
    const name = await Users.getNameUser(uid);
    return getPicAndSend(uid, name);
  }

  // ✅ Mention someone
  if (Object.keys(event.mentions).length > 0) {
    const uid = Object.keys(event.mentions)[0];
    const name = Object.values(event.mentions)[0];
    return getPicAndSend(uid, name);
  }

  // ✅ Link input
  if (args[0]?.includes(".com/")) {
    try {
      const resUID = await api.getUID(args[0]);
      return getPicAndSend(resUID, "From Link");
    } catch (e) {
      return api.sendMessage("❌ লিংক থেকে UID পাওয়া যায়নি।", event.threadID, event.messageID);
    }
  }

  // ✅ No input = self
  const uid = event.senderID;
  const name = await Users.getNameUser(uid);
  return getPicAndSend(uid, name);
};
