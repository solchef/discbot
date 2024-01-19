const express = require('express');
const { Router } = express;
const Web3 = require('web3');
const Web3Modal = require('web3modal');

module.exports = (web3Modal) => {
  const router = Router();

  router.get('/web3/login', async (req, res) => {
    try {
      const provider = await web3Modal.connect();
      const web3 = new Web3(provider);

      // Use 'web3' to interact with the Ethereum network as needed

      // For example, get the current account
      const accounts = await web3.eth.getAccounts();
      const currentAccount = accounts[0];

      res.render('web3loggedin', { currentAccount });
    } catch (error) {
      console.error('Web3 authentication error:', error.message);
      res.status(500).send('Web3 authentication error');
    }
  });

  return router;
};
