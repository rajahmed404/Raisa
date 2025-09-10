module.exports.config = {
  name: "callall",
  version: "1.0.0",
  permission: 0,
  prefix: true,
  credits: "Sohidul",
  description: "সব মেম্বারের নাম এক এক করে mention দিয়ে কল এ ডাকবে",
  category: "group",
  usages: ".callall",
  cooldowns: 10
};

module.exports.run = async function ({ api, event, Users }) {
  if (!event.isGroup) {
    return api.sendMessage("⚠️ এই কমান্ড শুধু গ্রুপে ব্যবহার করা যাবে!", event.threadID);
  }

  let all = event.participantIDs; // গ্রুপের সব UID

  for (let uid of all) {
    try {
      // ইউজারের নাম বের করা, যদি Users ডাটাবেস থাকে
      let name = (Users ? await Users.getNameUser(uid) : null) || "সদস্য";

      await api.sendMessage({
        body: `📢 ${name}, কল এ আসো!`,
        mentions: [{ tag: name, id: uid }]
      }, event.threadID);

      // ১ সেকেন্ড delay, না হলে Facebook block করতে পারে
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (e) {
      console.log("❌ Error sending to UID:", uid, e);
    }
  }
};
