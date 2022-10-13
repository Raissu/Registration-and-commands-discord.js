const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('prune')
        .setDescription('Deleta até 90 mensagens totais')
        .addIntegerOption(option => option.setName('quantia').setDescription('Numero de mensagens para deletar')),
    async execute(interaction) {
        const amount = interaction.options.getInteger('quantia');

        if (amount < 1 || amount > 99) {
            return interaction.reply({ content: 'Você precisa inserir um número entre 1 e 99.', ephemeral: true });
        }
        await interaction.channel.bulkDelete(amount, true).catch(error => {
            console.error(error);
            interaction.reply({ content: 'Ocorreu um erro ao tentar remover mensagens neste canal!', ephemeral: true });
        });

        return interaction.reply({ content: `Foram apagados \`${amount}\` mensagens com sucesso.`, ephemeral: true });
    },
};