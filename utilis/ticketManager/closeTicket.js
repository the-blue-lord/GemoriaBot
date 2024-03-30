module.exports = async (channel, interaction) => {
    const newChannelName = interaction.client.tickets.closed_emoji + channel.name;

    await channel.setName(newChannelName);

    if(channel.name != newChannelName) return;

    await channel.setParent(interaction.client.tickets.closed_category_id);

    interaction.reply({
        content: "The ticket was successfully closed!",
        ephemeral: "true"
    });

    return;
};