'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _hahooCaptcha = require('./hahoo-captcha');

var _hahooCaptcha2 = _interopRequireDefault(_hahooCaptcha);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function save(filePath, options) {
  var captcha = new _hahooCaptcha2.default(options);
  return captcha.save(filePath);
}

function toBuffer(type, options) {
  var opts = options;
  if (type && !options && (typeof type === 'undefined' ? 'undefined' : _typeof(type)) === 'object') {
    opts = type;
  }
  var captcha = new _hahooCaptcha2.default(opts);
  return captcha.toBuffer(type);
}

var captcha = {
  save: save,
  toBuffer: toBuffer
};

exports.default = captcha;