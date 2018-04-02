const fs = require('fs-extra');
const path = require('path');

module.exports = function(){
    return fs.readdir(path.resolve(__dirname, '../memes'))
        .then((items) => items[Math.floor(Math.random()*items.length)])
        .then((meme) => path.resolve(__dirname, '../memes/' + meme));
}