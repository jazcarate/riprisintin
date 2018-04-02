const express = require('express')
const path = require('path')
const loki = require('lokijs')
const bodyParser = require('body-parser');
const slackSlash = require('./src/slackSlask')
const randanimal = require('randanimal').randanimalSync;

const PORT = process.env.PORT || 5000;
const db = new loki('Ripspitin');

var renders = db.addCollection('renders', { indices: ['id'] });

function save(meta, image){
  renders.insert({'id': encodeURIComponent(randanimal()), 'meta': meta, 'image': image});
}

function retrieve(id){
  return renders.chain().find({'id': id}).limit(1).data().image;
}

function replyImg(res, img){
  res.set('Content-Type', 'image/png');
  res.send(img);
}

const memeRender = require('./src/memeRender');

function test(req, res){
  memeRender({top: 'hola', bottom: 'Ale'}).then((canvas) => {
    res.set('Content-Type', 'image/png');
    res.send(canvas.toBuffer());
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
  .post('/generate', slackSlash(save))
  .get('/test', (req, res) => test(req, res))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
