module.exports.config = {
  name: "goiadmin",
  version: "1.0.0",
  hasPermssion: 0,
  credits: "JOY",
  description: "Bot will rep ng tag admin or rep ng tagbot ",
  commandCategory: "Other",
  usages: "",
  cooldowns: 1
};
module.exports.handleEvent = function({ api, event }) {
  if (event.senderID !== "61556784100954") {
    var aid = ["61556784100954"];
    for (const id of aid) {
    if ( Object.keys(event.mentions) == id) {
      var msg = ["আমার বস রাজ কে আর একবার মেনশন দিলে তোমার নাকের মধ্যে ঘুষি মারমু😡", "বস রাজ কে আর একবার মেনশন দিলে খবর আছে তোমার, তোমাকে কিন্তু ঘুষি মারমু রাজকে মেনশন দিবা না😠","বস রাজ এখন অনেক বিজি তাকে মেনশন দিয়ে ডিস্টার্ব কইরো না 🥰😍😏"," বস, রাজ এখন অনেক বিজি তাকে মেনশন দিবা না😡😡😡","Mantion_দিস না _রাজ বস এর মন মন ভালো নেই আসকে-!💔🥀", "- চিপায় গিয়ে ঘুমা তবুও বস রাজ কে ডাকিস না 🫂💔","এত মেনশন না দিয়ে পারলে বস রাজ কে একটা বউ দে 😘😐"," Mantion_দিলে চুম্মাইয়া ঠুটের কালার change কইরা,লামু 💋😾😾🔨",,"রাজ বস এখন  বিজি জা বলার আমাকে বলতে পারেন_!!😼🥰","Mantion_না দিয়ে সিরিয়াস প্রেম করতে চাইলে রাজ বসের ইনবক্স করো","Mantion_দিস না বাঁলপাঁকনা রাজ বস প্রচুর বিজি 🥵🥀🤐","চুমু খাওয়ার বয়স টা  চকলেট🍫খেয়ে উড়িয়ে দিলাম🤗"];
      return api.sendMessage({body: msg[Math.floor(Math.random()*msg.length)]}, event.threadID, event.messageID);
    }
    }}
};
module.exports.run = async function({}) {
        }
