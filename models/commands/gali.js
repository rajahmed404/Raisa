module.exports.config = {
  config: {
    name: "gali",
    aliases: [],
    version: "1.0",
    author: "Joy",
    countDown: 5,
    role: 0,
    shortDescription: {
      en: "Gives a random abusive message with name",
      bn: "গালি দেয় নামসহ"
    },
    longDescription: {
      en: "Mentions or replies to a user with a randomly selected abusive message including their name",
      bn: "reply বা UID mention করলে ইউজারের নামসহ গালি দিবে"
    },
    category: "fun",
    guide: {
      en: "{pn} [reply to user or mention UID]",
      bn: "{pn} [reply বা uid mention করুন]"
    }
  },

  onStart: async function ({ api, event, args, Users }) {
    const galiList = [
      "হাই মাদারচোদ তর তর ব্যাশা জাতের আম্মু টা রে আদর করে করে চুদি 🥵",
      "কান্দে ফালাইয়া তর মায়েরে চুদি💉।",
      "টুকাই মাগির পোলা তর মার ভোদায় পাব্লিক টয়লেট।🤟",
      "depression থেকেও তর মাইরে চু*** দি 🤬",
      "জং ধরা লোহা দিয়া পাকিস্তানের মানচিত্র বানাই্য়া তোদের পিছন দিয়া ঢুকামু।🤬",
      "তর মায়ের ভোদা বোম্বাই মরিচ দিয়া চুদামু।💔!",
      "কুত্তার বাচ্ছা তর বৌন ভোদায় মাগুর মাছ চাষ করুম।😍..",
      "অনলাইনে গালি বাজ হয়ে গেছত মাগির পোলা এমন চুদা দিমু লাইফ টাইম মনে রাখভি সাগর তর বাপ মাগির ছেলে 😘।",
      "আসো তোমাকে একটা গান শুনাই । আঁকে বাঁকে চলে নদী তর মায়রে আমি চুদি ।😌"
    ];

    const randomGali = galiList[Math.floor(Math.random() * galiList.length)];

    let uid;
    if (event.type === "message_reply" && event.messageReply.senderID) {
      uid = event.messageReply.senderID;
    } else if (args[0]) {
      const mentionMatch = args[0].match(/\d+/);
      uid = mentionMatch ? mentionMatch[0] : event.senderID;
    } else {
      uid = event.senderID;
    }

    let name = "User";
    try {
      const userInfo = await api.getUserInfo(uid);
      name = userInfo[uid]?.name || "User";
    } catch (e) {
      console.error("Failed to fetch user info:", e);
    }

    const msg = `${name}, --${randomGali}`;

    return api.sendMessage({
      body: msg,
      mentions: [{ id: uid, tag: name }]
    }, event.threadID, event.messageID);
  }
};
