/*
* Purpose: Automatically loads all commands so I do not have to manually import them in index.js
*/

const fs = require('fs');
const path = require('path');

module.exports = (client) => {
    client.commands = new Map();

    // Read all files in "commands" directory
    const cmdFiles = fs.readdirSync(path.join(__dirname, 'commands')).filter(file => file.endsWith('.js'));

    for (const file of cmdFiles)
    {
        const cmd = require(`./commands/${file}`);
        client.commands.set(cmd.name, cmd);
        console.log(`Loaded cmd: ${cmd.name}`);
    }
}