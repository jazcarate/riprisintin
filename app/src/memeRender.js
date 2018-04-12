const request = require('request').defaults({ encoding: null });
const { createCanvas, loadImage } = require('canvas')
const randomMeme = require('./randomMeme');

function drawMeme(ctx, height, width, text) {
    ctx.lineWidth = 8;
    ctx.font = 'bold 50pt Impact';
    ctx.strokeStyle = 'black';
    ctx.mutterLine = 2;
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    x = width / 2;

    ctx.textBaseline = 'top';
    y = 0;
    wrapText(ctx, text.top.toUpperCase(), x, y, width, 1.6, false, 50);

    ctx.textBaseline = 'bottom';
    y = height;
    wrapText(ctx, text.bottom.toUpperCase(), x, y, width, 1.6, true, 50);
}

function wrapText(context, text, x, y, maxWidth, lineHeightRatio, fromBottom, fontSize) {
    context.font = 'bold ' + fontSize + 'pt Impact';
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
        wrapText(context, text, x, y, maxWidth, lineHeightRatio, fromBottom, fontSize - 10);
    } else {
        for (var k in lines) {
            context.strokeText(lines[k], x, y + lineHeight * k);
            context.fillText(lines[k], x, y + lineHeight * k);
        }
    }

}

module.exports = function (text) {
    return randomMeme().then((imageSrc) => {
        return loadImage(imageSrc).then((image) => {
            var canvas = createCanvas(image.width, image.height);
            context = canvas.getContext('2d');
            context.drawImage(image, 0, 0);
            return canvas;
        }).then((canvas) => {
            drawMeme(context, canvas.height, canvas.width, text);
            return canvas;
        });
    });
}