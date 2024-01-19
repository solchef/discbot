const express = require('express');
const { Router } = express;

module.exports = (client) => {
  const router = Router();
console.log('kj')
  // Define routes or middleware related to your bot here

  // Example: Respond with "Hello, world!" when accessing /bot/hello
  router.get('/verify/home', (req, res) => {
 

	res.send('Hello, world!');
  });
  return router;
};
