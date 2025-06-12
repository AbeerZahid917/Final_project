const connectToMongo = require('./db');
const express = require('express')
const cors = require('cors');

connectToMongo();

const app = express()
const port = 5000

app.use(express.json())
app.use(cors());


//Avaliable routes
app.use('/api/authentication', require('./routes/authentication'))
app.use('/api/watch_later_movies', require('./routes/watch_later_movies'))
app.use('/api/movies', require('./routes/movies'));
app.use('/api/favorites', require('./routes/favorites'));

app.listen(5000, () => {
  console.log(`netflix app listening on port ${port}`)
})