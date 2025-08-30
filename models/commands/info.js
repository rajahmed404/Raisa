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
  const fbUID = "61556784100954";
  const imgURL = `https://graph.facebook.com/${fbUID}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;
  const imgPath = __dirname + "/cache/info.png";

  const msg = `
╭╼|━━━━━━━━━━━━━━|╾╮
🙋‍♂️ না্ঁম্ঁ- রা্ঁজ্‌ আ্ঁহ্ঁমে্ঁদ্ঁ 
🍒 বা্ঁসা্ঁ-ব্ঁরি্ঁশা্ঁল্ঁ স্ঁদ্ঁর্ঁ
🧕🏻 ধ্ঁর্ম-ই্ঁস্ঁলা্ঁম্ঁ
🎂 জ্ঁন্মদি্ঁন্ঁ: ০২ মার্চ ২০০৩
📚 | 💔 অ্ঁবি্ঁবা্ঁহি্ঁত্ঁ
❤️ রিলেশন: সিংগেল ☺️
💌 ভালোবাসে: বিড়াল 🐱, বই 📚, গান 🎶
🩸 রক্তের গ্রুপ: B+
🧠 প্রিয় খেলা: ফ্রী ফায়ার 
🏠 ঠিকানা: বরিশাল সদর
✉️ ইমেইল: ******@gmail.com
📞 ফোন: wa.me/+8801313186145
🔗 প্রোফাইল: :https://www.facebook.com/profile.php?id=61556784100954/${fbUID}
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
