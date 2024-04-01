const sendErrorEmbed = require("../sendErrorEmbed");

module.exports = async (channel, interaction) => {
    if(channel.parentId == interaction.client.tickets.closed_category_id) {
        sendErrorEmbed(interaction.client, interaction, "closed_ticket");
        return;
    }

    const newChannelName = interaction.client.tickets.closed_emoji + channel.name;

    await channel.setName(newChannelName);

    if(channel.name != newChannelName) return;

    await channel.setParent(interaction.client.tickets.closed_category_id);

    interaction.editReply({
        content: "The ticket was successfully closed!",
        ephemeral: true
    });

    return;
};