module.exports.config = {
	name: "info",
	version: "1.0.1", 
	hasPermssion: 0,
	credits: "JOY",
	description: "Admin and Bot info.",
	commandCategory: "Utility",
	cooldowns: 1,
	dependencies: 
	{
    	"request":"",
    	"fs-extra":"",
    	"axios":""
  	}
};

module.exports.run = async function({ api, event }) {
	const axios = global.nodemodule["axios"];
	const request = global.nodemodule["request"];
	const fs = global.nodemodule["fs-extra"];

	const time = process.uptime(),
		hours = Math.floor(time / (60 * 60)),
		minutes = Math.floor((time % (60 * 60)) / 60),
		seconds = Math.floor(time % 60);

	const moment = require("moment-timezone");
	var juswa = moment.tz("Asia/Dhaka").format("『D/MM/YYYY』 【HH:mm:ss】");

	var link = ["https://i.postimg.cc/jd3nh8Fv/Messenger-creation-A411-B8-DF-83-AB-49-D7-BFD3-E5-A6745-DFD74.jpg"];

	var callback = () => api.sendMessage({
		body: ` 𝐀𝐃𝐌𝐈𝐍 𝐀𝐍𝐃 𝐁𝐎𝐓 𝐈𝐍𝐅𝐎𝐑𝐌𝐀𝐓𝐈𝐎𝐍 


ব্ঁট্ঁ না্ঁম্ঁ : ${global["জু্ঁই্ঁ"] || "Jui Bot"}

ব্ঁট্ঁ এ্ঁড্ঁমি্ঁন্ঁ : রা্ঁই্ঁসা্ঁ আ্ঁক্তা্ঁর্ঁ মি্ঁম্ঁ

ফে্ঁস্ঁবু্ঁক্ঁ লি্ঁংক্ঁ : https://www.facebook.com/mim264

ঠি্ঁকা্ঁনা্ঁ : ন্ঁড়া্ঁই্ঁল্ঁ স্ঁদ্ঁর্ঁ থা্ঁনা্ঁ 

𝐎𝐓𝐇𝐄𝐑 𝐈𝐍𝐅𝐎𝐑𝐌𝐀𝐍𝐓𝐈𝐎𝐍

✧══════•❁❀❁•══════✧

লে্ঁখা্ঁ প্ঁরা্ঁ : ${global["ক্লা্সঁ এ্ঁই্ঁট্ঁ"] || "ক্লাস এইট"}

খে্ঁলা্ঁদু্ঁলা্ঁ : ফ্রী্ঁ ফা্ঁয়া্ঁর্ঁ 

🥳𝐔𝐏𝐓𝐈𝐌𝐄🥳

🌪️𝐓𝐨𝐝𝐚𝐲 𝐢𝐬🌪️ ☞︎︎︎☜︎︎︎✰ ${juswa} 

⚡𝐁𝐨𝐭 𝐢𝐬 𝐑𝐮𝐧𝐧𝐢𝐧𝐠⚡ ${hours}:${minutes}:${seconds}.

✅𝐓𝐡𝐚𝐧𝐤𝐬 𝐅𝐨𝐫 𝐔𝐬𝐢𝐧𝐠 ${global.config.BOTNAME || "This"} Bot🖤
`,
		attachment: fs.createReadStream(__dirname + "/cache/juswa.jpg")
	}, event.threadID, () => fs.unlinkSync(__dirname + "/cache/juswa.jpg"));

	return request(encodeURI(link[Math.floor(Math.random() * link.length)]))
		.pipe(fs.createWriteStream(__dirname + "/cache/juswa.jpg"))
		.on("close", () => callback());
};
