const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./routes');

app = express();

app.set('view engine', 'ejs');
app.set('views', 'src/views');

app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, '..', 'public')));

app.use(routes);

app.listen(3000);

