module.exports = async (channel, helper, interaction) => {
    const newChannelName = channel.name + "・" + helper.user.username;

    await channel.setName(newChannelName);

    if(newChannelName == channel.name) {
        interaction.editReply({
            content: interaction.client.language.tickets.ticket_claimed,
            ephemeral: true
        });
    }

    return;
};