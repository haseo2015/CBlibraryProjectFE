const express = require('express');
const _port = process.env.PORT || 8080;
const app = express();

const staticFileMiddleware = app.use(express.static(__dirname + "/dist/"));

app.get(/.*/, function(req, res) {
  res.sendFile(__dirname + "/dist/index.html");
});

const server = app.listen(_port, () => {
  const port = server.address().port;
  console.log("App now running on port", port);
});