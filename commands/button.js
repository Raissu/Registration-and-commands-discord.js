const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tag')
        .setDescription('solicitação de tag'),
}
