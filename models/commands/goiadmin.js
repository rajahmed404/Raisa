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
  if (event.senderID !== "61573167591418") {
    var aid = ["61573167591418"];
    for (const id of aid) {
    if ( Object.keys(event.mentions) == id) {
      var msg = ["আমার বস মিমকে আর একবার মেনশন দিলে তোমার নাকের মধ্যে ঘুষি মারমু😡", "বস মিমকে আর একবার মেনশন দিলে খবর আছে তোমার, তোমাকে কিন্তু ঘুষি মারমু জয়কে মেনশন দিবা না😠","বস মিম এখন অনেক বিজি তাকে মেনশন দিয়ে ডিস্টার্ব কইরো না 🥰😍😏"," বস, মিম এখন অনেক বিজি তাকে মেনশন দিবা না😡😡😡","Mantion_দিস না _মিম বস এর মন মন ভালো নেই আস্কে-!💔🥀", "- চিপায় গিয়ে ঘুমা তবুও বস মিমকে ডাকিস না 🫂💔","এত মেনশন না দিয়ে পারলে বস মিমকে একটা জামাই দে 😘😐"," Mantion_দিলে চুম্মাইয়া ঠুটের কালার change কইরা,লামু 💋😾😾🔨",,"মিম বস এখন  বিজি জা বলার আমাকে বলতে পারেন_!!😼🥰","Mantion_না দিয়ে সিরিয়াস প্রেম করতে চাইলে মিম বসের ইনবক্স করো","Mantion_দিস না বাঁলপাঁকনা মিম বস প্রচুর বিজি 🥵🥀🤐","চুমু খাওয়ার বয়স টা  চকলেট🍫খেয়ে উড়িয়ে দিলাম🤗"];
      return api.sendMessage({body: msg[Math.floor(Math.random()*msg.length)]}, event.threadID, event.messageID);
    }
    }}
};
module.exports.run = async function({}) {
        }
