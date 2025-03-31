// Using CommonJS instead of ESM for simplicity
/*
* Purpose: This is basically the main file
*/

// Load the environment variables using dotenv package
const path = require('path');
require('dotenv').config({
    path: path.resolve(__dirname, '../.env')
});

// Defining constants
const { Client, GatewayIntentBits, REST, Routes } = require('discord.js');  // allows bot to receive msgs, etc.
const registerCmds = require('./utils/cmdHandler');
const token = process.env.DISCORD_TOKEN;  // get bot token from .env
const client = new Client({ intents: [GatewayIntentBits.Guilds] });  // create a new client instance


// Load all commands
registerCmds(client);

client.once('ready', async () => {
    console.log(`Logged in as ${client.user.tag}`)

    // Register slash commands
    const commands = Array.from(client.commands.values()).map(command => ({
        name: command.name,
        description: command.description,
    }));

    const rest = new REST({version : '10'}).setToken(token);
    rest.put(Routes.applicationCommands(client.user.id), {body: commands})
    .then(() => console.log('Slash cmds registered!!!'))
    .catch(console.error);
});

// Listen for slash cmds
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);
    if (command)
    {
        try
        {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'Error executing command!', ephemeral: true});
        }
    }
})


client.login(token);