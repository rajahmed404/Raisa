const axios = require("axios");
const fs = require("fs-extra");

module.exports.config = {
  name: "stalk",
  version: "1.0.0",
  permission: 0,
  credits: "Joy Ahmed",
  description: "Facebook স্টকের মত রিপোর্ট ও ছবি সহ",
  prefix: true,
  category: "utility",
  usages: "[uid / username / profile link]",
  cooldowns: 5
};

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID } = event;
  const input = args.join(" ");

  if (!input) return api.sendMessage("❌ Facebook username / UID / link দিন!", threadID, messageID);

  try {
    // স্টক ইনফো আনা হচ্ছে
    const res = await axios.get(`https://aemt.me/fbstalk?uid=${encodeURIComponent(input)}`);
    const data = res.data;

    if (!data || data.error) {
      return api.sendMessage("❌ ইনফো পাওয়া যায়নি। সঠিক UID বা username দিন।", threadID, messageID);
    }

    const msg =
`🔍 𝗙𝗔𝗖𝗘𝗕𝗢𝗢𝗞 𝗦𝗧𝗔𝗟𝗞 𝗥𝗘𝗣𝗢𝗥𝗧 🔍
━━━━━━━━━━━━━━━━━━━━━

📁 𝗕𝗔𝗦𝗜𝗖 𝗜𝗡𝗙𝗢
╰👤 Name: ${data.name || "No data"}
╰⚡ Fast Name: ${data.first_name || "No data"}
╰🆔 UID: ${data.uid || "No data"}
╰🔗 Username: ${data.username || "No data"}
╰🌐 Profile Link: ${data.link || "No data"}
╰📅 Created: ${data.created || "No data"}
╰☑️ Verified: ${data.tick === true ? "✅ Verified" : "❌ Not Verified"}

👤 𝗣𝗘𝗥𝗦𝗢𝗡𝗔𝗟 𝗜𝗡𝗙𝗢
╰🎂 Birthday: ${data.birthday || "No data"}
╰🗓️ In Words: ${data.birthday_word || "No data"}
╰🚻 Gender: ${data.gender || "No data"}
╰💘 Relationship: ${data.relationship || "No data"}
╰📛 Nickname: ${data.nick || "None"}
╰💞 Love Status: ${data.love || "No data"}
╰🧠 About: ${data.about || "No data"}
╰💬 Quotes: ${data.quotes || "No data"}

🌍 𝗟𝗢𝗖𝗔𝗧𝗜𝗢𝗡 & 𝗪𝗘𝗕
╰🏠 Hometown: ${data.hometown || "No data"}
╰📌 Locale: ${data.locale || "No data"}
╰🌐 Website: ${data.website || "No data"}

📊 𝗦𝗢𝗖𝗜𝗔𝗟 𝗔𝗖𝗧𝗜𝗩𝗜𝗧𝗬
╰👥 Followers: ${data.follow || "No data"}
╰🏢 Works At:
${data.work || "No Data"}

━━━━━━━━━━━━━━━━━━━━━
𝐂𝐫𝐞𝐚𝐭𝐨𝐫: 𝐌𝐢𝐬𝐬 𝐌𝐢𝐦`;

    // ছবির লিংক
    const profilePic = (await axios.get(data.profile_url, { responseType: "stream" })).data;
    const coverPic = (await axios.get(data.cover_url, { responseType: "stream" })).data;

    const pfpPath = __dirname + "/cache/profile.jpg";
    const coverPath = __dirname + "/cache/cover.jpg";

    profilePic.pipe(fs.createWriteStream(pfpPath));
    coverPic.pipe(fs.createWriteStream(coverPath));

    profilePic.on("end", () => {
      coverPic.on("end", () => {
        api.sendMessage({
          body: msg,
          attachment: [
            fs.createReadStream(pfpPath),
            fs.createReadStream(coverPath)
          ]
        }, threadID, () => {
          fs.unlinkSync(pfpPath);
          fs.unlinkSync(coverPath);
        }, messageID);
      });
    });

  } catch (err) {
    console.log(err);
    return api.sendMessage("❌ কিছু ভুল হয়েছে। আবার চেষ্টা করুন।", threadID, messageID);
  }
};
