module.exports.config = {
    name: "mentionall",
    version: "1.0.0",
    permission: 0,
    credits: "YourName",
    description: "Mention all members in group",
    commandCategory: "group",
    usages: "mentionall",
    cooldowns: 5,
};

module.exports.run = async function({ api, event }) {
    const threadInfo = await api.getThreadInfo(event.threadID);
    const mentions = [];
    let msg = "📢 Mention All:\n";
    for (let member of threadInfo.participantIDs) {
        mentions.push({ tag: member, id: member });
        msg += `@${member}\n`;
    }
    api.sendMessage({ body: msg, mentions }, event.threadID);
};
