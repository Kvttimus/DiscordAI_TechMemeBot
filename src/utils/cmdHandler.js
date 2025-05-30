/*
* Purpose: Automatically loads all commands so I do not have to manually import them in index.js
*/


const fs = require('fs');
const path = require('path');
const { REST, Routes } = require('discord.js');
require('dotenv').config();  // Loads .env file

const cmdsPath = path.join(__dirname, '../commands');

module.exports = async (client) => {
    client.commands = new Map();

    const cmdFiles = fs.readdirSync(cmdsPath).filter(file => file.endsWith('.js'));
    console.log(`Command Path: ${cmdFiles}`);

    const cmdsToRegister = [];

    for (const file of cmdFiles) {
        const cmd = require(path.join(cmdsPath, file));

        const name = cmd.data?.name || cmd.name;
        if (!name || !cmd.execute) {
            console.warn(`⚠️ Skipping ${file} — missing "name" or "execute"`);
            continue;
        }

        client.commands.set(name, cmd);
        console.log(`✅ Loaded cmd: ${name}`);

        if (cmd.data && typeof cmd.data.toJSON === 'function') {
            cmdsToRegister.push(cmd.data.toJSON());
        }
    }

    // Register slash commands with Discord
    try {
        const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

        console.log('🔁 Registering slash commands...');
        await rest.put(
            Routes.applicationCommands(process.env.CLIENT_ID),
            { body: cmdsToRegister }
        );
        console.log('slash commands registered!');
    } catch (err) {
        console.error('❌ Error registering slash commands:', err);
    }
};

