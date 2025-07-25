const fs = require("fs-extra");
const request = require("request");

module.exports.config = {
  name: "info",
  version: "1.0.0",
  permission: 0,
  credits: "Joy Ahmed",
  description: "ব্যক্তিগত তথ্য বক্স",
  commandCategory: "prefix",
  usages: "",
  cooldowns: 5,
};

module.exports.run = async function({ api, event }) {
  const fbUID = "100080837633857";
  const imgURL = `https://graph.facebook.com/${fbUID}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;
  const imgPath = __dirname + "/cache/info.png";

  const msg = `
╭╼|━━━━━━━━━━━━━━|╾╮
👧🏻 𝓜𝓲𝓼𝓼 𝓜𝓲𝓶 | 𝑴𝑰𝑺𝑺 𝑴𝑰𝑴
🍒 পিঁচ্ছি মিঁম
🧕🏻 ইসলাম | মেয়ে | বয়স: 𝟭𝟲+
🎂 জন্মদিন: ০২ মার্চ ২০০৮
📚 ছাত্র | 💔 অবিবাহিত
❤️ রিলেশন: সিংগেল ☺️
💌 ভালোবাসে: বিড়াল 🐱, বই 📚, গান 🎶
🩸 রক্তের গ্রুপ: B+
🧠 প্রিয় বিষয়: জীববিজ্ঞান
🏠 ঠিকানা: লোহাগড়া, নড়াইল
✉️ ইমেইল: ******@gmail.com
📞 ফোন: wa.me/+88017********
🔗 প্রোফাইল: fb.com/${fbUID}
╰╼|━━━━━━━━━━━━━━|╾╯`;

  request(encodeURI(imgURL))
    .pipe(fs.createWriteStream(imgPath))
    .on("close", () =>
      api.sendMessage(
        {
          body: msg,
          attachment: fs.createReadStream(imgPath),
        },
        event.threadID,
        () => fs.unlinkSync(imgPath)
      )
    );
};
