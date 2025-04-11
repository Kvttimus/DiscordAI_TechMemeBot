const { Client, GatewayIntentBits } = require('discord.js');
const { postContentPeriodically } = require('../utils/periodicPost.js');
require('dotenv').config();

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

client.once('ready', async () => {
    console.log(`Logged in as ${client.user.tag}`);
    await postContentPeriodically(client);
    console.log('DONE... EXCITING...');
    process.exit(0)
})

client.login(process.env.TOKEN);