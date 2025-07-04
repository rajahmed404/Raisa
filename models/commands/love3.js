module.exports.config = {
  'name': "love3",
  'version': "7.3.1",
  'Permssion': 0x0,
  'credits': "nazrul",
  'prefix': true,
  'category': "Love",
  'description': "Get Pair From Mention",
  'commandCategory': "png",
  'usages': "[@mention]",
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
    resolve: _0x1cb724
  } = global.nodemodule.path;
  const {
    existsSync: _0x2f1612,
    mkdirSync: _0x42f105
  } = global.nodemodule["fs-extra"];
  const {
    downloadFile: _0x348924
  } = global.utils;
  const _0x3fd7f7 = __dirname + "/cache/canvas/";
  const _0x3fcb0a = _0x1cb724(__dirname, "cache/canvas", "pp.png");
  if (!_0x2f1612(_0x3fd7f7 + "canvas")) {
    _0x42f105(_0x3fd7f7, {
      'recursive': true
    });
  }
  if (!_0x2f1612(_0x3fcb0a)) {
    await _0x348924('', _0x3fcb0a);
  }
};
async function makeImage({
  one: _0x507377,
  two: _0x3a0f5f
}) {
  const _0x277964 = global.nodemodule["fs-extra"];
  const _0x1d258f = global.nodemodule.path;
  const _0x1a9232 = global.nodemodule.axios;
  const _0x45e811 = global.nodemodule.jimp;
  const _0x1ffcfb = _0x1d258f.resolve(__dirname, "cache", "canvas");
  let _0x4c60d9 = await _0x45e811.read(_0x1ffcfb + "/pp.png");
  let _0xe0d6d5 = _0x1ffcfb + ("/batman" + _0x507377 + '_' + _0x3a0f5f + ".png");
  let _0x32e4a3 = _0x1ffcfb + ("/avt_" + _0x507377 + ".png");
  let _0x33eb40 = _0x1ffcfb + ("/avt_" + _0x3a0f5f + ".png");
  let _0x54bda6 = (await _0x1a9232.get("https://graph.facebook.com/" + _0x507377 + "/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662", {
    'responseType': "arraybuffer"
  })).data;
  _0x277964.writeFileSync(_0x32e4a3, Buffer.from(_0x54bda6, "utf-8"));
  let _0x47a3a2 = (await _0x1a9232.get("https://graph.facebook.com/" + _0x3a0f5f + "/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662", {
    'responseType': "arraybuffer"
  })).data;
  _0x277964.writeFileSync(_0x33eb40, Buffer.from(_0x47a3a2, "utf-8"));
  let _0x21b93b = await _0x45e811.read(await circle(_0x32e4a3));
  let _0x56ab95 = await _0x45e811.read(await circle(_0x33eb40));
  _0x4c60d9.composite(_0x21b93b.resize(235, 232), 511, 123).composite(_0x56ab95.resize(229, 225), 95, 126);
  let _0x48bd86 = await _0x4c60d9.getBufferAsync("image/png");
  _0x277964.writeFileSync(_0xe0d6d5, _0x48bd86);
  _0x277964.unlinkSync(_0x32e4a3);
  _0x277964.unlinkSync(_0x33eb40);
  return _0xe0d6d5;
}
async function circle(_0x25a69a) {
  const _0x376087 = require("jimp");
  _0x25a69a = await _0x376087.read(_0x25a69a);
  _0x25a69a.circle();
  return await _0x25a69a.getBufferAsync("image/png");
}
module.exports.run = async function ({
  event: _0x5e90ef,
  api: _0x2d43bd,
  args: _0x2a5ce0
}) {
  const _0x38289f = global.nodemodule["fs-extra"];
  const {
    threadID: _0x483d65,
    messageID: _0x3b8708,
    senderID: _0x4254d8
  } = _0x5e90ef;
  const _0xe75d75 = Object.keys(_0x5e90ef.mentions);
  if (!_0xe75d75[0]) {
    return _0x2d43bd.sendMessage("ভালোবাসার মানুষ টি কে টেগ করুন-!!💏🙈", _0x483d65, _0x3b8708);
  } else {
    const _0x2927ee = _0xe75d75[0];
    return makeImage({
      'one': _0x4254d8,
      'two': _0x2927ee
    }).then(_0x475647 => _0x2d43bd.sendMessage({
      'body': "- 𝗧𝗵𝗶𝘀 𝗮𝗯𝗼𝘂𝘁 𝗹𝗶𝗻𝗲-!! 🖤🤍\nপ্রিয়__😽💚🌺\n\nতুমি ফুল হয়ে থেকে যাও আমি যত্ন করে রেখে দিব-!😘🤍🙃\n𝐂𝐫𝐞𝐚𝐭𝐨𝐫 ━➢ 𝐑𝐚𝐢𝐬𝐚 𝐀𝐤𝐭𝐞𝐫 𝐌𝐢𝐦",
      'attachment': _0x38289f.createReadStream(_0x475647)
    }, _0x483d65, () => _0x38289f.unlinkSync(_0x475647), _0x3b8708));
  }
};
