const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const port = 9000;

app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const appRoute = require('./src/routes/route');
app.use('/', appRoute);

app.listen(port, () => {
  console.log(`Server berjalan pada ${port}`);
});
