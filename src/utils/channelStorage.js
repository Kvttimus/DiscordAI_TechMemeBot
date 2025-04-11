const fs = require('fs');
const path = require('path');
const storagePath = path.join(__dirname, 'channelStorage.json');

// function getTargetChannel(client) {
//     try {
//         const data = JSON.parse(fs.readFileSync(storagePath));
//         return client.channels.cache.get(data.channelID);
//     } catch (err) {
//         console.error(`No channel set or error reading file: ${err}`);
//         return null;
//     }
// }

// function saveTargetChannel(channelID) {
//     const data = { channelID };
//     fs.writeFileSync(storagePath, JSON.stringify(data, null, 2));
// }


let targetChannelId = null;

// load from channelStorage.json at startup
try {
    const data = JSON.parse(fs.readFileSync(storagePath, 'utf-8'));
    targetChannelId = data.channelId;
} catch (err) {
    targetChannelId = null;
}

function saveTargetChannel(id) {
    targetChannelId = id;
    fs.writeFileSync(storagePath, JSON.stringify({ channelId : id }), 'utf-8');
    console.log(`The channel was set to ${targetChannelId}`);
}

function getTargetChannel(client) {
    if (!targetChannelId) return null;  // if targetChannelId is not set, it will return null

    const channel = client.channels.cache.get(targetChannelId);  // looks up channel id in cache
    return channel || null; 
}

module.exports = {
    getTargetChannel,
    saveTargetChannel
};