const express = require('express');
const http = require('http');
const port = process.env.PORT || 3000;
const path = require('path');
const app = express();
const logger = require('../shared')

logger.initLog();

const indexRouter = require('./routes/index');
const booksRouter = require('./routes/books');

const server = http.createServer(app);
server.listen(port);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/books', booksRouter);

module.exports = app;
