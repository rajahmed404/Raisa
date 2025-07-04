module.exports.config = {
  'name': "toilet",
  'version': "1.0.0",
  'permission': 0x0,
  'credits': "Nazrul",
  'description': " ",
  'prefix': true,
  'category': "user",
  'commandCategory': "user",
  'usages': '@',
  'cooldowns': 0x5,
  'dependencies': {
    'fs-extra': '',
    'axios': '',
    'canvas': '',
    'jimp': '',
    'node-superfetch': ''
  }
};
module.exports.onLoad = async () => {
  const {
    resolve: _0x5abcf9
  } = global.nodemodule.path;
  const {
    existsSync: _0xd5f7f4,
    mkdirSync: _0x5c40f8
  } = global.nodemodule["fs-extra"];
  const {
    downloadFile: _0x5f4d38
  } = global.utils;
  const _0x58e4f7 = __dirname + "/cache/";
  const _0x13f43e = _0x5abcf9(__dirname, "cache", "toilet.png");
  if (!_0xd5f7f4(_0x58e4f7 + '')) {
    _0x5c40f8(_0x58e4f7, {
      'recursive': true
    });
  }
  if (!_0xd5f7f4(_0x13f43e)) {
    await _0x5f4d38("https://drive.google.com/uc?id=13ZqFryD-YY-JTs34lcy6b_w36UCCk0EI&export=download", _0x13f43e);
  }
};
async function makeImage({
  one: _0x33fbe5,
  two: _0x371c4f
}) {
  const _0x29b627 = global.nodemodule["fs-extra"];
  const _0x5a9155 = global.nodemodule.path;
  const _0x1ae841 = global.nodemodule.axios;
  const _0x330621 = global.nodemodule.jimp;
  const _0x2340c0 = _0x5a9155.resolve(__dirname, "cache");
  let _0x49fee7 = await _0x330621.read(_0x2340c0 + "/toilet.png");
  let _0x3e7648 = _0x2340c0 + ("/toilet_" + _0x33fbe5 + '_' + _0x371c4f + ".png");
  let _0x4fe06f = _0x2340c0 + ("/avt_" + _0x33fbe5 + ".png");
  let _0x4105bf = _0x2340c0 + ("/avt_" + _0x371c4f + ".png");
  let _0x62379f = (await _0x1ae841.get("https://graph.facebook.com/" + _0x33fbe5 + "/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662", {
    'responseType': "arraybuffer"
  })).data;
  _0x29b627.writeFileSync(_0x4fe06f, Buffer.from(_0x62379f, "utf-8"));
  let _0x1d6d6d = (await _0x1ae841.get("https://graph.facebook.com/" + _0x371c4f + "/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662", {
    'responseType': "arraybuffer"
  })).data;
  _0x29b627.writeFileSync(_0x4105bf, Buffer.from(_0x1d6d6d, "utf-8"));
  let _0x31debb = await _0x330621.read(await circle(_0x4fe06f));
  let _0x4ab8d1 = await _0x330621.read(await circle(_0x4105bf));
  _0x49fee7.resize(292, 345).composite(_0x31debb.resize(70, 70), 100, 200).composite(_0x4ab8d1.resize(70, 70), 100, 200);
  let _0x27d578 = await _0x49fee7.getBufferAsync("image/png");
  _0x29b627.writeFileSync(_0x3e7648, _0x27d578);
  _0x29b627.unlinkSync(_0x4fe06f);
  _0x29b627.unlinkSync(_0x4105bf);
  return _0x3e7648;
}
async function circle(_0x3475db) {
  const _0xc7729c = require("jimp");
  _0x3475db = await _0xc7729c.read(_0x3475db);
  _0x3475db.circle();
  return await _0x3475db.getBufferAsync("image/png");
}
module.exports.run = async function ({
  event: _0x39336c,
  api: _0x316124,
  args: _0x5d21fc,
  Currencies: _0x55a2db
}) {
  const _0x1ae92a = global.nodemodule["fs-extra"];
  const _0x5eb694 = Math.floor(Math.random() * 101);
  const _0xd5ac87 = Math.floor(Math.random() * 100000) + 100000;
  const {
    threadID: _0x21aa30,
    messageID: _0x3171e0,
    senderID: _0x46a4cc
  } = _0x39336c;
  const _0x5f5286 = Object.keys(_0x39336c.mentions);
  var _0x205272 = _0x5f5286[0];
  await _0x55a2db.increaseMoney(_0x39336c.senderID, parseInt(_0x5eb694 * _0xd5ac87));
  if (!_0x205272) {
    return _0x316124.sendMessage("Please tag 1 person", _0x21aa30, _0x3171e0);
  } else {
    return makeImage({
      'one': _0x46a4cc,
      'two': _0x205272
    }).then(_0x150ea0 => _0x316124.sendMessage({
      'body': "বেশি বাল পাকলামির জন্য তোরে টয়লেটে ফেলে দিলাম। এবার লে ঠেলা বুঝ\nগু খা😁😁🤣🤣\n𝐂𝐫𝐞𝐚𝐭𝐨𝐫 ━➢ 𝐑𝐚𝐢𝐬𝐚 𝐀𝐤𝐭𝐞𝐫 𝐌𝐢𝐦",
      'attachment': _0x1ae92a.createReadStream(_0x150ea0)
    }, _0x21aa30, () => _0x1ae92a.unlinkSync(_0x150ea0), _0x3171e0));
  }
};
