const { SlashCommandBuilder } = require('discord.js');
const { fetchMemes } = require("../utils/scrapeTechMemes");

module.exports = {
    name: 'memes', 
    description: 'Sends tech memes',
    data: new SlashCommandBuilder()
        .setName('memes')
        .setDescription('Sends tech memes'),
    async execute(interaction) {
        await interaction.reply("fetching tech memes");

        const memes = await fetchMemes(30);

        if (memes.length == 0) {
            return interaction.followUp("No tech memes found");
        }

        const selectedMemes = memes
        .sort(() => Math.random() - 0.5)  // shuffle array of articles
        .slice(0, 1); // pick first 1 after shuffle

        // format articles into discord msg
        // const msg = selectedMemes.map((a, i) => `**${i + 1}.** [${a.title}](${a.url})`).join("\n");
        const msg = selectedMemes.map((a, i) => `[${a.title}](${a.url})`).join("\n");


        // await interaction.followUp(`**Cool Tech Meme:**\n\n${msg}`);
        await interaction.followUp(`${msg}`);
    }
};



// module.exports = {
//     name: 'meme', 
//     description: 'gives memes',
//     async execute(interaction) {
//         await interaction.reply("sent meme lol");
//     }
// };