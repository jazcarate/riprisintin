const request = require('request');

const TOKEN = process.env.TOKEN || 'tis a token'
const URL = process.env.URL || 'http://localhost:5000/'

function meta(body){
    return {
        'text': body.text,
        'author': body.user_name
    };
}

function build_answer(imageUrl){
    return {
        "response_type": "in_channel",
        "attachments": [{
            "fallback": imageUrl,
            "image_url": `${URL}img/${imageUrl}`
        }]
    };
  }

module.exports = function(imageUrl){
    return function(req, res) {
        if(req.body.token != TOKEN){
            res.send('Hmmmmm.... algo no está bien');
            return;
        }

        imageUrl(req.body.text).then((imgUrl) => {
            request({
                url:     req.body.response_url,
                method:  'POST',
                json:    build_answer(imgUrl)
            }, function (error, response, body) {
                if(error)
                    console.log("Error:", error);
            });
        })

        res.sendStatus(200);
    }
}