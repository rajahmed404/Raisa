const axios = require("axios");
const fs = require("fs-extra");
const { loadImage, createCanvas } = require("canvas");

module.exports = {
  config: {
    name: "hack",
    version: "1.0.0",
    author: "Joy",
    role: 0,
    shortDescription: "Example image command",
    longDescription: "Create a fun image using avatar and text",
    category: "fun",
    guide: "{pn} [@mention or leave blank]"
  },

  wrapText: function (ctx, text, maxWidth) {
    return new Promise(resolve => {
      if (ctx.measureText(text).width < maxWidth) return resolve([text]);
      if (ctx.measureText('W').width > maxWidth) return resolve(null);
      const words = text.split(' ');
      const lines = [];
      let line = '';
      while (words.length > 0) {
        let split = false;
        while (ctx.measureText(words[0]).width >= maxWidth) {
          const temp = words[0];
          words[0] = temp.slice(0, -1);
          if (split) words[1] = `${temp.slice(-1)}${words[1]}`;
          else {
            split = true;
            words.splice(1, 0, temp.slice(-1));
          }
        }
        if (ctx.measureText(`${line}${words[0]}`).width < maxWidth) line += `${words.shift()} `;
        else {
          lines.push(line.trim());
          line = '';
        }
        if (words.length === 0) lines.push(line.trim());
      }
      return resolve(lines);
    });
  },

  onStart: async function ({ api, event, usersData }) {
    const pathImg = __dirname + "/cache/hack_bg.png";
    const pathAvt = __dirname + "/cache/hack_avt.png";

    const id = Object.keys(event.mentions)[0] || event.senderID;
    const name = await usersData.getName(id);

    const backgroundURL = "https://drive.google.com/uc?id=1RwJnJTzUmwOmP3N_mZzxtp63wbvt9bLZ";
    const avatarURL = `https://graph.facebook.com/${id}/picture?width=720&height=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`;

    const bgData = (await axios.get(backgroundURL, { responseType: "arraybuffer" })).data;
    fs.writeFileSync(pathImg, Buffer.from(bgData, "utf-8"));

    const avtData = (await axios.get(avatarURL, { responseType: "arraybuffer" })).data;
    fs.writeFileSync(pathAvt, Buffer.from(avtData, "utf-8"));

    const baseImg = await loadImage(pathImg);
    const avatarImg = await loadImage(pathAvt);

    const canvas = createCanvas(baseImg.width, baseImg.height);
    const ctx = canvas.getContext("2d");

    ctx.drawImage(baseImg, 0, 0, canvas.width, canvas.height);

    ctx.font = "400 23px Arial";
    ctx.fillStyle = "#1878F3";
    ctx.textAlign = "start";

    const lines = await this.wrapText(ctx, name, 1160);
    ctx.fillText(lines.join("\n"), 200, 497);

    ctx.drawImage(avatarImg, 83, 437, 100, 101);

    const finalBuffer = canvas.toBuffer();
    fs.writeFileSync(pathImg, finalBuffer);
    fs.removeSync(pathAvt);

    return api.sendMessage({
      body: "😈 Hack complete!",
      attachment: fs.createReadStream(pathImg)
    }, event.threadID, () => fs.unlinkSync(pathImg), event.messageID);
  }
};
