// Load the environment variables using dotenv package
require('dotenv').config({path: '../.env'});

const token = process.env.DISCORD_TOKEN;


// Import required packages
const { Client, GatewayIntentBits } = require('discord.js');  // allows bot to receive msgs, etc.
const axios = require('axios');  // fetch tech articles/memes
