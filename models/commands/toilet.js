const fs = require("fs-extra");
const path = require("path");
const axios = require("axios");
const jimp = require("jimp");

module.exports.config = {
  name: "toilet",
  version: "1.0.0",
  permission: 0, // Everyone can run, but admin check will happen inside
  credits: "Nazrul & Joy Edit",
  description: "Tag someone to throw them in the toilet (Admin only)",
  prefix: true,
  category: "user",
  commandCategory: "user",
  usages: "@mention",
  cooldowns: 5,
  dependencies: {
    "fs-extra": "",
    "axios": "",
    "canvas": "",
    "jimp": "",
    "node-superfetch": ""
  }
};

module.exports.onLoad = async () => {
  const toiletPath = path.join(__dirname, "cache", "toilet.png");
  const cacheDir = path.join(__dirname, "cache");
  if (!fs.existsSync(cacheDir)) fs.mkdirSync(cacheDir, { recursive: true });
  if (!fs.existsSync(toiletPath)) {
    const imgUrl = "https://drive.google.com/uc?id=13ZqFryD-YY-JTs34lcy6b_w36UCCk0EI&export=download";
    const res = await axios.get(imgUrl, { responseType: "arraybuffer" });
    fs.writeFileSync(toiletPath, Buffer.from(res.data, "utf-8"));
  }
};

async function makeImage({ one, two }) {
  const avatarUrl = (uid) => `https://graph.facebook.com/${uid}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;

  const baseImage = await jimp.read(path.join(__dirname, "cache", "toilet.png"));
  const oneAvatar = await jimp.read(await circle(await downloadTemp(avatarUrl(one), `avt_${one}.png`)));
  const twoAvatar = await jimp.read(await circle(await downloadTemp(avatarUrl(two), `avt_${two}.png`)));

  baseImage.resize(292, 345)
    .composite(oneAvatar.resize(70, 70), 100, 200)
    .composite(twoAvatar.resize(70, 70), 100, 200);

  const outPath = path.join(__dirname, "cache", `toilet_${one}_${two}.png`);
  await baseImage.writeAsync(outPath);
  return outPath;
}

async function downloadTemp(url, filename) {
  const res = await axios.get(url, { responseType: "arraybuffer" });
  const filePath = path.join(__dirname, "cache", filename);
  fs.writeFileSync(filePath, Buffer.from(res.data, "utf-8"));
  return filePath;
}

async function circle(imgPath) {
  const image = await jimp.read(imgPath);
  image.circle();
  return await image.getBufferAsync(jimp.MIME_PNG);
}

module.exports.run = async function ({ event, api, args }) {
  const { threadID, messageID, senderID, mentions } = event;
  const botAdmins = global.GoatBot.config.adminBot || [];

  // Permission Check
  if (!botAdmins.includes(senderID)) {
    return api.sendMessage("❌ এই কমান্ডটি শুধুমাত্র বট অ্যাডমিনের জন্য!", threadID, messageID);
  }

  const mentionIDs = Object.keys(mentions);
  if (mentionIDs.length === 0) {
    return api.sendMessage("⚠️ দয়া করে কাউকে ট্যাগ করুন!", threadID, messageID);
  }

  const targetID = mentionIDs[0];
  const imagePath = await makeImage({ one: senderID, two: targetID });

  const msg = {
    body: "বেশি বাল পাকলামির জন্য তোরে টয়লেটে ফেলে দিলাম। এবার লে ঠেলা বুঝ\nগু খা😁😁🤣🤣\n𝐂𝐫𝐞𝐚𝐭𝐨𝐫 ━➢ 𝐑𝐚𝐢𝐬𝐚 𝐀𝐤𝐭𝐞𝐫 𝐌𝐢𝐦",
    attachment: fs.createReadStream(imagePath)
  };

  api.sendMessage(msg, threadID, () => fs.unlinkSync(imagePath), messageID);
};
