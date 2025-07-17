const axios = require('axios');
const fs = require("fs");
const path = require("path");

const baseApiUrl = async () => {
  const base = await axios.get(`https://raw.githubusercontent.com/Mostakim0978/D1PT0/refs/heads/main/baseApiUrl.json`);
  return base.data.api;
};

const localDbPath = path.join(__dirname, "..", "localTeachDB.json");

function loadLocalDB() {
  if (!fs.existsSync(localDbPath)) {
    fs.writeFileSync(localDbPath, JSON.stringify({}), "utf-8");
  }
  const raw = fs.readFileSync(localDbPath, "utf-8");
  return JSON.parse(raw);
}

function saveLocalDB(db) {
  fs.writeFileSync(localDbPath, JSON.stringify(db, null, 2), "utf-8");
}

module.exports.config = {
  name: "teach",
  version: "1.0",
  credits: "Joy",
  cooldowns: 0,
  hasPermssion: 0,
  description: "Local + remote teach system with .teach command",
  commandCategory: "chat",
  usePrefix: true,
  prefix: true,
  usages: `.teach [trigger] - [reply1], [reply2], [reply3]...`,
};

module.exports.run = async function ({ api, event, args, Users }) {
  try {
    const link = `${await baseApiUrl()}/baby`;
    const input = args.join(" ").toLowerCase();
    const uid = event.senderID;

    if (!input.includes(" - ")) {
      return api.sendMessage(
        "❌ Usage: .teach <trigger> - <reply1>, <reply2>, <reply3>...\nExample: .teach hello - Hi!, Hello there!",
        event.threadID,
        event.messageID
      );
    }

    const [triggerRaw, repliesRaw] = input.split(" - ");
    const trigger = triggerRaw.trim();
    const replies = repliesRaw.split(",").map(r => r.trim()).filter(Boolean);

    if (!trigger || replies.length === 0) {
      return api.sendMessage(
        "❌ Invalid format. Provide trigger and at least one reply.\nExample: .teach hello - Hi!, Hello there!",
        event.threadID,
        event.messageID
      );
    }

    // Save locally
    let localDB = loadLocalDB();
    if (!localDB[trigger]) localDB[trigger] = [];
    localDB[trigger].push(...replies);
    saveLocalDB(localDB);

    // Save remotely
    const re = await axios.get(`${link}?teach=${encodeURIComponent(trigger)}&reply=${encodeURIComponent(replies.join(','))}&senderID=${uid}`);
    const name = await Users.getName(re.data.teacher) || "unknown";

    return api.sendMessage(
      `✅ Successfully taught new replies for "${trigger}"\nTeacher: ${name}\nReplies: ${replies.join(", ")}`,
      event.threadID,
      event.messageID
    );

  } catch (e) {
    console.error('Error in .teach command:', e);
    return api.sendMessage(`Error: ${e.message}`, event.threadID, event.messageID);
  }
};
