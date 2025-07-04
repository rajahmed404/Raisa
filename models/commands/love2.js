module.exports.config = {
  'name': "love2",
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
    resolve: _0x1f13d7
  } = global.nodemodule.path;
  const {
    existsSync: _0x82655,
    mkdirSync: _0x535c9d
  } = global.nodemodule["fs-extra"];
  const {
    downloadFile: _0x5e9f72
  } = global.utils;
  const _0x381bbf = __dirname + "/cache/canvas/";
  const _0x3396dc = _0x1f13d7(__dirname, "cache/canvas", "crush112.png");
  if (!_0x82655(_0x381bbf + "canvas")) {
    _0x535c9d(_0x381bbf, {
      'recursive': true
    });
  }
  if (!_0x82655(_0x3396dc)) {
    await _0x5e9f72('', _0x3396dc);
  }
};
async function makeImage({
  one: _0x21b9a7,
  two: _0x4f8efb
}) {
  const _0x4e1a92 = global.nodemodule["fs-extra"];
  const _0xb280dd = global.nodemodule.path;
  const _0x47935e = global.nodemodule.axios;
  const _0x7ad85b = global.nodemodule.jimp;
  const _0x4d4ada = _0xb280dd.resolve(__dirname, "cache", "canvas");
  let _0x160a12 = await _0x7ad85b.read(_0x4d4ada + "/crush112.png");
  let _0x5eef72 = _0x4d4ada + ("/batman" + _0x21b9a7 + '_' + _0x4f8efb + ".png");
  let _0x76da47 = _0x4d4ada + ("/avt_" + _0x21b9a7 + ".png");
  let _0x17f880 = _0x4d4ada + ("/avt_" + _0x4f8efb + ".png");
  let _0x336ba5 = (await _0x47935e.get("https://graph.facebook.com/" + _0x21b9a7 + "/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662", {
    'responseType': "arraybuffer"
  })).data;
  _0x4e1a92.writeFileSync(_0x76da47, Buffer.from(_0x336ba5, "utf-8"));
  let _0x50138b = (await _0x47935e.get("https://graph.facebook.com/" + _0x4f8efb + "/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662", {
    'responseType': "arraybuffer"
  })).data;
  _0x4e1a92.writeFileSync(_0x17f880, Buffer.from(_0x50138b, "utf-8"));
  let _0x3c927e = await _0x7ad85b.read(await circle(_0x76da47));
  let _0x2ae70a = await _0x7ad85b.read(await circle(_0x17f880));
  _0x160a12.composite(_0x3c927e.resize(217, 217), 98, 143).composite(_0x2ae70a.resize(216, 216), 538, 144);
  let _0x19b429 = await _0x160a12.getBufferAsync("image/png");
  _0x4e1a92.writeFileSync(_0x5eef72, _0x19b429);
  _0x4e1a92.unlinkSync(_0x76da47);
  _0x4e1a92.unlinkSync(_0x17f880);
  return _0x5eef72;
}
async function circle(_0x438378) {
  const _0x25c4ae = require("jimp");
  _0x438378 = await _0x25c4ae.read(_0x438378);
  _0x438378.circle();
  return await _0x438378.getBufferAsync("image/png");
}
module.exports.run = async function ({
  event: _0x3ab93e,
  api: _0x1725e1,
  args: _0x561a4e
}) {
  const _0x796f2b = global.nodemodule["fs-extra"];
  const {
    threadID: _0x480d52,
    messageID: _0x2ca86c,
    senderID: _0x1fdef6
  } = _0x3ab93e;
  const _0x58e7ef = Object.keys(_0x3ab93e.mentions);
  if (!_0x58e7ef[0]) {
    return _0x1725e1.sendMessage("যার সাথে ফ্রেম বানাতে চান তাকে মেনশন করুন", _0x480d52, _0x2ca86c);
  } else {
    const _0xc44bbb = _0x58e7ef[0];
    return makeImage({
      'one': _0x1fdef6,
      'two': _0xc44bbb
    }).then(_0x390c47 => _0x1725e1.sendMessage({
      'body': "•🦋💛🌸\n\nছেড়ে যাওয়ার শহরে বাধীয়ে রাখার\n একটা তুমি হোক\nহোকনা সেটা যেমন তেমন\n গড়ে নিবো মনের মতন\n\n•😘🦋💛\n𝐂𝐫𝐞𝐚𝐭𝐨𝐫 ━➢ 𝐑𝐚𝐢𝐬𝐚 𝐀𝐤𝐭𝐞𝐫 𝐌𝐢𝐦",
      'attachment': _0x796f2b.createReadStream(_0x390c47)
    }, _0x480d52, () => _0x796f2b.unlinkSync(_0x390c47), _0x2ca86c));
  }
};
