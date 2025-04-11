const { getTargetChannel } = require('./channelStorage.js');
const articleCommand = require('../commands/article.js');
const memeCommand = require('../commands/meme.js');

async function postContentPeriodically(client) {
    const channel = getTargetChannel(client);
    if (!channel) {
        console.log("No channel set for periodic posting");
        return;
    }

    try {
        const fakeInteraction = {
            client,
            channel,
            reply: (msg) => channel.send(msg),
            deferReply: async () => {},
            editReply: async (msg) => channel.send(msg),
            followUp: async (msg) => channel.send(msg),
        };
        await articleCommand.execute(fakeInteraction);
        console.log('Article command executed');

        await memeCommand.execute(fakeInteraction);
        console.log('Meme command executed')

        console.log('🔥Periodic content posted');
    } catch (err) {
        console.error(`😭Error posting periodic content: ${err}`);
    }
}

module.exports = { postContentPeriodically };
