// Clears discord cmd cache & properly updates all commands 
// USAGE: node clearCmdCache.js

const { REST, Routes } = require('discord.js');
require('dotenv').config();

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  try {
    console.log('clearing ALL guild commands...');

    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID),
      { body: [] }
    );

    console.log('commands cleared. Now re-run your bot to register fresh.');
  } catch (error) {
    console.error('error clearing commands:', error);
  }
})();
