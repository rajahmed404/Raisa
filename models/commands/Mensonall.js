module.exports.config = {
  name: "menson",
  version: "1.0.0",
  permission: 0,
  prefix: true,
  credits: "Sohidul",
  description: "এক এক করে সবাইকে mention দিয়ে কল এ ডাকবে",
  category: "group",
  usages: "call",
  cooldowns: 10
};

module.exports.run = async function ({ api, event, Users }) {
  if (!event.isGroup) {
    return api.sendMessage("⚠️ এই কমান্ড শুধু গ্রুপে ব্যবহার করা যাবে!", event.threadID);
  }

  let all = event.participantIDs; // গ্রুপের সব মেম্বার UID

  for (let uid of all) {
    try {
      // ইউজারের নাম বের করা (Users ডাটাবেস থাকলে)
      let name = (await Users.getNameUser(uid)) || "সদস্য";

      await api.sendMessage({
        body: `📢 ${name}, কল এ আসো!`,
        mentions: [{ tag: name, id: uid }]
      }, event.threadID);

      // delay (১ সেকেন্ড), না হলে ফেসবুক block করতে পারে
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (e) {
      console.log("❌ Error sending to UID:", uid, e);
    }
  }
};
