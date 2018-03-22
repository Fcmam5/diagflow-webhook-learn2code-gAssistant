const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


let log = []

/* GET home page. */
app.post('/api',(req, res, next) => {
  log.push(req)
  let response = "Hello world"
    res.json({
              "speech": response,
              "displayText": response
            })
});

app.get('/api',(req, res, next) => {
    res.json({"log": log})
});

app.listen(3000)
