const express = require('express')
const bodyParser = require('body-parser')
let tutorialModel = require('./tutorialModel')
let tutorials = []
let log = []
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

/* GET home page. */
app.post('/api',(req, res, next) => {
  let params = req.body.result.parameters
  let tutsResponse = []

  tutsResponse = tutorials
                  .reduce((t, result) => {
                      if ((params.programming_lang = t.programming_lang) &&
                                (t.language === params.language) ||
                                (t.nature === params.nature)
                              ) return result.push(t.getRessource() + "\n")
                            else {
                              return t
                            }
                  }, [])

  log.push({"params":params,"returned": tutsResponse})

  return res.json({
            "speech": "I've found about" + tutsResponse.length + " tutorials",
            "displayText": tutsResponse
          })
})

app.get('/api',(req, res, next) => {
    res.json({"log": log})
})

app.post('/api/tutorials/', (req, res, next) => {
  let newTutorial = new tutorialModel({
    title: req.body.title,
    link: req.body.link,
    nature: req.body.nature,
    language: req.body.language
  })

  tutorials.push(newTutorial.getRessource())

  return res.status(201).json({"tutorials": tutorials})
})

app.get('/api/tutorials', (req, res, next) => {
  return res.status(200).json({"tutorials": tutorials})
})

app.listen(3000)
