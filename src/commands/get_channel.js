const { SlashCommandBuilder, ChannelType } = require('discord.js');
const { getTargetChannel } = require('../utils/channelStorage');

module.exports = {
    name: 'get_channel',
    description: 'Returns the name of the target channel for periodic posts',
    data: new SlashCommandBuilder()
        .setName('get_channel')
        .setDescription('Returns the name of the target channel for periodic posts'),
        // .addChannelOption(option =>
        //     option
        //         .setName('channel')
        //         .setDescription('The channel to send periodic updates in')
        //         .setRequired(true)
        //         .addChannelTypes(ChannelType.GuildText)
        // ),

    async execute(interaction) {
        // const channel = interaction.options.getChannel('channel');
        const channel = getTargetChannel(interaction.client);
        
        if (!channel) {
            return interaction.reply({ content: 'No valid channel has been selected yet.', ephemeral: true });
        }

        await interaction.reply(`periodic posts are currently sent in **${channel.name}**`);
    }
};
