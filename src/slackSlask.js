const request = require('request');
const riprisintin = require('./riprisintin')

const TOKEN = process.env.TOKEN || 'tis a token'
const URL = process.env.URL || 'http://localhost:5000/'

function build_answer(text, imageUrl){
    return {
        "response_type": "in_channel",
        "attachments": [{
            "fallback": riprisintin(text),
            "image_url": `${URL}${imageUrl}`
        }]
    };
}

module.exports = function(req, res) {
    if(req.body.token != TOKEN){
        res.send('Hmmmmm.... algo no está bien');
        return;
    }
    
    request({
        url:     req.body.response_url,
        method:  'POST',
        json:    build_answer(req.body.text, 'kitty.jpg')
    }, function (error, response, body) {
        console.log('error:', error);
        console.log('statusCode:', response && response.statusCode);
        console.log('body:', body)
    });

    res.sendStatus(200);
}