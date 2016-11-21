import gm from 'gm';
import please from 'pleasejs';
import randomstring from 'randomstring';
import path from 'path';

class HahooCaptcha {
  constructor(options) {
    const opts = options || {};
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
      this.options.text = randomstring.generate({
        length: this.options.length,
        charset: '23456789abcdefghkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ'
      });
    }
  }

  draw() {
    this.gm = gm(this.options.width, this.options.height, this.options.background);
    this.drawText();
    this.drawDot();
    this.drawLine();
  }

  drawText() {
    const color = please.make_color({
      base_color: this.options.baseColor,
      colors_returned: this.options.text.length
    });
    for (let i = 0; i < this.options.text.length; i++) {
      this.gm
      .stroke(color[i], 1)
      .fill(color[i])
      .font(path.join(__dirname, this.options.font))
      .fontSize(this.options.fontSize)
      .drawText(
        (this.options.wordWidth * i) + this.options.textX,
        this.options.textY,
        this.options.text[i]
      );
    }
    this.gm
    // .wave(5, Math.floor(Math.random() * (100)) + 50)
    // .noise(this.options.textNoise, 'gaussian')
    .swirl(Math.floor(Math.random() * (this.options.maxSwirl)) + 1);
  }

  drawLine() {
    const color = please.make_color({
      base_color: this.options.baseColor,
      colors_returned: this.options.lineCount
    });
    for (let i = 0; i < this.options.lineCount; i++) {
      this.gm
      .stroke(color[i], this.options.lineWidth)
      .drawLine(
        Math.floor(Math.random() * (this.options.width)),
        Math.floor(Math.random() * (this.options.height)),
        Math.floor(Math.random() * (this.options.width)),
        Math.floor(Math.random() * (this.options.height))
      );
    }
  }

  drawDot() {
    const color = please.make_color({
      base_color: this.options.baseColor
    });
    this.gm.fill(color);
    for (let i = 0; i < this.options.dotCount; i++) {
      this.gm.drawPoint(
        Math.floor(Math.random() * (this.options.width)),
        Math.floor(Math.random() * (this.options.height))
      );
    }
  }

  save(filePath) {
    return new Promise((resolve, reject) => {
      if (!filePath) {
        reject('save path need!');
      }
      this.draw();
      this.gm.write(filePath, (err) => {
        if (err) {
          reject(err);
        }
        resolve(this.options.text);
      });
    });
  }

  toBuffer(type) {
    return new Promise((resolve, reject) => {
      let bufferType = type;
      if (!type) {
        bufferType = 'PNG';
      }
      this.draw();
      this.gm.toBuffer(bufferType, (err, buffer) => {
        if (err) {
          reject(err);
        }
        resolve({
          buffer,
          text: this.options.text
        });
      });
    });
  }
}

export default HahooCaptcha;
