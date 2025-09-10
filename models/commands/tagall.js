module.exports.config = {
  name: "tagall",
  version: "1.0.0",
  permission: 2, // 0 = sobai use korte parbe, 2 = sudhu admin
  prefix: true,
  credits: "Joy Ahmed",
  description: "Tag everyone ekta ekta kore alada message e",
  category: "tools",
  usages: "tagall [optional message]",
  cooldowns: 5,
};

module.exports.run = function ({ api, event, args }) {
  const threadID = event.threadID;
  const msg = args.length > 0 ? args.join(" ") : "📢 Attention!";

  api.getThreadInfo(threadID, (err, info) => {
    if (err) return api.sendMessage("❌ Thread info ana jachhe na.", threadID);

    let members = info.userInfo;
    let i = 0;

    function tagNext() {
      if (i >= members.length) return;
      let user = members[i];
      i++;

      // sender ke skip korte hole niche line ta use korun:
      // if (user.id === event.senderID) return tagNext();

      let body = msg + "\n@" + user.name;
      let mentions = [{ id: user.id, tag: user.name }];

      api.sendMessage({ body: body, mentions }, threadID, () => {
        setTimeout(tagNext, 1500); // ১.৫ সেকেন্ড delay
      });
    }

    tagNext();
  });
};
