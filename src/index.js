import HahooCaptcha from './hahoo-captcha';

function save(filePath, options) {
  const captcha = new HahooCaptcha(options);
  return captcha.save(filePath);
}

function toBuffer(type, options) {
  let opts = options;
  if (type && !options && typeof type === 'object') {
    opts = type;
  }
  const captcha = new HahooCaptcha(opts);
  return captcha.toBuffer(type);
}

const captcha = {
  save,
  toBuffer
};

export default captcha;
