module.exports.config = {
	name: "raj12",
    version: "1.0.1",
	hasPermssion: 0,
	credits: "Joy", 
	description: "hihihihi",
	commandCategory: "no prefix",
	usages: "😂",
    cooldowns: 5, 
};

module.exports.handleEvent = function({ api, event, client, __GLOBAL }) {
	var { threadID, messageID } = event;
	if (event.body.indexOf("bal") == 0 || event.body.indexOf("bl") == 0 || event.body.indexOf("BL") == 0 || event.body.indexOf("বাল") == 0) {
		api.sendMessage("এখানে গালাগালি করলে রাজ বসের লাথি খাবি কিন্তু🤬", threadID, messageID);
        api.setMessageReaction("🤬", event.messageID, (err) => {}, true)
	}
}

module.exports.run = function({ api, event, client, __GLOBAL }) {
	// কোনো কাজ নেই
}
