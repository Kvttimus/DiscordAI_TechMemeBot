const { fetchHackerNewsArticles } = require("../utils/scrapeTechNews");

module.exports = {
    name: 'article', 
    description: 'Sends tech articles',
    async execute(interaction) {
        await interaction.reply("fetching tech articles");

        const articles = await fetchHackerNewsArticles(3);

        if (articles.length == 0) {
            return interaction.followUp("No tech articles found");
        }

        // format articles into discord msg
        const msg = articles.map((a, i) => `**${i + 1}.** [${a.title}](${a.url})`).join("\n");

        await interaction.followUp(`**Top Tech Articles:**\n\n${msg}`);
    }
};