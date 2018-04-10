# Riprisintin slash command [![Build Status](https://travis-ci.org/jazcarate/riprisintin.svg?branch=master)](https://travis-ci.org/jazcarate/riprisintin)

# Development
Se necesitan un par de bibliotecas locas; así que `Vagrant` es tu amigo. Pero en Heroku levanta con Docker, así que eso tambien funciona (`docker build -t riprisintin . && docker run -p 5000:5000 riprisintin`)

`$ yarn start`

# Deploy a heroku
```
$ heroku login
$ heroku container:login
$ docker build -t riprisintin .
$ heroku container:push web
```