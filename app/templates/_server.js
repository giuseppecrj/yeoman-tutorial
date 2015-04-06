process.env.NODE_ENV = process.env.NODE_ENV || 'development'

var express = require('express'),
  http = require('http'),
  app = express()

app.set('port', process.env.PORT || 3000)

app.get('/', function(req, res) {
  res.send('Hello World!')
})

http
  .createServer(app)
  .listen(app.get('port'))
  .on('listening', function() {
    console.log('Application <%= projectName %> Connected...')
    console.log('Port:\t\t', this.address().port)
  })