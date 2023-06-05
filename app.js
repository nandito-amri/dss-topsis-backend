const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 9000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const appRoute = require('./src/routes/route');
app.use('/', appRoute);

app.listen(port, () => {
  console.log(`Server berjalan pada ${port}`);
});
