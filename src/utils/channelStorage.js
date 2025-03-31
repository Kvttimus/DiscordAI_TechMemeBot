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

// module.exports = {
//     getTargetChannel,
//     saveTargetChannel
// };