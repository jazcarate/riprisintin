const express = require('express')
const path = require('path')
const loki = require('lokijs')
const randanimal = require('randanimal').randanimalSync
const bodyParser = require('body-parser')
const slackSlash = require('./src/slackSlask')
const riprisintin = require('./src/riprisintin')

const PORT = process.env.PORT || 5000;
const db = new loki('Ripspitin');

var renders = db.addCollection('renders', { indices: ['id'] });

function randomID(){
  return encodeURIComponent(randanimal().replace(' ', '-').toLowerCase());
}

function save(img){
  const toSave = {'id': randomID(), 'img': img};
  renders.insert(toSave);
  console.log("Saving: ", toSave.id);
  return toSave;
}

function retrieve(id){
  console.log("retrieve: ", id);
  
  const info = renders.chain().find({'id': id}).limit(1).data()[0];
  return info.img;
}

function replyImg(res, img){
  res.set('Content-Type', 'image/png');
  res.send(img);
}

const memeRender = require('./src/memeRender');

function test(req, res){
  memeRender(split(riprisintin(req.body.text))).then((canvas) => replyImg(res, canvas.toBuffer()) );
}

function split(text){
  if(text.length < 30) {
    return {top: '', bottom: text};
  } else {
    var middle = Math.floor(text.length / 2);
    var before = text.lastIndexOf(' ', middle);
    var after = text.indexOf(' ', middle + 1);

    if (middle - before < after - middle) {
        middle = before;
    } else {
        middle = after;
    }

    return {top: text.substr(0, middle), bottom: text.substr(middle + 1)};
  }
}

function imageUrl(text){
  return memeRender(split(riprisintin(text))).then((canvas) => {
    return save(canvas.toBuffer()).id;
  });
}

express()
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('main'))
  .get('/img/:id', (req, res) => replyImg(res, retrieve(req.params.id)))
  .post('/generate', slackSlash(imageUrl))
  .post('/test', (req, res) => test(req, res))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
