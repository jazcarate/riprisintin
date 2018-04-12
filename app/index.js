const express = require('express')
const path = require('path')
const imgur = require('imgur')
const bodyParser = require('body-parser')
const slackSlash = require('./src/slackSlask')
const riprisintin = require('./src/riprisintin')
const memeRender = require('./src/memeRender')
const split = require('./src/split')

const PORT = process.env.PORT || 5000;

function save(canvas){
  return imgur.uploadBase64(canvas.toDataURL().substring("data:image/png;base64,".length))
              .then((json) => json.data.link)
              .catch((err) => "https://i.imgur.com/oJfFRWk.png");
}

function replyImg(res, img){
  res.set('Content-Type', 'image/png');
  res.send(img);
}




function test(req, res){
  return Promise.resolve(req.body.text)
                .then(riprisintin)
                .then(split)
                .then(memeRender)
                .then((canvas) => replyImg(res, canvas.toBuffer()));
}

function imageUrl(text){
  return Promise.resolve(text)
                .then(riprisintin)
                .then(split)
                .then(memeRender)
                .then(save);
}

express()
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('main'))
  .post('/generate', slackSlash(imageUrl))
  .post('/test', (req, res) => test(req, res))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
