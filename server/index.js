const path = require('path');
const express = require('express');
const models = require('./models/api.js');

const PORT = 2373;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join('/../public')));

app.get('/api/reviews/:id', (req, res) => {
  const requestId = req.originalUrl.substring('/api/reviews/'.length);
  models.getAll(requestId, (error, reviews) => {
    if (error) {
      console.log(error);
      res.status(502).send('There was an error with your request');
    } else {
      res.status(200).json(reviews);
    }
  });
});

app.listen(PORT, () => console.log(`🚀🚀 reviews server connected!\n🚀🚀 Listening on ${PORT}`));
