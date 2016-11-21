# hahoo-captcha
A nodejs captcha module based on gm and creating random pleasing colors with PleaseJS

![image](https://raw.githubusercontent.com/hahoocn/hahoo-captcha/master/img/captcha.png)
![image](https://github.com/hahoocn/hahoo-captcha/raw/master/img/captcha2.png)

## Install

First download and install [GraphicsMagick](http://www.graphicsmagick.org/) or [ImageMagick](http://www.imagemagick.org/). In Mac OS X, you can simply use Homebrew and do:

```
brew install graphicsmagick
brew install imagemagick
```
then use npm:

```
npm install hahoo-captcha --save
```

## Usage
#### save(filePath, options)
save a captcha image
```javascript
import captcha from 'hahoo-captcha';

captcha.save('./captcha.png', {
  text: 'test',
  baseColor: 'skyblue'
})
.then((code) => {
  console.log(code);
})
.catch((err) => {
  console.log(err);
});
```
#### toBuffer(type, options)
return captcha image buffer
* `type` image type (default: png)

```javascript
import http from 'http';
import captcha from 'hahoo-captcha';

http.createServer((req, res) => {
  captcha.toBuffer()
  .then((data) => {
    console.log(data.text);
    res.writeHead(200, { 'Content-Type': 'image/png' });
    res.write(data.buffer);
    res.end();
  })
  .catch((err) => {
    console.log(err);
  });
}).listen(8080);
```

## Options
* `width` image width (default: 86)
* `height` image height (default: 38)
* `background` image background (default: #fff)
* `text` captcha text (default: random a string)
* `length` if text is empty, will random a string automatically, this length is the length of random string. (default: 4)
* `textX` left margin of text (default: 2)
* `textY` top margin of text (default: 31)
* `baseColor` the name of an HTML color(e.g. 'pink') will create a random color within the HSV range of the chosen color. if null will automatically generate a random color for captcha text.
* `font` font path
* `fontSize` font size (default: 32)
* `wordWidth` text word width (default: 19)
* `maxSwirl` the max degree of swirl (default: 20)
* `lineCount` the count of random line (default: 5)
* `lineWidth` the width of random line  (default: 1)
* `dotCount` the count of random dot (default: 200)

This is use `baseColor: 'skyblue'` option (Please refer to HTML color):

![image](https://github.com/hahoocn/hahoo-captcha/raw/master/img/captcha2.png)

## License
MIT
