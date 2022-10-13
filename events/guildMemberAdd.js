const { EmbedBuilder, GuildMember } = require('discord.js');

module.exports = {
    name: 'guildMemberAdd',
    once: false,
    execute(member) {
        console.log("cheguei aq")

        const { interaction } = member;
        const welcomeChannel = member.guild.channels.cache.find(
            channel => channel.name === 'bem-vindo'
        );

        const welcomeMessage = `Bem vindo **${member.user.tag}** na academia do 2°BPCHQ`;

        const welcomeEmbed = new EmbedBuilder()
            .setTitle('Novo membro chegou!')
            .setThumbnail(member.user.displayAvatarURL())
            .setDescription(welcomeMessage)
            .setColor('DarkOrange')
            .setTimestamp();

        welcomeChannel.send({ embeds: [welcomeEmbed] });
    }
}