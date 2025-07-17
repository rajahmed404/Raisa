const fs = require("fs-extra");
const request = require("request");

module.exports.config = {
  name: "uid",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "JOY | Modified by ChatGPT",
  description: "Get User ID with profile picture",
  commandCategory: "Tools",
  cooldowns: 5
};

module.exports.run = async function({ api, event, Users }) {
  const mentions = event.mentions;
  const sendUIDWithPic = async (uid, name) => {
    const imgPath = __dirname + `/cache/${uid}.jpg`;
    const picURL = `https://graph.facebook.com/${uid}/picture?width=720&height=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;
    
    request(encodeURI(picURL))
      .pipe(fs.createWriteStream(imgPath))
      .on("close", () => {
        api.sendMessage({
          body: `👤 𝗡𝗮𝗺𝗲: ${name}\n🆔 𝗨𝗜𝗗: ${uid}\n🔗 𝗟𝗶𝗻𝗸: https://facebook.com/${uid}`,
          attachment: fs.createReadStream(imgPath)
        }, event.threadID, () => fs.unlinkSync(imgPath), event.messageID);
      });
  };

  // No mentions → self UID
  if (Object.keys(mentions).length === 0) {
    const uid = event.senderID;
    const name = await Users.getNameUser(uid);
    return sendUIDWithPic(uid, name);
  }

  // Mentions → get each person's UID
  for (const [uid, name] of Object.entries(mentions)) {
    await sendUIDWithPic(uid, name.replace("@", ""));
  }
};
