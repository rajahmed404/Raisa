module.exports.config = {
  'name': "love",
  'version': "2.0.0",
  'permssion': 0x0,
  'credits': "Joy",
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
    resolve: _0x2ba40c
  } = global.nodemodule.path;
  const {
    existsSync: _0x5caafe,
    mkdirSync: _0x463cf4
  } = global.nodemodule["fs-extra"];
  const {
    downloadFile: _0x5e3968
  } = global.utils;
  const _0xdcf402 = __dirname + "/cache/canvas/";
  const _0x1e0dd0 = _0x2ba40c(__dirname, "cache/canvas", "crush11115522.png");
  if (!_0x5caafe(_0xdcf402 + "canvas")) {
    _0x463cf4(_0xdcf402, {
      'recursive': true
    });
  }
  if (!_0x5caafe(_0x1e0dd0)) {
    await _0x5e3968('', _0x1e0dd0);
  }
};
async function makeImage({
  one: _0x30c81c,
  two: _0x536a92
}) {
  const _0x29e2fb = global.nodemodule["fs-extra"];
  const _0x4b7d70 = global.nodemodule.path;
  const _0x39c0fe = global.nodemodule.axios;
  const _0xd1e612 = global.nodemodule.jimp;
  const _0x2f85a2 = _0x4b7d70.resolve(__dirname, "cache", "canvas");
  let _0x536be2 = await _0xd1e612.read(_0x2f85a2 + "/crush11115522.png");
  let _0x4e263f = _0x2f85a2 + ("/batman" + _0x30c81c + '_' + _0x536a92 + ".png");
  let _0xd26628 = _0x2f85a2 + ("/avt_" + _0x30c81c + ".png");
  let _0x2a1983 = _0x2f85a2 + ("/avt_" + _0x536a92 + ".png");
  let _0x4a5684 = (await _0x39c0fe.get("https://graph.facebook.com/" + _0x30c81c + "/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662", {
    'responseType': "arraybuffer"
  })).data;
  _0x29e2fb.writeFileSync(_0xd26628, Buffer.from(_0x4a5684, "utf-8"));
  let _0x383eca = (await _0x39c0fe.get("https://graph.facebook.com/" + _0x536a92 + "/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662", {
    'responseType': "arraybuffer"
  })).data;
  _0x29e2fb.writeFileSync(_0x2a1983, Buffer.from(_0x383eca, "utf-8"));
  let _0xabed3c = await _0xd1e612.read(await circle(_0xd26628));
  let _0x339e99 = await _0xd1e612.read(await circle(_0x2a1983));
  _0x536be2.composite(_0xabed3c.resize(196, 196), 98, 141).composite(_0x339e99.resize(193, 193), 427, 143);
  let _0x123330 = await _0x536be2.getBufferAsync("image/png");
  _0x29e2fb.writeFileSync(_0x4e263f, _0x123330);
  _0x29e2fb.unlinkSync(_0xd26628);
  _0x29e2fb.unlinkSync(_0x2a1983);
  return _0x4e263f;
}
async function circle(_0x240b96) {
  const _0x52190b = require("jimp");
  _0x240b96 = await _0x52190b.read(_0x240b96);
  _0x240b96.circle();
  return await _0x240b96.getBufferAsync("image/png");
}
module.exports.run = async function ({
  event: _0x31ab45,
  api: _0x1d3c2b,
  args: _0x3d3755
}) {
  const _0x1afbaf = global.nodemodule["fs-extra"];
  const {
    threadID: _0x599a84,
    messageID: _0x34bf12,
    senderID: _0x5841bf
  } = _0x31ab45;
  const _0x31ac92 = Object.keys(_0x31ab45.mentions);
  if (!_0x31ac92[0]) {
    return _0x1d3c2b.sendMessage("যার সাথে ফ্রেম বানাতে চান তাকে মেনশন করুন", _0x599a84, _0x34bf12);
  } else {
    const _0x5f3d1c = _0x31ac92[0];
    return makeImage({
      'one': _0x5841bf,
      'two': _0x5f3d1c
    }).then(_0x277769 => _0x1d3c2b.sendMessage({
      'body': "•🦋💛🌸\n\nবাধিয়ে রেখে লাব নেই\n উরিয়ে দিয়ে দেখো\nদিন শেষে ফিরে আসে\n তখনি আগালে রেখো\n\n•😘🦋💛\n𝐂𝐫𝐞𝐚𝐭𝐨𝐫 ━➢ 𝐑𝐚𝐢𝐬𝐚 𝐀𝐤𝐭𝐞𝐫 𝐌𝐢𝐦",
      'attachment': _0x1afbaf.createReadStream(_0x277769)
    }, _0x599a84, () => _0x1afbaf.unlinkSync(_0x277769), _0x34bf12));
  }
};
