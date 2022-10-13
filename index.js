// faz o chamado da biblioteca instalada e da instancia 
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessageReactions,
    ],
});

///

client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    client.commands.set(command.data.name, command);
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    } else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}


client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});


client.on('messageCreate', async msg => {

    if (msg.content === 'n!tag') {
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('primary')
                    .setLabel('Realizar inscrição!')
                    .setStyle(ButtonStyle.Primary),
            );

        const embed = new EmbedBuilder()
            .setColor('Gold')
            .setThumbnail(client.user.displayAvatarURL())
            .setTitle('1° Etapa (Concurso 2°BPCHQ)')
            .setDescription('Realize seu cadastro clicando no botão abaixo e aguarde análise para estar recebendo a tag de conscrito!');

        await msg.channel.send({ content: '', embeds: [embed], components: [row] });
        await msg.delete()
    }
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;

    if (interaction.customId === 'primary') {
        // Create the modal
        const modal = new ModalBuilder()
            .setCustomId('myModal')
            .setTitle('Cadastro / 2°BPCHQ');

        const nameInput = new TextInputBuilder()
            .setCustomId('nameInput')
            // The label is the prompt the user sees for this input
            .setLabel("Qual seu nome e sobrenome ?")
            // Short means only a single line of text
            .setStyle(TextInputStyle.Short);

        const ageInput = new TextInputBuilder()
            .setCustomId('ageInput')
            .setLabel("Qual sua idade ?")
            // Paragraph means multiple lines of text.
            .setStyle(TextInputStyle.Short);

        const passportInput = new TextInputBuilder()
            .setCustomId('passportInput')
            .setLabel("Qual seu RG ?")
            // Paragraph means multiple lines of text.
            .setStyle(TextInputStyle.Short);

        /*
    const ticketInput = new TextInputBuilder()
        .setCustomId('ticketInput')
        .setLabel("Meio de concurso ou transferencia ?")
        // Paragraph means multiple lines of text.
        .setStyle(TextInputStyle.Short);

    const patentInput = new TextInputBuilder()
        .setCustomId('patentInput')
        .setLabel("Qual sua ultima patente ? transf apenas")
        // Paragraph means multiple lines of text.
        .setStyle(TextInputStyle.Short);*/

        // An action row only holds one text input,
        // so you need one action row per text input.
        const firstActionRow = new ActionRowBuilder().addComponents(nameInput);
        const secondActionRow = new ActionRowBuilder().addComponents(ageInput);
        const thirdActionRow = new ActionRowBuilder().addComponents(passportInput);
        /*const fourthActionRow = new ActionRowBuilder().addComponents(ticketInput);
        const fifthActionRow = new ActionRowBuilder().addComponents(patentInput);
        */
        // Add inputs to the modal
        modal.addComponents(firstActionRow, secondActionRow, thirdActionRow);


        // Show the modal to the user
        await interaction.showModal(modal);
    }
})

client.on('interactionCreate', async interaction => {
    if (!interaction.isModalSubmit()) return;

    if (interaction.customId === 'myModal') {
        const nameModalInput = interaction.fields.getTextInputValue('nameInput');
        const ageModalInput = interaction.fields.getTextInputValue('ageInput');
        const passportModalInput = interaction.fields.getTextInputValue('passportInput');

        const embedSubmitModal = new EmbedBuilder()
            .setTitle(`Realizado por:  ${interaction.user.tag}`)
            .setDescription(`Nome: ${nameModalInput}\n\nIdade: ${ageModalInput}\n\nPassaporte: ${passportModalInput}`)
            .setColor('DarkGold')
            .setThumbnail(interaction.user.avatarURL())
            .setTimestamp(Date.now())
            .setFooter({
                iconURL: client.user.displayAvatarURL(),
                text: client.user.tag
            });

        const myChannel = interaction.guild.channels.cache.find(
            channel => channel.name === 'cadastros-visitantes'
        );

        const { interaction: messageSent } = await interaction.reply('enviado!');

        await messageSent.deleteReply();

        /*setTimeout(async () => await messageSent.deleteReply(), 3000);*/

        await myChannel.send({ embeds: [embedSubmitModal] })
    }
});

///

client.login(token);




















