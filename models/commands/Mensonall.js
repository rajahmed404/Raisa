module.exports.config = {
  name: "mensonall",
  version: "1.0.0",
  permission: 0,
  prefix: true,
  credits: "Sohidul",
  description: "এক এক করে সবাইকে mention দিয়ে কল এ ডাকবে",
  category: "group",
  usages: "mensonall",
  cooldowns: 10
};

module.exports.run = async function ({ api, event, Users }) {
  if (!event.isGroup) {
    return api.sendMessage("⚠️ এই কমান্ড শুধু গ্রুপে ব্যবহার করা যাবে!", event.threadID);
  }

  let all = event.participantIDs; // গ্রুপের সব UID

  for (let uid of all) {
    try {
      // ইউজারের নাম বের করার চেষ্টা
      let name;
      if (Users) {
        name = (await Users.getNameUser(uid)) || "সদস্য";
      } else {
        name = "সদস্য";
      }

      await api.sendMessage({
        body: `📢 ${name}, কল এ আসো!`,
        mentions: [{ tag: name, id: uid }]
      }, event.threadID);

      // delay (১ সেকেন্ড) না হলে একসাথে স্প্যাম হয়ে যাবে
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (e) {
      console.log("❌ Error sending to UID:", uid, e);
    }
  }
};
