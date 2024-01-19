const express = require('express');
const { Router } = express;

module.exports = (client) => {
  const router = Router();
  router.get('/bot/hello', (req, res) => {
    // res.send('Hello, world!');
    res.sendFile("index.html", { root: "." })
  });

  return router;
};
