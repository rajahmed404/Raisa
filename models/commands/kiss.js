module.exports.config = {
  'name': "kiss",
  'version': "2.0.0",
  'hasPermssion': 0x0,
  'credits': "Nazrul",
  'description': "Get fuck",
  'category': "Love",
  'commandCategory': "img",
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
    resolve: _0x1a5de6
  } = global.nodemodule.path;
  const {
    existsSync: _0x5e6678,
    mkdirSync: _0x7c83ec
  } = global.nodemodule["fs-extra"];
  const {
    downloadFile: _0x56bcd3
  } = global.utils;
  const _0x50f3d7 = __dirname + "/cache/";
  const _0x275165 = _0x1a5de6(__dirname, "cache", "hon15.png");
  if (!_0x5e6678(_0x50f3d7 + '')) {
    _0x7c83ec(_0x50f3d7, {
      'recursive': true
    });
  }
  if (!_0x5e6678(_0x275165)) {
    await _0x56bcd3('', _0x275165);
  }
};
async function makeImage({
  one: _0xa62ae,
  two: _0x5b75df
}) {
  const _0x58907a = global.nodemodule["fs-extra"];
  const _0x46ad30 = global.nodemodule.path;
  const _0x1b6d10 = global.nodemodule.axios;
  const _0xf42c9c = global.nodemodule.jimp;
  const _0x44449a = _0x46ad30.resolve(__dirname, "cache");
  let _0x333549 = await _0xf42c9c.read(_0x44449a + "/hon15.png");
  let _0xad7c66 = _0x44449a + ("/hon_" + _0xa62ae + '_' + _0x5b75df + ".png");
  let _0x4237ff = _0x44449a + ("/avt_" + _0xa62ae + ".png");
  let _0xf8797e = _0x44449a + ("/avt_" + _0x5b75df + ".png");
  let _0xca2b7a = (await _0x1b6d10.get("https://graph.facebook.com/" + _0xa62ae + "/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662", {
    'responseType': "arraybuffer"
  })).data;
  _0x58907a.writeFileSync(_0x4237ff, Buffer.from(_0xca2b7a, "utf-8"));
  let _0x2aa1b7 = (await _0x1b6d10.get("https://graph.facebook.com/" + _0x5b75df + "/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662", {
    'responseType': "arraybuffer"
  })).data;
  _0x58907a.writeFileSync(_0xf8797e, Buffer.from(_0x2aa1b7, "utf-8"));
  let _0x1509ea = await _0xf42c9c.read(await circle(_0x4237ff));
  let _0x5709a5 = await _0xf42c9c.read(await circle(_0xf8797e));
  _0x333549.resize(700, 440).composite(_0x1509ea.resize(160, 160), 355, 43).composite(_0x5709a5.resize(160, 160), 150, 50);
  let _0x5c995d = await _0x333549.getBufferAsync("image/png");
  _0x58907a.writeFileSync(_0xad7c66, _0x5c995d);
  _0x58907a.unlinkSync(_0x4237ff);
  _0x58907a.unlinkSync(_0xf8797e);
  return _0xad7c66;
}
async function circle(_0x192037) {
  const _0x2f32a7 = require("jimp");
  _0x192037 = await _0x2f32a7.read(_0x192037);
  _0x192037.circle();
  return await _0x192037.getBufferAsync("image/png");
}
module.exports.run = async function ({
  event: _0x574ccf,
  api: _0x3ee9ec,
  args: _0x53acdd,
  Currencies: _0x5ae4cf
}) {
  const _0x1ad7f5 = global.nodemodule["fs-extra"];
  const _0x1ddb9e = ["সেই সাধ😘😘\nএত সাধ ক্যা💋💋💋\n𝐂𝐫𝐞𝐚𝐭𝐨𝐫 ━➢ 𝐑𝐚𝐢𝐬𝐚 𝐀𝐤𝐭𝐞𝐫 𝐌𝐢𝐦"];
  const _0x5a2969 = Math.floor(Math.random() * 101) + 101;
  const _0x4089e6 = Math.floor(Math.random() * 10) + 1;
  const {
    threadID: _0x416129,
    messageID: _0x4d5b2a,
    senderID: _0x1a1fea
  } = _0x574ccf;
  const _0x39273f = Object.keys(_0x574ccf.mentions);
  var _0x7dd764 = _0x39273f[0];
  await _0x5ae4cf.increaseMoney(_0x574ccf.senderID, parseInt(_0x5a2969 * _0x4089e6));
  if (!_0x7dd764) {
    return _0x3ee9ec.sendMessage("Please tag 1 person", _0x416129, _0x4d5b2a);
  } else {
    return makeImage({
      'one': _0x1a1fea,
      'two': _0x7dd764
    }).then(_0x127f0b => _0x3ee9ec.sendMessage({
      'body': '' + _0x1ddb9e[Math.floor(Math.random() * _0x1ddb9e.length)],
      'attachment': _0x1ad7f5.createReadStream(_0x127f0b)
    }, _0x416129, () => _0x1ad7f5.unlinkSync(_0x127f0b), _0x4d5b2a));
  }
};
