const fs = global.nodemodule["fs-extra"];
module.exports.config = {
  name: "bot",
  version: "1.0.1",
  hasPermssion: 0,
 credits: "JOY",
  description: "goibot",
  commandCategory: "Noprefix",
  usages: "noprefix",
  cooldowns: 5,
};
module.exports.handleEvent = async function({ api, event, args, Threads, Users }) {
  var { threadID, messageID, reason } = event;
  const moment = require("moment-timezone");
  const time = moment.tz("Asia/Manila").format("HH:MM:ss L");
  var idgr = `${event.threadID}`;
  var id = event.senderID;
  var name = await Users.getNameUser(event.senderID);

  var tl = ["আমি এখন আমার বস ❤️‍🔥𒄬𓆩๛⃝ মিম ❤️‍🔥 এর সাথে বিজি আছি", "শুনবো না 😎 তুমি এখনো পর্যন্ত আমার মিম বসকে জামাই দাও নাই 😒(তুমি পঁচা 🙁", "আমার মিম বস ও তোমাকে ভালোবাসে😘🫂", "পাগল ছাগল পাবনা থেকে ছাড়ে কেন মানুষের নাম জানেনা আমার নাম বাবু-😍💋💝", " আরেকবার বট বললে মিম বসকে বিচার দিবো বাবু বলতে তোর সমস্যা কি 😡?","আমাকে না ডেকে আমার বস ❤️‍🔥𒄬𓆩๛⃝ মিম এর ‣᭄𓆪❤️‍🔥 সাথে চিপায় যাও", "তুমি ছেলে হলে আমার বস মিম কে নক দিতে পারো 😘 ", "জান বাল ফালাবা ,🙂","আর একবার বট বললে চুমা দিয়া ঠোঁটের কালার চেঞ্জ করে দিমু 😡🙂", "জান বস মিম এর পক্ষ থেকে তোমার অলিতে গলিতে উম্মা😘😘","বাবু ডাকলে ললিপপ কিনে দিবো আমার বস মিম  🙂🖤","তোকে আগেই বলছি গাড়ি খেয়ে মধ চালাস না আমার নাম বাবু জানস না  🫦🙈","আমাকে না ডেকে বস মিমকে মিস কল দেও 017👈,🙈😽","ছেলে হলে মিম বসের সাথে চিপায় যাও জানু 😇🖤🥀"];
  var rand = tl[Math.floor(Math.random() * tl.length)]
  if (event.body.indexOf("বট") == 0 || (event.body.indexOf("Bot") == 0)) {
    var msg = {
      body: `${name}, ${rand}`
    }
    return api.sendMessage(msg, threadID, messageID);
  };

}

module.exports.run = function({ api, event, client, __GLOBAL }) { }
