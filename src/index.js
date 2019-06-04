'use strict'

const express = require('express')

const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

app.set('port', 4000)

app.use(require('./routes'))

app.listen(app.get('port'), () => {
  console.log('Server on port', app.get('port'))
})
