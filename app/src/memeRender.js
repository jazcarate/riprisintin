const request = require('request').defaults({ encoding: null });
const { createCanvas, loadImage } = require('canvas')
const randomMeme = require('./randomMeme');

function drawMeme(ctx, height, width, top, botom) {
    ctx.lineWidth = 8;
    ctx.font = 'bold 50pt Impact';
    ctx.strokeStyle = 'black';
    ctx.mutterLine = 2;
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';

    ctx.textBaseline = 'top';
    var text1 = top;
    text1 = text1.toUpperCase();
    x = width / 2;
    y = 0;
    wrapText(ctx, text1, x, y, width, 1.6, false, 50);

    ctx.textBaseline = 'bottom';
    var text1 = botom;
    text1 = text1.toUpperCase();
    y = height;
    wrapText(ctx, text1, x, y, width, 1.6, true, 50);
}

function wrapText(context, text, x, y, maxWidth, lineHeightRatio, fromBottom, fontSize) {
    context.font = 'bold ' + fontSize + 'pt Impact';
    // If from the bottom, use unshift so the lines can be added to the top of the array.
    // Required since the lines at the bottom are laid out from bottom up.
    var pushMethod = (fromBottom) ? 'unshift' : 'push';

    _lineHeightRatio = (fromBottom) ? -lineHeightRatio : lineHeightRatio;
    var lineHeight = _lineHeightRatio * fontSize;

    var lines = [];
    var y = y;
    var line = '';
    var words = text.split(' ');

    for (var n = 0; n < words.length; n++) {
        var testLine = line + ' ' + words[n];
        var metrics = context.measureText(testLine);
        var testWidth = metrics.width;

        if (testWidth > maxWidth) {
            lines[pushMethod](line);
            line = words[n] + ' ';
        } else {
            line = testLine;
        }
    }
    lines[pushMethod](line);

    if (lines.length > 2) {
        console.log('Too big.', fontSize);
        wrapText(context, text, x, y, maxWidth, lineHeightRatio, fromBottom, fontSize - 10);
    }
    else {
        for (var k in lines) {
            context.strokeText(lines[k], x, y + lineHeight * k);
            context.fillText(lines[k], x, y + lineHeight * k);
        }
    }

}

module.exports = function (config) {
    var defaults = {
        top: '',
        bottom: ''
    };
    var opts = Object.assign({}, defaults, config);

    var that = this;

    return randomMeme().then((imageSrc) => {
        return loadImage(imageSrc).then((image) => {
            var canvas = createCanvas(image.width, image.height);
            context = canvas.getContext('2d');
            context.drawImage(image, 0, 0);
            return canvas
        }).then((canvas) => {
            drawMeme(context, canvas.height, canvas.width, opts.top, opts.bottom);
            return canvas;
        });
        
        //return canvas.toBuffer();
    });
};