#!/usr/bin/node
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  let filePath = path.join(__dirname, req.url === '/' ? '/index.html' : `${req.url}.html`);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.log(err);
      fs.readFile(path.join(__dirname, '404.html'), (err, data) => {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        return res.end(data);
      });
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      return res.end(data);
    }
  });
});

const PORT = process.env.port || 8080;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
