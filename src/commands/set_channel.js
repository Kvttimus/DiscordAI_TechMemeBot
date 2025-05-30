const { SlashCommandBuilder, ChannelType } = require('discord.js');
const { saveTargetChannel } = require('../utils/channelStorage');

module.exports = {
    name: 'set_channel',
    description: 'Set the target channel for periodic posts',
    data: new SlashCommandBuilder()
        .setName('set_channel')
        .setDescription('Set the target channel for periodic posts')
        .addChannelOption(option =>
            option
                .setName('channel')
                .setDescription('The channel to send periodic updates in')
                .setRequired(true)
                .addChannelTypes(ChannelType.GuildText)
        ),

    async execute(interaction) {
        const channel = interaction.options.getChannel('channel');
        if (!channel) return interaction.reply({ content: 'No valid channel selected.', ephemeral: true });

        saveTargetChannel(channel.id);
        await interaction.reply(`periodic posts will now be sent to **${channel}**`);
    }
};
