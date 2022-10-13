module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        client.user.setPresence({ activities: [{ name: 'Oficial 2°BPCHQ' }], status: 'dnd', });

        console.log(`k iniciado em ${client.user.tag}`);
    },
};