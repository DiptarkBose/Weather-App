const express = require('express');
const app = express();
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient

app.use(bodyParser.urlencoded({ extended: true }))

MongoClient.connect('mongodb+srv://<username>:<password>@cluster0.bc5lq.mongodb.net/weather-app?retryWrites=true&w=majority', (err, client) => {
  if (err) return console.error(err)
  console.log('Connected to Database')
  const db = client.db('weather-app')
  const userPrefs = db.collection('userPrefs')

  // Handle Requests
  app.listen(process.env.PORT || 3000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });

  app.get('/', (req, res) => {
    res.send('Hello World')
  })

  app.get('/showPrefs', (req, res) => {
    db.collection('userPrefs').find().toArray()
    .then(results => {
      console.log(results)
      res.send(results)
    })
    .catch(error => console.error(error))
  })

  app.post('/userPrefs', (req, res) => {
    console.log(req.body)
    userPrefs.insertOne(req.body)
      .then(result => {
        console.log(result)
      })
      .catch(error => console.error(error))
    res.send("Yep, POST works too!");
  })
})
