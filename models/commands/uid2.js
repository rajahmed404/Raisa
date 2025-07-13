const axios = require("axios");

module.exports.config = {
  name: "uid2",
  version: "1.0",
  author: "Joy",
  countDown: 5,
  role: 0,
  shortDescription: {
    en: "Get UID from Facebook profile URL"
  },
  longDescription: {
    en: "Fetch UID from a Facebook profile link"
  },
  category: "utility",
  guide: {
    en: "{pn} [Facebook profile URL]"
  }
};

module.exports.onStart = async function ({ message, args, event }) {
  const url = args[0];

  if (!url || !url.includes("facebook.com")) {
    return message.reply("❌ একটি সঠিক Facebook প্রোফাইল লিংক দিন।\nউদাহরণ: https://www.facebook.com/maya.moni.733878");
  }

  try {
    const res = await axios.get(`https://api.tekcomp.com/fbuid?url=${encodeURIComponent(url)}`);
    if (res.data && res.data.uid) {
      return message.reply(`✅ প্রোফাইল UID: ${res.data.uid}`);
    } else {
      return message.reply("❌ UID পাওয়া যায়নি। প্রোফাইল লিংকটি সঠিক কিনা যাচাই করুন।");
    }
  } catch (err) {
    console.error(err);
    return message.reply("❌ UID বের করতে সমস্যা হয়েছে। পরে আবার চেষ্টা করুন।");
  }
};
