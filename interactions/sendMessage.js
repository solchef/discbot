const { MessageActionRow, MessageButton } = require('discord.js');

// Function to send a welcome message with buttons
async function sendWelcomeMessage(member) {
  // Create buttons
  const joinButton = new MessageButton()
    .setLabel('Join Now')
    .setStyle('LINK')
    .setURL('https://example.com/join');

  const rulesButton = new MessageButton()
    .setLabel('Read the Rules')
    .setStyle('LINK')
    .setURL('https://example.com/rules');

  // Create a row of buttons
  const buttonRow = new MessageActionRow().addComponents(joinButton, rulesButton);

  // Construct the welcome message
  const welcomeMessage = `**Welcome to Collab.Land!**\n\n` +
    '🔒 This is a secure connection. Never share your private keys or seed phrase.\n' +
    '🚫 We will never ask for your seed phrase. We will never DM you.\n\n' +
    'Please take a moment to verify your membership:\n';

  // Send the message with buttons
  await member.send({ content: welcomeMessage, components: [buttonRow] });
}

