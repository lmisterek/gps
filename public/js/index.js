const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/index.html', function (req, res) {
  res.send('index.html');
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})