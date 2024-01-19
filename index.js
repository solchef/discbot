// index.js

const express = require("express");
const Moralis = require("moralis").default;
const discord = require("discord.js");
require("dotenv").config();

const app = express();
const port = 3004;

app.use(express.json());

// Discord Bot Setup
const client = new discord.Client({
  intents: [],
});


// console.log('disc')
// client.login(process.env.PASS);

// Express endpoint to handle webhook
app.post("/webhook", async (req, res) => {
  const { body, headers } = req;

  try {
    // Verify Moralis request
    Moralis.Streams.verifySignature({
      body,
      signature: headers["x-signature"],
    });

    // Extract relevant data from Moralis request
    let from = body.txs[0].fromAddress;
    let amount = Number(body.txs[0].value / 1E18);

    // Fetch Discord channel and send notification
    // const channel = await client.channels.fetch(process.env.CHANNEL);
    channel.send(`New Donation submitted by ${from}, for ${amount.toFixed(2)} MATIC!!!!`);

    return res.status(200).json();
  } catch (e) {
    console.log("Not Moralis");
    return res.status(400).json();
  }
});

// Moralis setup
Moralis.start({
  apiKey: process.env.APIKEY,
}).then(() => {
  app.listen(port, () => {
    console.log(`Listening to streams`);
  });
});
