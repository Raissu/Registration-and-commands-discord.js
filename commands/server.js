const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('server')
        .setDescription('Responde com info server!'),
    async execute(interaction) {
        await interaction.reply(`Nome do servidor: ${interaction.guild.name}\nTotal de membros: ${interaction.guild.memberCount}`);
    },
}
