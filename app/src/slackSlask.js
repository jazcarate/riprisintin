const request = require('request');
const riprisintin = require('./riprisintin')

const TOKEN = process.env.TOKEN || 'tis a token'
const URL = process.env.URL || 'http://localhost:5000/'

function build_answer(text, imageUrl){
    return {
        "response_type": "in_channel",
        "attachments": [{
            "fallback": riprisintin(text),
            "image_url": `${URL}img/${imageUrl}`
        }]
    };
}

function meta(body){
    return {
        'text': body.text,
        'author': body.user_name
    };
}

module.exports = function(cb){
    return function(req, res) {
        if(req.body.token != TOKEN){
            res.send('Hmmmmm.... algo no está bien');
            return;
        }
        
        request({
            url:     req.body.response_url,
            method:  'POST',
            json:    build_answer(req.body.text, 'kitty.jpg')
        }, function (error, response, body) {
            if(response && response.statusCode)
                cb(meta(req.body), image)
        });

        //res.sendStatus(200);
    }
}