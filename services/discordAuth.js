const express = require('express');
const { Router } = express;
const axios = require('axios');
const { token, clientId, clientSecret, port, redirect } = require('../config.json');


module.exports = (oauth) => {
  const router = Router();

  router.get('/login', (req, res) => {
    // Handle Discord OAuth login
    // Redirect users to Discord for authorization
    const authorizationUrl = oauth.generateAuthUrl({
      scope: ['identify'], // Specify the scopes you need
    });

    res.redirect(authorizationUrl);
  });

  
router.get('/discord/callback', async (req, res) => {
  const { code } = req.query;

  if (code) {
    try {
      const tokenResponse = await axios.post('https://discord.com/api/oauth2/token', 
        new URLSearchParams({
          client_id: clientId,
          client_secret: clientSecret,
          code,
          grant_type: 'authorization_code',
          redirect_uri: "http://localhost:3000/discord/callback",
          scope: 'identify',
        }).toString(), {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });

      const oauthData = tokenResponse.data;

      console.log(oauthData);
      // Rest of your OAuth2 callback handling logic
    } catch (error) {
      console.error('Error during Discord OAuth2 token exchange:', error);
      // Handle the error appropriately
    }
  }

  // You can return your HTML file or any other response here
  return res.sendFile('index.html', { root: '.' });
});
  

  return router;
};
