module.exports.config = {
  'name': "love4",
  'version': "2.0.0",
  'permssion': 0x0,
  'credits': "nazrul",
  'description': '',
  'prefix': true,
  'category': "Love",
  'commandCategory': "Love",
  'usages': "[tag]",
  'cooldowns': 0x5,
  'dependencies': {
    'axios': '',
    'fs-extra': '',
    'path': '',
    'jimp': ''
  }
};
module.exports.onLoad = async () => {
  const {
    resolve: _0xb94286
  } = global.nodemodule.path;
  const {
    existsSync: _0x589823,
    mkdirSync: _0x1b6fa0
  } = global.nodemodule["fs-extra"];
  const {
    downloadFile: _0x14fa03
  } = global.utils;
  const _0x228440 = __dirname + "/cache/canvas/";
  const _0x492334 = _0xb94286(__dirname, "cache/canvas", "crush.png");
  if (!_0x589823(_0x228440 + "canvas")) {
    _0x1b6fa0(_0x228440, {
      'recursive': true
    });
  }
  if (!_0x589823(_0x492334)) {
    await _0x14fa03('', _0x492334);
  }
};
async function makeImage({
  one: _0x3928ed,
  two: _0x27670a
}) {
  const _0xdadf8 = global.nodemodule["fs-extra"];
  const _0xd2ca30 = global.nodemodule.path;
  const _0x499e1e = global.nodemodule.axios;
  const _0x10d366 = global.nodemodule.jimp;
  const _0x37249a = _0xd2ca30.resolve(__dirname, "cache", "canvas");
  let _0x33090c = await _0x10d366.read(_0x37249a + "/crush.png");
  let _0x52b3de = _0x37249a + ("/batman" + _0x3928ed + '_' + _0x27670a + ".png");
  let _0x4edf10 = _0x37249a + ("/avt_" + _0x3928ed + ".png");
  let _0x25a3a1 = _0x37249a + ("/avt_" + _0x27670a + ".png");
  let _0x5ab659 = (await _0x499e1e.get("https://graph.facebook.com/" + _0x3928ed + "/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662", {
    'responseType': "arraybuffer"
  })).data;
  _0xdadf8.writeFileSync(_0x4edf10, Buffer.from(_0x5ab659, "utf-8"));
  let _0x64cf72 = (await _0x499e1e.get("https://graph.facebook.com/" + _0x27670a + "/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662", {
    'responseType': "arraybuffer"
  })).data;
  _0xdadf8.writeFileSync(_0x25a3a1, Buffer.from(_0x64cf72, "utf-8"));
  let _0x525d7a = await _0x10d366.read(await circle(_0x4edf10));
  let _0x467ad7 = await _0x10d366.read(await circle(_0x25a3a1));
  _0x33090c.composite(_0x525d7a.resize(191, 191), 93, 111).composite(_0x467ad7.resize(190, 190), 434, 107);
  let _0x579dc7 = await _0x33090c.getBufferAsync("image/png");
  _0xdadf8.writeFileSync(_0x52b3de, _0x579dc7);
  _0xdadf8.unlinkSync(_0x4edf10);
  _0xdadf8.unlinkSync(_0x25a3a1);
  return _0x52b3de;
}
async function circle(_0x5b7d98) {
  const _0x22ec52 = require("jimp");
  _0x5b7d98 = await _0x22ec52.read(_0x5b7d98);
  _0x5b7d98.circle();
  return await _0x5b7d98.getBufferAsync("image/png");
}
module.exports.run = async function ({
  event: _0x39df58,
  api: _0x6c9943,
  args: _0x379168
}) {
  const _0x56c87c = global.nodemodule["fs-extra"];
  const {
    threadID: _0x34293b,
    messageID: _0x452177,
    senderID: _0x82d95a
  } = _0x39df58;
  const _0x3f42da = Object.keys(_0x39df58.mentions);
  if (!_0x3f42da[0]) {
    return _0x6c9943.sendMessage("যার সাথে ফ্রেম বানাতে চান তাকে মেনশন করুন", _0x34293b, _0x452177);
  } else {
    const _0x18f35e = _0x3f42da[0];
    return makeImage({
      'one': _0x82d95a,
      'two': _0x18f35e
    }).then(_0x37243b => _0x6c9943.sendMessage({
      'body': "•🦋💛🌸\n\n\n𝗟𝗶𝗳𝗲 𝗶𝘀 𝗲𝗮𝘀𝘆 𝘁𝗼 𝗰𝗼𝗺𝗲 𝗯𝘂𝘁 𝗵𝗮𝗿𝗱 𝘁𝗼 𝘀𝘁𝗮𝘆✨\n\nজীবনে আসা সহজ কিন্তু থেকে যাওয়া কঠিন!🙂💔\n\n\n•😘🦋💛\n𝐂𝐫𝐞𝐚𝐭𝐨𝐫 ━➢ 𝐑𝐚𝐢𝐬𝐚 𝐀𝐤𝐭𝐞𝐫 𝐌𝐢𝐦",
      'attachment': _0x56c87c.createReadStream(_0x37243b)
    }, _0x34293b, () => _0x56c87c.unlinkSync(_0x37243b), _0x452177));
  }
};
