const connectToMongo = require('./db');
const express = require('express')

connectToMongo();

const app = express()
const port = 3000

app.use(express.json())

//Avaliable routes
app.use('/api/authentication', require('./routes/authentication'))
app.use('/api/watch_later_movies', require('./routes/watch_later_movies'))
app.use('/api/movies', require('./routes/movies'));

app.listen(port, () => {
  console.log(`netflix app listening on port ${port}`)
})