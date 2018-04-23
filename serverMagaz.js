const express = require('express');
const server = express();
server.use(require('connect-history-api-fallback')());
server.use('/', express.static(__dirname + '/dist/'));
const instance = server.listen(5000, function () {
  const host = instance.address().address;
  const port = instance.address().port;
  console.log("Example app listening at http://%s:%s", host, port);
});
