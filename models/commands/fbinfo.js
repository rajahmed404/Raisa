const axios = require("axios");

module.exports.config = {
  name: "fbinfo",
  version: "1.0.0",
  permission: 0,
  credits: "Joy Ahmed",
  description: "Facebook ID এর নাম, UID, ফলোয়ার, জন্মদিন, ফ্রেন্ড সংখ্যা বের করে",
  prefix: true,
  category: "utility",
  usages: "[uid / profile link]",
  cooldowns: 5
};

module.exports.run = async function ({ api, event, args }) {
  const { threadID, messageID } = event;
  let input = args.join(" ");

  if (!input) return api.sendMessage("❌ একটি ফেসবুক আইডি বা লিঙ্ক দিন।", threadID, messageID);

  try {
    // Check if input is URL
    if (input.includes("facebook.com")) {
      const res = await axios.get(`https://www.api.vyturex.com/fbuid?url=${encodeURIComponent(input)}`);
      if (!res.data?.uid) return api.sendMessage("❌ লিঙ্ক থেকে UID পাওয়া যায়নি।", threadID, messageID);
      input = res.data.uid;
    }

    // Get FB info
    const info = await axios.get(`https://aemt.me/fbinfo?id=${input}`);
    const data = info.data;

    if (data.error) {
      return api.sendMessage("❌ ইনফরমেশন পাওয়া যায়নি। UID সঠিক কিনা চেক করুন।", threadID, messageID);
    }

    const msg = 
`╭╼|━━━━━━━━━━━━━━|╾╮
📄 Facebook Profile Info
━━━━━━━━━━━━━━━
👤 নাম: ${data.name || "N/A"}
🆔 UID: ${data.id || "N/A"}
🎂 জন্মদিন: ${data.birthday || "N/A"}
👥 ফ্রেন্ড সংখ্যা: ${data.friends || "N/A"}
👣 ফলোয়ার: ${data.follow || "N/A"}
━━━━━━━━━━━━━━━
𝐂𝐫𝐞𝐚𝐭𝐨𝐫: 𝐌𝐢𝐬𝐬 𝐌𝐢𝐦
╰╼|━━━━━━━━━━━━━━|╾╯`;

    return api.sendMessage(msg, threadID, messageID);

  } catch (e) {
    console.log(e);
    return api.sendMessage("❌ কিছু ভুল হয়েছে, আবার চেষ্টা করুন।", threadID, messageID);
  }
};
