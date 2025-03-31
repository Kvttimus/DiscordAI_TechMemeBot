// const path = require('path');
// const { fetchHackerNewsArticles } = require("../utils/scrapeTechNews").config({
//     path: path.resolve(__dirname, '../utils/scrapeTechNews')
// });

const { fetchHackerNewsArticles } = require("../utils/scrapeTechNews")

module.exports = {
    name: 'article', 
    description: 'Sends tech articles',
    async execute(interaction) {
        await interaction.reply("fetching tech articles");

        const articles = await fetchHackerNewsArticles(20);

        if (articles.length == 0) {
            return interaction.followUp("No tech articles found");
        }

        const selectedArticles = articles
        .sort(() => Math.random() - 0.5)  // shuffle array of articles
        .slice(0, 1); // pick first 1 after shuffle

        // format articles into discord msg
        const msg = selectedArticles.map((a, i) => `**${i + 1}.** [${a.title}](${a.url})`).join("\n");

        await interaction.followUp(`**Top Tech Articles:**\n\n${msg}`);
    }
};