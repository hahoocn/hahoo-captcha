'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _gm = require('gm');

var _gm2 = _interopRequireDefault(_gm);

var _pleasejs = require('pleasejs');

var _pleasejs2 = _interopRequireDefault(_pleasejs);

var _randomstring = require('randomstring');

var _randomstring2 = _interopRequireDefault(_randomstring);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HahooCaptcha = function () {
  function HahooCaptcha(options) {
    _classCallCheck(this, HahooCaptcha);

    var opts = options || {};
    this.options = {
      width: opts.width || 86,
      height: opts.height || 38,
      background: opts.background || '#fff',
      text: opts.text || '',
      length: opts.length || 4,
      textX: opts.textX || 2,
      textY: opts.textY || 31,
      baseColor: opts.baseColor || '', // skyblue...
      font: opts.font || '../font/Nunito-Light.ttf',
      fontSize: opts.fontSize || 32,
      wordWidth: opts.wordWidth || 19,
      maxSwirl: opts.maxSwirl || 20,
      lineCount: opts.lineCount || 5,
      lineWidth: opts.lineWidth || 1,
      dotCount: opts.dotCount || 200
    };
    if (!this.options.text) {
      this.options.text = _randomstring2.default.generate({
        length: this.options.length,
        charset: '23456789abcdefghkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ'
      });
    }
  }

  _createClass(HahooCaptcha, [{
    key: 'draw',
    value: function draw() {
      this.gm = (0, _gm2.default)(this.options.width, this.options.height, this.options.background);
      this.drawText();
      this.drawDot();
      this.drawLine();
    }
  }, {
    key: 'drawText',
    value: function drawText() {
      var color = _pleasejs2.default.make_color({
        base_color: this.options.baseColor,
        colors_returned: this.options.text.length
      });
      for (var i = 0; i < this.options.text.length; i++) {
        this.gm.stroke(color[i], 1).fill(color[i]).font(_path2.default.join(__dirname, this.options.font)).fontSize(this.options.fontSize).drawText(this.options.wordWidth * i + this.options.textX, this.options.textY, this.options.text[i]);
      }
      this.gm
      // .wave(5, Math.floor(Math.random() * (100)) + 50)
      // .noise(this.options.textNoise, 'gaussian')
      .swirl(Math.floor(Math.random() * this.options.maxSwirl) + 1);
    }
  }, {
    key: 'drawLine',
    value: function drawLine() {
      var color = _pleasejs2.default.make_color({
        base_color: this.options.baseColor,
        colors_returned: this.options.lineCount
      });
      for (var i = 0; i < this.options.lineCount; i++) {
        this.gm.stroke(color[i], this.options.lineWidth).drawLine(Math.floor(Math.random() * this.options.width), Math.floor(Math.random() * this.options.height), Math.floor(Math.random() * this.options.width), Math.floor(Math.random() * this.options.height));
      }
    }
  }, {
    key: 'drawDot',
    value: function drawDot() {
      var color = _pleasejs2.default.make_color({
        base_color: this.options.baseColor
      });
      this.gm.fill(color);
      for (var i = 0; i < this.options.dotCount; i++) {
        this.gm.drawPoint(Math.floor(Math.random() * this.options.width), Math.floor(Math.random() * this.options.height));
      }
    }
  }, {
    key: 'save',
    value: function save(filePath) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        if (!filePath) {
          reject('save path need!');
        }
        _this.draw();
        _this.gm.write(filePath, function (err) {
          if (err) {
            reject(err);
          }
          resolve(_this.options.text);
        });
      });
    }
  }, {
    key: 'toBuffer',
    value: function toBuffer(type) {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        var bufferType = type;
        if (!type) {
          bufferType = 'PNG';
        }
        _this2.draw();
        _this2.gm.toBuffer(bufferType, function (err, buffer) {
          if (err) {
            reject(err);
          }
          resolve({
            buffer: buffer,
            text: _this2.options.text
          });
        });
      });
    }
  }]);

  return HahooCaptcha;
}();

exports.default = HahooCaptcha;