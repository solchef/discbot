const express = require("express");
const ejs = require("ejs");
const { Client, GatewayIntentBits, Collection } = require("discord.js"); // Added Collection
const OAuth2 = require("discord-oauth2");
const fs = require("fs");
const path = require("path");
const { WebhookClient } = require('discord.js');


const { token, clientId, clientSecret, port } = require("./config.json");

const app = express();
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const webhook = new WebhookClient({ id: '1197914408781893753', token: '1197914408781893753/o6RauKFy5vBA7VA5ivYZTiPFBzxDau58yN2r5FZVEUKM0QgotkINxiee330zkKvnh9P4' });


// Initialize client.commands as a Collection
client.commands = new Collection();

const oauth = new OAuth2({
	clientId,
	clientSecret,
	redirectUri: `http://localhost:${port}/discord/callback`,
});

// EJS as the view engine
app.set("view engine", "ejs");
app.set("views", "views");

// Serve static files (CSS, images, etc.) from the 'public' folder
app.use(express.static("public"));

// Import routers
const botRouter = require("./services/bot")(client);
const discordAuthRouter = require("./services/discordAuth")(oauth);
const web3AuthRouter = require("./services/web3Auth");
const pages = require("./services/pages");


//interactions
const handleButtons = require('./interactions/handleButtons');

client.on('guildMemberAdd', async (member) => {
	// Send the welcome message to the new member
	await sendWelcomeMessage(member);
  });


  // Event listener for handling interactionCreate
client.on("interactionCreate", async (interaction) => {
	if (!interaction.isButton()) return;

	// Handle button interactions
	handleButtons(interaction);
});


//webhooks
client.on('guildMemberAdd', (member) => {
	// Send a message to the webhook when a new member joins
	webhook.send(`New member joined: ${member.displayName}`);
  });
  

// Middleware to use express in the Discord bot service
app.use(botRouter);
app.use(pages);
// Middleware to use express in the Discord authentication service
app.use(discordAuthRouter);

// Middleware to use express in the Web3 authentication service
app.use(web3AuthRouter);

// Load commands dynamically from commands/utility
const utilityCommandsPath = path.join(__dirname, "commands", "utility");


fs.readdirSync(utilityCommandsPath).forEach((file) => {
	const filePath = path.join(utilityCommandsPath, file);

	// Assuming your command files have an execute function
	const command = require(filePath);

	if ("data" in command && "execute" in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(
			`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`,
		);
	}
});

// Start the combined server
app.listen(port, () => {
	console.log(`Server is running at http://localhost:${port}`);

	// Log in the Discord bot
	client.login(token).catch((error) => {
		console.error("Error during login:", error.message);
		process.exit(1); // Exit the process with an error code
	});
});
