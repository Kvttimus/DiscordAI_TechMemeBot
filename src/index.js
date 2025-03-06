// Using CommonJS instead of ESM for simplicity

// Load the environment variables using dotenv package
require('dotenv').config({path: '../.env'});

// Import required packages
const { Client, GatewayIntentBits } = require('discord.js');  // allows bot to receive msgs, etc.
const axios = require('axios');  // fetch tech articles/memes

// Get bot token from .env
const token = process.env.DISCORD_TOKEN;


// Create a new client instance
const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`)
});
client.login(token);