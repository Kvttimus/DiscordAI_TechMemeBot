const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    name: 'help', 
    description: 'how to use the bot + list of cmds',
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('how to use the bot + list of cmds'),
    async execute(interaction) {
        await interaction.reply("`help` returns basic usage information\n`memes` returns a recently trending meme\n`article` returns a recently trending tech-related article");
    }
};