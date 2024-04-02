const sendErrorEmbed = require("../embedHandlers/sendErrorEmbed");
const sendSuccessEmbed = require("../embedHandlers/sendSuccessEmbed");

module.exports = async (channel, interaction) => {
    if(channel.parentId == interaction.client.tickets.closed_category_id) {
        sendErrorEmbed(interaction.client, interaction, "closed_ticket");
        return;
    }

    const newChannelName = interaction.client.tickets.closed_emoji + channel.name;

    await channel.setName(newChannelName);

    if(channel.name != newChannelName) return;

    await channel.setParent(interaction.client.tickets.closed_category_id);

    sendSuccessEmbed(interaction.client, interaction, "ticket_closed", [
        {
            placeholder: "<ticket-channel>",
            value: "<#" + channel.id + ">"
        }
    ]);

    return;
};