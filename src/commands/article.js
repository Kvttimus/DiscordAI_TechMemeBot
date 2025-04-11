// const path = require('path');
// const { fetchHackerNewsArticles } = require("../utils/scrapeTechNews").config({
//     path: path.resolve(__dirname, '../utils/scrapeTechNews')
// });

const { SlashCommandBuilder } = require('discord.js');
const { fetchHackerNewsArticles } = require("../utils/scrapeTechNews")

module.exports = {
    name: 'article', 
    description: 'Sends tech articles',
    data: new SlashCommandBuilder()
        .setName('article')
        .setDescription('Sends tech articles'),
    async execute(interaction) {
        await interaction.reply("fetching tech articles");

        const articles = await fetchHackerNewsArticles(30);

        if (articles.length == 0) {
            return interaction.followUp("No tech articles found");
        }

        const selectedArticles = articles
        .sort(() => Math.random() - 0.5)  // shuffle array of articles
        .slice(0, 1); // pick first 1 after shuffle

        // format articles into discord msg
        // const msg = selectedArticles.map((a, i) => `**${i + 1}.** [${a.title}](${a.url})`).join("\n");
        const msg = selectedArticles.map((a, i) => `[${a.title}](${a.url})`).join("\n");

        // await interaction.followUp(`**Top Tech Articles:**\n\n${msg}`);
        await interaction.followUp(`${msg}`);
    }
};