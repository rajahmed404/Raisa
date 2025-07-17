const moment = require("moment-timezone");

module.exports.config = {
  name: "autotime",
  version: "1.0.6",
  permission: 0,
  credits: "Joy Ahmed",
  description: "24 ghonta auto message with Asia/Dhaka timezone",
  prefix: true,
  category: "user",
  usages: "",
  cooldowns: 5
};

const timeMessages = [
  { timer: '12:00 AM', message: '🌙 এখন রাত ১২টা বাজে, সবাই ঘুমাতে যাও' },
  { timer: '1:00 AM', message: '😴 এখন রাত ১টা, প্রেম না কইরা ঘুমা বেক্কল' },
  { timer: '2:00 AM', message: '🌌 এখন রাত ২টা, ছ্যাকা খাওয়া পাবলিক জাগে 😿' },
  { timer: '3:00 AM', message: '💤 এখন রাত ৩টা, প্রোগ্রামার ভাইয়েরা হয়ত কোড করতেছে' },
  { timer: '4:00 AM', message: '🕓 এখন রাত ৪টা বাজে, ফজরের আজান দিতে দেরি নাই' },
  { timer: '5:00 AM', message: '🕌 এখন ভোর ৫টা, নামাজ পড়ে নিও' },
  { timer: '6:00 AM', message: '🌅 সকাল ৬টা বাজে, ঘুম থেকে উঠো' },
  { timer: '7:00 AM', message: '🍽 সকাল ৭টা, সকালের খাবার খেয়েছো তো?' },
  { timer: '8:00 AM', message: '🏃 সকাল ৮টা, কাজ/স্কুলে বেরিয়ে যাও' },
  { timer: '9:00 AM', message: '💼 সকাল ৯টা, মন দিয়ে কাজ করো' },
  { timer: '10:00 AM', message: '☕ সকাল ১০টা, এক কাপ চা খেয়ে নাও' },
  { timer: '11:00 AM', message: '🕚 সকাল ১১টা, একটু রেস্ট নাও' },
  { timer: '12:00 PM', message: '🍛 দুপুর ১২টা, খাবার রেডি করো' },
  { timer: '1:00 PM', message: '🛌 দুপুর ১টা, একটু বিশ্রাম নাও' },
  { timer: '2:00 PM', message: '🕌 দুপুর ২টা, জোহরের নামাজ পড়েছো?' },
  { timer: '3:00 PM', message: '🌞 দুপুর ৩টা, পানি খাও রোদে পুড়ো না' },
  { timer: '4:00 PM', message: '🍵 বিকাল ৪টা, এক কাপ চা সময়' },
  { timer: '5:00 PM', message: '🕌 বিকাল ৫টা, আসরের নামাজ পড়ো' },
  { timer: '6:00 PM', message: '🌇 সন্ধ্যা ৬টা, ঘরে ফিরে এসো' },
  { timer: '7:00 PM', message: '🕌 সন্ধ্যা ৭টা, মাগরিবের নামাজ পড়ো' },
  { timer: '8:00 PM', message: '📺 রাত ৮টা, পরিবার নিয়ে সময় কাটাও' },
  { timer: '9:00 PM', message: '🛏 রাত ৯টা, ঘুমের প্রস্তুতি নাও' },
  { timer: '10:00 PM', message: '🌙 রাত ১০টা, শুয়ে পড়ো সবাই' },
  { timer: '11:00 PM', message: '😴 রাত ১১টা, ঘুম আসতেছে?' }
];

let lastSentTime = null;

module.exports.onLoad = function ({ api }) {
  setInterval(async () => {
    const now = moment().tz("Asia/Dhaka");
    const currentTime = now.format("h:mm A"); // Example: 5:00 PM

    const match = timeMessages.find(item => item.timer === currentTime);
    if (!match || lastSentTime === currentTime) return;

    lastSentTime = currentTime;
    const message = `🕒 ${match.message}\n\n👑 Created by: Miss Mim`;

    try {
      const threads = await api.getThreadList(100, null, ["INBOX"]);
      const threadIDs = threads.filter(t => t.isGroup || t.name).map(t => t.threadID);

      for (const threadID of threadIDs) {
        api.sendMessage(message, threadID);
      }

      console.log(`[autotime] ✅ Sent to ${threadIDs.length} threads at ${currentTime}`);
    } catch (err) {
      console.log("[autotime] ❌ Error:", err.message);
    }

  }, 1000); // প্রতি সেকেন্ডে চেক করে
};

module.exports.run = () => {};
