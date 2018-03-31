const express = require('express')
const path = require('path')
const bodyParser = require('body-parser');
const slackSlash = require('./src/slackSlask')

const PORT = process.env.PORT || 5000

express()
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('main'))
  .post('/generate', slackSlash)
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
