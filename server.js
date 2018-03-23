const express = require('express')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 3000
const path = require('path')
let tutorialModel = require('./tutorialModel')
let tutorials = []
let log = []
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


/**
* HACK: Hardcoded inputs
*/
tutorials = [
  {
    "title": "Learn to code and Help Nonprofits with FreeCodeCamp",
    "link": "https://www.freecodecamp.org/",
    "programming_lang": "Javascript",
    "nature": "written",
    "language": "English"
  },
  {
    "title": "Eloquent JavaScript",
    "link": "https://eloquentjavascript.net/",
    "programming_lang": "Javascript",
    "nature": "written",
    "language": "English"
  },
  {
    "title": "Derek Banas: JavaScript Tutorial",
    "link": "https://www.youtube.com/watch?v=fju9ii8YsGs",
    "programming_lang": "Javascript",
    "nature": "videos",
    "language": "English"
  },

]


/* Answering API */
app.post('/api',(req, res, next) => {
  let params = req.body.result.parameters
  let tutsResponse = []

  tutsResponse = tutorials
                  .reduce((result, t) => {
                      if ((params.programming_lang === t.programming_lang) &&
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

/*
* Create a new tutorial
* TODO: Switch to DB
*/
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

/**
* Get a list of tutorials
*/
app.get('/api/tutorials', (req, res, next) => {
  return res.status(200).json({"tutorials": tutorials})
})

/**
* Privacy policy
*/

app.get('/privacy-policy', function(req, res) {
    res.sendFile(path.join(__dirname + '/templates/privacy.html'));
});
app.listen(PORT)
