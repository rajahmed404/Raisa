module.exports.config = {
  name: "mensonall",
  version: "1.0.0",
  permission: 0,
  prefix: true, // true হলে কমান্ডের আগে '.' দিতে হবে
  credits: "Sohidul",
  description: "সব মেম্বারের নাম এক এক করে mention করে কল এ ডাকবে",
  category: "group",
  usages: ".mensonall",
  cooldowns: 10
};

module.exports.run = async function ({ api, event, Users }) {
  // শুধু গ্রুপে কাজ করবে
  if (!event.isGroup) {
    return api.sendMessage("⚠️ এই কমান্ড শুধু গ্রুপে ব্যবহার করা যাবে!", event.threadID);
  }

  let all = event.participantIDs; // গ্রুপের সব UID

  for (let uid of all) {
    try {
      // ইউজারের নাম বের করা, Users ডাটাবেস থাকলে
      let name = (Users ? await Users.getNameUser(uid) : null) || "সদস্য";

      await api.sendMessage({
        body: `📢 ${name}, কল এ আসো!`,
        mentions: [{ tag: name, id: uid }]
      }, event.threadID);

      // ১ সেকেন্ড delay, না হলে একসাথে স্প্যাম হতে পারে
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (e) {
      console.log("❌ Error sending to UID:", uid, e);
    }
  }
};
