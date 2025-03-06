/*
* Purpose: Automatically loads all commands so I do not have to manually import them in index.js
*/

const fs = require('fs');
const path = require('path');
const commandsPath = path.join(__dirname, '../commands');

module.exports = (client) => {
    client.commands = new Map();

    
    // Read all files in "commands" directory
    const cmdFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    console.log(`Command Path: ${cmdFiles}`);

    for (const file of cmdFiles)
    {
        // const cmd = require(`./commands/${file}`);
        
        const cmd = require(path.join(commandsPath, file));
        client.commands.set(cmd.name, cmd);
        console.log(`Loaded cmd: ${cmd.name}`);
    }
}