const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Responde com Info User!'),
    async execute(interaction) {
        await interaction.reply(`Sua tag: ${interaction.user.tag}\nSeu ID: ${interaction.user.id}`);
    },
}
