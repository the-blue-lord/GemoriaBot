module.exports = async (channel, interaction) => {
    const newChannelName = channel.name.split("・")[0] + "・" + channel.name.split("・")[1];

    await channel.setName(newChannelName);

    if(newChannelName == channel.name) {
        interaction.reply({
            content: interaction.client.language.tickets.ticket_unclaimed,
            ephemeral: true
        });
    }

    return;
};